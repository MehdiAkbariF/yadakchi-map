"use client";

// --- Imports ---
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Overlay from "ol/Overlay";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import {
  FaMapMarkerAlt,
  FaDrawPolygon,
  FaSearch,
  FaFilter,
  FaStore,
  FaLocationArrow,
  FaListUl,
  FaArrowRight,
} from "react-icons/fa";
import { IoLayers, IoPrintSharp } from "react-icons/io5";
import { PiPathBold } from "react-icons/pi";
import { MdAddLocationAlt } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

// --- Helper and Child Components ---

const createSvgIcon = (component) => {
  const svgString = ReactDOMServer.renderToString(component);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// ✅✅✅ نسخه نهایی MarkerModal با تمام تغییرات ✅✅✅
const MarkerModal = ({ marker, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  useEffect(() => {
    // اگر مارکر برای ویرایش باز شده، تمام اطلاعات قبلی را پر کن
    if (marker?.isEditing) {
      setName(marker.name || "");
      setAddress(marker.address || "");
      setPhone(marker.phone || "");
      setWebsite(marker.website || "");
      setProvince(marker.province || "");
      setCity(marker.city || "");
      return;
    }

    // اگر مارکر جدید است، اطلاعات را از "نشان" بگیر
    if (marker?.position) {
      setName("");
      setPhone("");
      setWebsite("");
      const fetchAddressFromNeshan = async () => {
        setIsFetchingAddress(true);
        setAddress("");
        setProvince("");
        setCity("");
        try {
          const { lat, lng } = marker.position;
          const response = await fetch(
            `https://api.neshan.org/v2/reverse?lat=${lat}&lng=${lng}`,
            {
              headers: {
                "Api-Key": "service.7ff848188a434397926f34f32ddd2f93",
              },
            }
          );
          if (!response.ok)
            throw new Error("Network response from Neshan was not ok");
          const data = await response.json();
          if (data?.status === "OK") {
            setAddress(data.formatted_address || "آدرس یافت نشد.");
            setProvince(data.state || "استان نامشخص");
            setCity(data.city || "شهر نامشخص");
          } else {
            setAddress("آدرسی برای این نقطه یافت نشد.");
            setProvince("استان نامشخص");
            setCity("شهر نامشخص");
          }
        } catch (error) {
          console.error("Neshan reverse geocoding failed:", error);
          const errorMsg = "خطا در دریافت اطلاعات مکان";
          setAddress(errorMsg);
          setProvince(errorMsg);
          setCity(errorMsg);
        } finally {
          setIsFetchingAddress(false);
        }
      };
      fetchAddressFromNeshan();
    }
  }, [marker]);

  const handleSave = () => {
    if (
      !name.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !website.trim() ||
      !province.trim() ||
      !city.trim()
    ) {
      alert("لطفا همه فیلدها را پر کنید.");
      return;
    }
    if (
      address.startsWith("خطا") ||
      province.startsWith("خطا") ||
      city.startsWith("خطا")
    ) {
      alert("لطفا منتظر بمانید تا اطلاعات مکان به درستی دریافت شود.");
      return;
    }
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      alert("لطفا یک شماره تماس معتبر وارد کنید.");
      return;
    }
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(website)) {
      alert("لطفا یک آدرس وبسایت معتبر وارد کنید (مثال: https://example.com).");
      return;
    }
    onSave({ name, address, phone, website, province, city });
  };

  const baseInputClasses =
    "w-full border border-gray-300 rounded-md p-2 box-border";
  const baseLabelClasses = "block mb-1.5 font-bold";
  const disabledInputClasses = `${baseInputClasses} bg-gray-100 cursor-not-allowed`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[4000]">
      <div className="bg-white p-5 rounded-lg shadow-xl w-[350px]">
        <h3 className="text-xl font-bold mb-5">
          {marker?.isEditing ? "ویرایش مکان" : "افزودن مکان"}
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className={baseLabelClasses}>نام مکان</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              className={baseInputClasses}
            />
          </div>
          <div>
            <label className={baseLabelClasses}>
              آدرس (دریافت خودکار از نقشه):
            </label>
            <textarea
              value={address}
              readOnly
              rows="3"
              className={`${disabledInputClasses} resize-none`}
              placeholder={
                isFetchingAddress ? "در حال دریافت آدرس از نشان..." : ""
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={baseLabelClasses}>استان</label>
              <input
                type="text"
                value={isFetchingAddress ? "..." : province}
                disabled
                className={disabledInputClasses}
              />
            </div>
            <div>
              <label className={baseLabelClasses}>شهر</label>
              <input
                type="text"
                value={isFetchingAddress ? "..." : city}
                disabled
                className={disabledInputClasses}
              />
            </div>
          </div>
          <div>
            <label className={baseLabelClasses}>شماره تماس:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={baseInputClasses}
            />
          </div>
          <div>
            <label className={baseLabelClasses}>وبسایت:</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className={baseInputClasses}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅✅✅ نسخه نهایی CustomPopup با نمایش استان و شهر ✅✅✅
const CustomPopup = ({ marker, onDelete, onEdit, onClose }) => (
  <div
    className="min-w-[220px] max-w-[300px] font-sans flex flex-col gap-2.5 bg-white p-3 rounded-lg shadow-lg"
    dir="rtl"
  >
    <button
      onClick={onClose}
      className="absolute top-1 right-1 text-gray-500 hover:text-black"
    >
      ×
    </button>
    <p className="mb-2.5 border-b border-gray-200 pb-1.5 text-xl font-bold">
      {marker.name}
    </p>

    <div className="grid grid-cols-2 gap-x-4 text-sm my-1.5">
      {marker.province && (
        <p>
          <strong>استان:</strong> {marker.province}
        </p>
      )}
      {marker.city && (
        <p>
          <strong>شهر:</strong> {marker.city}
        </p>
      )}
    </div>

    {marker.address && (
      <p className="my-1.5 text-sm">
        <strong>آدرس:</strong>{" "}
        <span className="break-words">{marker.address}</span>
      </p>
    )}
    {marker.phone && (
      <p className="my-1.5 text-sm">
        <strong>تلفن:</strong> {marker.phone}
      </p>
    )}
    {marker.website && (
      <p className="my-1.5 text-sm">
        <strong>وبسایت:</strong>{" "}
        <a
          href={marker.website}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-blue-600 hover:underline"
        >
          {marker.website}
        </a>
      </p>
    )}
    <div className="mt-4 flex justify-between">
      <button
        onClick={() => onEdit(marker)}
        className="bg-yellow-400 text-black px-3 py-2 rounded cursor-pointer hover:bg-yellow-500 transition-colors"
      >
        ویرایش
      </button>
      <button
        onClick={() => onDelete(marker.id)}
        className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-700 transition-colors"
      >
        حذف
      </button>
    </div>
  </div>
);

// --- سایر کامپوننت‌های UI (بدون تغییر) ---
const Navbar = ({ activeTool, onToolClick }) => {
  const toolbarItems = [
    { name: "info-panel", icon: <FaListUl />, tooltip: "پنل اطلاعات استان" },
    { name: "marker", icon: <FaMapMarkerAlt />, tooltip: "ثبت فروشگاه" },
    { name: "store-search", icon: <FaStore />, tooltip: "جستجوی فروشگاه" },
    { name: "search", icon: <FaSearch />, tooltip: "جستجوی جهانی" },
    { name: "polygon", icon: <FaDrawPolygon />, tooltip: "ثبت محدوده" },
    { name: "layer", icon: <IoLayers />, tooltip: "لایه ها" },
    { name: "print", icon: <IoPrintSharp />, tooltip: "پرینت" },
    { name: "path", icon: <PiPathBold />, tooltip: "فاصله مکان ها" },
    { name: "filter", icon: <FaFilter />, tooltip: "فیلتر کردن" },
  ];
  return (
    <nav className="fixed right-0 top-0 h-screen w-16 bg-white shadow-lg flex flex-col items-center py-8 space-y-8 z-[3000]">
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={20}
          height={20}
          className="text-white"
        />
      </div>
      <div className="flex flex-col space-y-4 w-full">
        {toolbarItems.map((item) => (
          <button
            key={item.name}
            className={`relative group w-full flex items-center justify-center p-3 cursor-pointer transition-colors duration-200 ${
              activeTool === item.name
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => onToolClick(item.name)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap">
              {item.tooltip}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};
const GlobalSearchControl = ({ active, onSearchResultSelect, map }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const performSearch = useCallback(
    async (searchQuery, limit) => {
      if (!map) return [];
      const extent = map.getView().calculateExtent(map.getSize());
      const [minLon, minLat, maxLon, maxLat] = toLonLat(
        extent,
        map.getView().getProjection()
      );
      const latBuffer = (maxLat - minLat) * 0.5,
        lonBuffer = (maxLon - minLon) * 0.5;
      const expandedViewbox = `${minLon - lonBuffer},${minLat - latBuffer},${
        maxLon + lonBuffer
      },${maxLat + latBuffer}`;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchQuery
      )}&format=json&limit=${limit}&viewbox=${expandedViewbox}`;
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error("Search failed:", error);
        return [];
      }
    },
    [map]
  );
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      const results = await performSearch(query, 10);
      setSuggestions(results || []);
      setIsLoading(false);
    };
    const handler = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(handler);
  }, [query, performSearch]);
  const handleSelectSuggestion = (suggestion) => {
    const lat = parseFloat(suggestion.lat),
      lon = parseFloat(suggestion.lon);
    onSearchResultSelect({ lat, lng: lon, zoom: 14 });
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const results = await performSearch(query, 1);
    setIsLoading(false);
    if (results && results.length > 0) {
      handleSelectSuggestion(results[0]);
    } else {
      alert("هیچ نتیجه‌ای برای عبارت مورد نظر یافت نشد.");
    }
  };
  if (!active) return null;
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[2000] w-80">
      <form onSubmit={handleFormSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی مکان در اطراف..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          type="submit"
          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaSearch />
          )}
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => handleSelectSuggestion(s)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-right"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const LocalSearchControl = ({ active, markers, onMarkerSelect }) => {
  const [query, setQuery] = useState("");
  if (!active) return null;
  const filteredMarkers =
    query.length > 0
      ? markers.filter((marker) =>
          marker.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];
  const handleSelect = (marker) => {
    onMarkerSelect(marker);
    setQuery("");
  };
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[2000] w-80">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="نام فروشگاه خود را جستجو کنید..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          autoFocus
        />
      </div>
      {filteredMarkers.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {filteredMarkers.map((marker) => (
            <li
              key={marker.id}
              onClick={() => handleSelect(marker)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-right"
            >
              {marker.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const LocationPicker = ({ onConfirm, onCancel, map }) => {
  const handleConfirmLocation = () => {
    if (!map) return;
    const centerCoords = map.getView().getCenter();
    const [lng, lat] = toLonLat(centerCoords);
    onConfirm({ lat, lng });
  };
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-[1000] pointer-events-none ">
        <MdAddLocationAlt size={45} className="text-red-700 drop-shadow-lg" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-[1000] flex p-2 gap-5 bg-white rounded-lg shadow-lg justify-center">
        <button
          onClick={handleConfirmLocation}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-colors cursor-pointer"
        >
          ثبت در این مکان
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-600 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          انصراف
        </button>
      </div>
    </>
  );
};
const LayerSwitcherPanel = ({
  baseLayerDefs,
  overlayLayerDefs,
  activeBaseLayer,
  overlayVisibility,
  onBaseLayerChange,
  onOverlayToggle,
}) => {
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  };
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-4 right-20 z-[2000] bg-white rounded-md shadow-lg p-3 w-48"
      dir="rtl"
    >
      <h4 className="font-bold mb-2 border-b pb-1">نقشه پایه</h4>
      <div className="flex flex-col gap-1">
        {baseLayerDefs.map((layer) => (
          <label
            key={layer.title}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="base-layer"
              value={layer.title}
              checked={activeBaseLayer === layer.title}
              onChange={() => onBaseLayerChange(layer.title)}
            />
            {layer.title}
          </label>
        ))}
      </div>
      <h4 className="font-bold mt-4 mb-2 border-b pb-1">لایه‌های اطلاعاتی</h4>
      <div className="flex flex-col gap-1">
        {overlayLayerDefs.map((layer) => (
          <label
            key={layer.title}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={!!overlayVisibility[layer.title]}
              onChange={(e) => onOverlayToggle(layer.title, e.target.checked)}
            />
            {layer.title}
          </label>
        ))}
      </div>
    </motion.div>
  );
};
const InfoPanel = ({ onLocationFound, onSetTemporaryMarker }) => {
  const [viewMode, setViewMode] = useState("provinces");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/iran/states");
        if (!response.ok) throw new Error("Failed to fetch provinces");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProvinces();
  }, []);
  const handleSelectProvince = async (province) => {
    setIsLoading(true);
    const location = {
      lat: parseFloat(province.latitude),
      lng: parseFloat(province.longitude),
      zoom: 9,
    };
    onLocationFound(location);
    onSetTemporaryMarker(location);
    setSelectedProvince(province);
    try {
      const response = await fetch(`/api/iran/cities?state_id=${province.id}`);
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCities(data);
      setViewMode("cities");
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackToProvinces = () => {
    setViewMode("provinces");
    setSelectedProvince(null);
    setCities([]);
    onSetTemporaryMarker(null);
  };
  const panelVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-4">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      );
    }
    switch (viewMode) {
      case "cities":
        return (
          <>
            <div className="flex items-center justify-between mb-2 pb-1 border-b">
              <h4 className="font-bold text-md truncate">
                شهرهای {selectedProvince?.name}
              </h4>
              <button
                onClick={handleBackToProvinces}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <FaArrowRight size={12} /> بازگشت
              </button>
            </div>
            <ul className="flex-grow overflow-y-auto text-sm space-y-1 pr-1">
              {cities.length > 0 ? (
                cities.map((city) => (
                  <li key={city.id || city.name}>
                    <button
                      onClick={() => {
                        const location = {
                          lat: parseFloat(city.latitude),
                          lng: parseFloat(city.longitude),
                          zoom: 12,
                        };
                        onLocationFound(location);
                        onSetTemporaryMarker(location);
                      }}
                      className="w-full text-right p-1.5 rounded hover:bg-gray-100 transition-colors"
                    >
                      {city.name}
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">شهری یافت نشد.</p>
              )}
            </ul>
          </>
        );
      case "provinces":
      default:
        return (
          <>
            <h4 className="font-bold mb-2 text-md">لیست استان‌ها</h4>
            <ul className="flex-grow overflow-y-auto text-sm space-y-1 pr-1">
              {provinces.map((province) => (
                <li key={province.id}>
                  <button
                    onClick={() => handleSelectProvince(province)}
                    className="w-full text-right p-1.5 rounded hover:bg-gray-100 transition-colors"
                  >
                    {province.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
    }
  };
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-4 right-20 z-[2000] bg-white rounded-lg shadow-xl p-4 w-80 max-h-[calc(100vh-40px)] flex flex-col"
      dir="rtl"
    >
      <div className="flex flex-col flex-grow min-h-0">{renderContent()}</div>
    </motion.div>
  );
};

// ====================================================================
// --- MAIN PAGE ---
// ====================================================================
export default function MapPage() {
  const mapContainerRef = useRef(null);
  const popupRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef({ base: [], overlay: [], temp: null });
  const [markers, setMarkers] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: null,
    isEditing: false,
  });
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [selectedPopupInfo, setSelectedPopupInfo] = useState(null);
  const [newlyAddedMarkerId, setNewlyAddedMarkerId] = useState(null);
  const [temporaryMarkerCoord, setTemporaryMarkerCoord] = useState(null);
  const [isLayerSwitcherOpen, setIsLayerSwitcherOpen] = useState(false);
  const [activeBaseLayer, setActiveBaseLayer] = useState("خیابان");
  const [overlayVisibility, setOverlayVisibility] = useState({
    فروشگاه‌ها: true,
  });

  const customIcon = useCallback(
    () =>
      new Style({
        image: new Icon({
          src: createSvgIcon(<IoLocation size={32} color="#4A90E2" />),
          anchor: [0.5, 1],
        }),
      }),
    []
  );
  const selectedIcon = useCallback(
    () =>
      new Style({
        image: new Icon({
          src: createSvgIcon(<IoLocation size={40} color="#f59e0b" />),
          anchor: [0.5, 1],
        }),
      }),
    []
  );
  const temporaryIcon = useCallback(
    () =>
      new Style({
        image: new Icon({
          src: createSvgIcon(<FaMapMarkerAlt size={36} color="#22c55e" />),
          anchor: [0.5, 1],
        }),
      }),
    []
  );

  useEffect(() => {
    if (mapRef.current) return;
    const baseLayerDefs = [
      { title: "خیابان", instance: new TileLayer({ source: new OSM() }) },
      {
        title: "ماهواره",
        instance: new TileLayer({
          source: new XYZ({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attributions: "Tiles © Esri",
            maxZoom: 19,
          }),
        }),
      },
      {
        title: "حالت شب",
        instance: new TileLayer({
          source: new XYZ({
            url: "https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            attributions: "© CartoDB",
            maxZoom: 19,
          }),
        }),
      },
    ];
    const overlayLayerDefs = [
      {
        title: "فروشگاه‌ها",
        instance: new VectorLayer({ source: new VectorSource() }),
      },
    ];
    const tempMarkerLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 101,
    });
    layersRef.current = {
      base: baseLayerDefs,
      overlay: overlayLayerDefs,
      temp: tempMarkerLayer,
    };
    baseLayerDefs.forEach((l) => l.instance.setVisible(l.title === "خیابان"));
    overlayLayerDefs.forEach((l) => l.instance.setVisible(true));
    const allInstances = [...baseLayerDefs, ...overlayLayerDefs].map(
      (l) => l.instance
    );
    const iranExtent = fromLonLat([44.0, 24.0]).concat(
      fromLonLat([64.0, 40.0])
    );
    const olMap = new Map({
      target: mapContainerRef.current,
      layers: [...allInstances, tempMarkerLayer],
      view: new View({
        center: fromLonLat([53.688, 32.4279]),
        zoom: 5,
        minZoom: 5,
        extent: iranExtent,
      }),
      controls: [],
    });
    mapRef.current = olMap;
    const popupOverlay = new Overlay({
      element: popupRef.current,
      autoPan: { animation: { duration: 250 } },
      positioning: "bottom-center",
      offset: [0, -40],
    });
    olMap.addOverlay(popupOverlay);
    olMap.on("click", (event) => {
      let featureFound = false;
      olMap.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (layer === layersRef.current.overlay[0].instance) {
          featureFound = true;
          const markerData = feature.get("markerData");
          if (markerData.id !== selectedPopupInfo?.id) {
            setSelectedPopupInfo(markerData);
            popupOverlay.setPosition(feature.getGeometry().getCoordinates());
          }
        }
      });
      if (!featureFound) {
        setSelectedPopupInfo(null);
        popupOverlay.setPosition(undefined);
      }
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!layersRef.current.base.length) return;
    layersRef.current.base.forEach((l) =>
      l.instance.setVisible(l.title === activeBaseLayer)
    );
    layersRef.current.overlay.forEach((l) =>
      l.instance.setVisible(!!overlayVisibility[l.title])
    );
  }, [activeBaseLayer, overlayVisibility]);

  useEffect(() => {
    const markerLayer = layersRef.current.overlay.find(
      (l) => l.title === "فروشگاه‌ها"
    )?.instance;
    if (!markerLayer) return;
    const vectorSource = markerLayer.getSource();
    vectorSource.clear();
    markers.forEach((marker) => {
      const feature = new Feature({
        geometry: new Point(
          fromLonLat([marker.position.lng, marker.position.lat])
        ),
        markerData: marker,
      });
      feature.setId(marker.id);
      feature.setStyle(customIcon()); // Set default style initially
      vectorSource.addFeature(feature);
    });
  }, [markers, customIcon]);

  useEffect(() => {
    const markerLayer = layersRef.current.overlay.find(
      (l) => l.title === "فروشگاه‌ها"
    )?.instance;
    if (!markerLayer) return;
    const vectorSource = markerLayer.getSource();
    vectorSource.getFeatures().forEach((feature) => {
      const id = feature.getId();
      if (id === selectedPopupInfo?.id) {
        feature.setStyle(selectedIcon());
      } else {
        feature.setStyle(customIcon());
      }
    });
  }, [selectedPopupInfo, customIcon, selectedIcon]);

  useEffect(() => {
    if (!mapRef.current || !flyToLocation) return;
    mapRef.current
      .getView()
      .animate({
        center: fromLonLat([flyToLocation.lng, flyToLocation.lat]),
        zoom: flyToLocation.zoom,
        duration: 1000,
      });
  }, [flyToLocation]);

  useEffect(() => {
    const tempLayer = layersRef.current.temp;
    if (!tempLayer) return;
    const source = tempLayer.getSource();
    source.clear();
    if (temporaryMarkerCoord) {
      const feature = new Feature({
        geometry: new Point(
          fromLonLat([temporaryMarkerCoord.lng, temporaryMarkerCoord.lat])
        ),
      });
      feature.setStyle(temporaryIcon());
      source.addFeature(feature);
    }
  }, [temporaryMarkerCoord, temporaryIcon]);

  useEffect(() => {
    if (!isInfoPanelOpen) {
      setTemporaryMarkerCoord(null);
    }
  }, [isInfoPanelOpen]);

  const handleSaveMarker = (details) => {
    if (modalState.isEditing) {
      setMarkers((prev) =>
        prev.map((m) =>
          m.id === modalState.data.id ? { ...modalState.data, ...details } : m
        )
      );
    } else {
      const newMarker = {
        id: new Date().getTime(),
        position: modalState.data.position,
        ...details,
      };
      setMarkers((prev) => [...prev, newMarker]);
    }
    setModalState({ isOpen: false, data: null, isEditing: false });
  };

  const handleToolClick = (toolId) => {
    if (toolId === "layer") {
      setIsLayerSwitcherOpen((prev) => !prev);
      setIsInfoPanelOpen(false);
    } else if (toolId === "info-panel") {
      setIsInfoPanelOpen((prevState) => !prevState);
      setIsLayerSwitcherOpen(false);
    } else {
      setIsLayerSwitcherOpen(false);
      setIsInfoPanelOpen(false);
    }
    if (toolId === "print") {
      mapRef.current.once("rendercomplete", () => window.print());
      mapRef.current.renderSync();
      setActiveTool(null);
      return;
    }
    setActiveTool((prevTool) => (prevTool === toolId ? null : toolId));
  };

  const handleLocalMarkerSelect = (marker) => {
    setFlyToLocation({
      lat: marker.position.lat,
      lng: marker.position.lng,
      zoom: 16,
    });
    const markerLayer = layersRef.current.overlay.find(
      (l) => l.title === "فروشگاه‌ها"
    )?.instance;
    const feature = markerLayer?.getSource().getFeatureById(marker.id);
    if (feature) {
      setSelectedPopupInfo(marker);
      mapRef.current
        .getOverlays()
        .getArray()[0]
        .setPosition(feature.getGeometry().getCoordinates());
    }
  };

  const handleShowAddModal = (latlng) => {
    setActiveTool(null);
    setModalState({
      isOpen: true,
      data: { position: latlng },
      isEditing: false,
    });
  };

  const handleDeleteMarker = (id) => {
    setMarkers((prev) => prev.filter((marker) => marker.id !== id));
    setSelectedPopupInfo(null);
  };

  const handleGoToTehran = () => {
    setFlyToLocation({ lat: 35.6892, lng: 51.389, zoom: 12 });
  };

  return (
    <div className="h-screen w-full relative page-wrapper overflow-x-hidden">
      <Navbar activeTool={activeTool} onToolClick={handleToolClick} />
      <AnimatePresence>
        {isLayerSwitcherOpen && (
          <LayerSwitcherPanel
            baseLayerDefs={layersRef.current.base}
            overlayLayerDefs={layersRef.current.overlay}
            activeBaseLayer={activeBaseLayer}
            overlayVisibility={overlayVisibility}
            onBaseLayerChange={setActiveBaseLayer}
            onOverlayToggle={(title, isVisible) =>
              setOverlayVisibility((prev) => ({ ...prev, [title]: isVisible }))
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isInfoPanelOpen && (
          <InfoPanel
            onLocationFound={setFlyToLocation}
            onSetTemporaryMarker={setTemporaryMarkerCoord}
          />
        )}
      </AnimatePresence>
      <div
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ cursor: activeTool === "marker" ? "crosshair" : "grab" }}
      />
      <div ref={popupRef}>
        {selectedPopupInfo && (
          <CustomPopup
            marker={selectedPopupInfo}
            onDelete={handleDeleteMarker}
            // ✅✅✅ تغییر کلیدی: ارسال فلگ isEditing برای تشخیص حالت ویرایش ✅✅✅
            onEdit={(marker) =>
              setModalState({
                isOpen: true,
                data: { ...marker, isEditing: true },
                isEditing: true,
              })
            }
            onClose={() => setSelectedPopupInfo(null)}
          />
        )}
      </div>
      <GlobalSearchControl
        active={activeTool === "search"}
        onSearchResultSelect={setFlyToLocation}
        map={mapRef.current}
      />
      <LocalSearchControl
        active={activeTool === "store-search"}
        markers={markers}
        onMarkerSelect={handleLocalMarkerSelect}
      />
      {activeTool === "marker" && (
        <LocationPicker
          onConfirm={handleShowAddModal}
          onCancel={() => setActiveTool(null)}
          map={mapRef.current}
        />
      )}
      <button
        onClick={handleGoToTehran}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <FaLocationArrow className="text-blue-500" />{" "}
        <span className="font-semibold text-gray-700">برو به تهران</span>
      </button>
      {modalState.isOpen && (
        <MarkerModal
          marker={modalState.data}
          onSave={handleSaveMarker}
          onCancel={() =>
            setModalState({ isOpen: false, data: null, isEditing: false })
          }
        />
      )}
    </div>
  );
}
