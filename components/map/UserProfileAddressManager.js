"use client";

// --- ایمپورت‌های مورد نیاز ---
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import * as htmlToImage from "html-to-image"; // ایمپورت کتابخانه برای اسکرین‌شات
import {
  FaPlusCircle,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPencilAlt,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import YadakchiLogo from "/public/Y.png";
import { IoMdClose } from "react-icons/io";

// ====================================================================
// کامپوننت جستجوی نشان
// ====================================================================
const NeshanSearchControl = ({ map, apiKey }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const searchTimeout = setTimeout(async () => {
      if (!map) return;
      setIsLoading(true);
      const center = map.getCenter();
      const url = `https://api.neshan.org/v1/search?term=${encodeURIComponent(
        query
      )}&lat=${center.lat}&lng=${center.lng}`;
      try {
        const response = await fetch(url, { headers: { "Api-Key": apiKey } });
        if (!response.ok) throw new Error("Neshan API request failed");
        const data = await response.json();
        if (data && data.count > 0 && Array.isArray(data.items)) {
          setSuggestions(data.items);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Neshan search error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(searchTimeout);
  }, [query, map, apiKey]);

  const handleSelectSuggestion = (item) => {
    if (!map || !item.location) return;
    const { x: lng, y: lat } = item.location;
    map.flyTo({ center: [lng, lat], zoom: 16 });
    setQuery("");
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div
      ref={searchContainerRef}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[90%] max-w-sm"
      dir="rtl"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="جستجوی آدرس یا مکان..."
          className={`bg-white w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 shadow-lg outline-none transition-all ${
            suggestions.length > 0 && isFocused ? "rounded-t-lg" : "rounded-lg"
          }`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <MdSearch size={24} />
          )}
        </div>
      </div>
      {suggestions.length > 0 && isFocused && (
        <ul className="absolute w-full bg-white border-r-2 border-l-2 border-b-2 border-gray-300 rounded-b-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={item.id || index}
              onMouseDown={() => handleSelectSuggestion(item)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{item.title}</p>
                <p className="text-gray-500 text-xs mt-1">{item.address}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ====================================================================
// مودال انتخاب مکان از روی نقشه
// ====================================================================
const MapPickerModal = ({ isOpen, onClose, onConfirm, initialCenter }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

 useEffect(() => {
  if (!isOpen) return;
  const centerPoint = initialCenter
    ? [initialCenter.lng, initialCenter.lat]
    : [51.389, 35.6892];
  const initialZoom = initialCenter ? 16 : 12;

  const map = new nmp_mapboxgl.Map({
    mapType: "neshanVector",
    container: mapContainerRef.current,
    zoom: initialZoom,
    pitch: 0,
    center: centerPoint,
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5",
    poi: true,
    traffic: false,
    mapTypeControl: false,
    touchZoomRotate : true
     // <<-- این خط کنترلر لایه‌ها را حذف می‌کند
  });
  setMapInstance(map);
  mapRef.current = map;

  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      setMapInstance(null);
    }
  };
}, [isOpen, initialCenter]);

  const handleConfirmLocation = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    map.once("idle", () => {
      const center = map.getCenter();
      const mapCanvas = map.getCanvas();
      if (mapCanvas) {
        const mapImage = mapCanvas.toDataURL("image/png");
        onConfirm({ lat: center.lat, lng: center.lng, mapImage: mapImage });
      } else {
        onConfirm({ lat: center.lat, lng: center.lng, mapImage: null });
      }
    });
    map.triggerRepaint();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[4000] p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl h-[90vh] 
            md:h-[80vh] lg:h-[90vh] flex flex-col overflow-hidden border-gray-200 p-2 sm:p-4"
          >
            <button
              onClick={onClose}
              className="absolute top-3 left-3 z-30 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white hover:text-red-600 transition-all duration-200 cursor-pointer"
              aria-label="بستن نقشه"
            >
              <IoMdClose size={24} />
            </button>

            <div className="p-2 sm:p-4 text-right">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                انتخاب موقعیت مکانی
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                سفارش‌های شما به موقعیتی که انتخاب می‌کنید ارسال می‌شود.
              </p>
            </div>

            <div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
              <div ref={mapContainerRef} className="h-full w-full" />
              {mapInstance && (
                <NeshanSearchControl
                  map={mapInstance}
                  apiKey="service.07ed2db203df42b5a08ce4340ad38b5c"
                />
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <img
                  src={YadakchiLogo.src}
                  alt="Yadakchi Logo"
                  className="w-6 h-8"
                />
              </div>
             <div
  className=" scale-pulse absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-20 backdrop-blur-sm  rounded-lg shadow-md w-[90%] max-w-xs sm:w-auto"
  dir="rtl"
>
  <div className="flex items-center  w-fit rounded-lg p-2 mx-auto sm:mx-0">
    <p className="text-sm font-semibold p-2 text-white rounded-lg scale-pulse-color">
      یدکچی
    </p>
    <img
      src={YadakchiLogo.src}
      alt="Yadakchi Logo"
      className="w-6 h-8 "
    />
      
  </div>
  
</div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={handleConfirmLocation}
                className="w-full sm:w-1/2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                تایید این مکان
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-1/2 px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ====================================================================
// مودال فرم آدرس
// ====================================================================
// ====================================================================
// مودال فرم آدرس (نسخه اصلاح‌شده)
// ====================================================================
// ====================================================================
// مودال فرم آدرس (نسخه نهایی)
// ====================================================================
const AddressFormModal = ({
  isOpen,
  onClose,
  onSave,
  locationInfo,
  onBack,
}) => {
  const imageContainerRef = useRef(null);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [plak, setPlak] = useState("");
  const [vahed, setVahed] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = !!locationInfo?.id;

  useEffect(() => {
    if (!isOpen || !locationInfo) return;
    setPlak(locationInfo.plak || "");
    setVahed(locationInfo.vahed || "");
    setPostalCode(locationInfo.postalCode || "");
    setIsFetching(true);
    setAddress("");
    setProvince("");
    setCity("");
    const fetchAddressFromNeshan = async () => {
      try {
        const { lat, lng } = locationInfo.coords;
        const response = await fetch(
          `https://api.neshan.org/v2/reverse?lat=${lat}&lng=${lng}`,
          { headers: { "Api-Key": "service.7ff848188a434397926f34f32ddd2f93" } }
        );
        if (!response.ok) throw new Error("Neshan API Error");
        const data = await response.json();
        if (data?.status === "OK") {
          setAddress(data.formatted_address || "");
          setProvince(data.state || "");
          setCity(data.city || "");
        } else {
          throw new Error("Address not found");
        }
      } catch (error) {
        setAddress("خطا در دریافت آدرس. لطفا دوباره تلاش کنید.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAddressFromNeshan();
  }, [isOpen, locationInfo]);

  const handleSave = async () => {
    if (!plak.trim() || !postalCode.trim() || address.startsWith("خطا")) {
      alert("لطفا پلاک و کد پستی را وارد کنید.");
      return;
    }

    if (!imageContainerRef.current) return;

    setIsSaving(true);

    try {
      const compositeImage = await htmlToImage.toPng(imageContainerRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        filter: (node) => node.id !== 'edit-map-icon-in-form',
      });

      onSave({
        id: locationInfo.id,
        fullAddress: address,
        province,
        city,
        plak,
        vahed,
        postalCode,
        coords: locationInfo.coords,
        mapImage: compositeImage,
      });

    } catch (error) {
      console.error("خطا در هنگام ایجاد تصویر نقشه:", error);
      onSave({
        id: locationInfo.id,
        fullAddress: address,
        province,
        city,
        plak,
        vahed,
        postalCode,
        coords: locationInfo.coords,
        mapImage: locationInfo.mapImage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const baseLabel = "block text-sm font-medium text-gray-700 mb-1";
  const baseInput = "w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500";
  const disabledInput = `${baseInput} bg-gray-100 cursor-not-allowed`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[5000] p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg flex flex-col"
            dir="rtl"
          >
            {isFetching ? (
              <div className="h-[500px] flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">در حال دریافت اطلاعات مکان...</p>
              </div>
            ) : (
              <>
                <div ref={imageContainerRef} className="relative w-full h-48 rounded-t-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                  {locationInfo?.mapImage ? (
                    <>
                      <img
                        src={locationInfo.mapImage}
                        alt="نمای نقشه مکان انتخاب شده"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={YadakchiLogo.src}
                        alt="Yadakchi Logo"
                        className="w-6 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
                      />
                      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 mb-9 bg-black/70 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
                        موقعیت شما
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-xs text-center truncate">{address}</p>
                      </div>

                      {/* ========== تغییر ۱: حذف شرط isEditMode برای نمایش همیشگی آیکون ویرایش ========== */}
                      <button
                        id="edit-map-icon-in-form"
                        onClick={onBack}
                        className="absolute top-2 right-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white hover:text-blue-600 transition-all duration-200 cursor-pointer"
                        title="تغییر موقعیت روی نقشه"
                      >
                        <FaPencilAlt size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 p-4">
                      <p className="font-bold">ویرایش جزئیات آدرس</p>
                      <p className="text-sm">برای انتخاب یا تغییر موقعیت، به نقشه بازگردید.</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  {/* ... بقیه فیلدهای فرم ... */}
                   <div>
                    <label className={baseLabel}>آدرس کامل (غیرقابل ویرایش)</label>
                    <textarea value={address} readOnly rows="3" className={`${disabledInput} resize-none`}/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={baseLabel}>استان</label>
                      <input type="text" value={province} disabled className={disabledInput}/>
                    </div>
                    <div>
                      <label className={baseLabel}>شهر</label>
                      <input type="text" value={city} disabled className={disabledInput}/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="plak" className={baseLabel}>پلاک <span className="text-red-500">*</span></label>
                      <input id="plak" type="text" value={plak} onChange={(e) => setPlak(e.target.value)} className={baseInput} required autoFocus/>
                    </div>
                     <div>
                      <label htmlFor="postalCode" className={baseLabel}>کد پستی <span className="text-red-500">*</span></label>
                      <input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={baseInput} required/>
                    </div>
                    <div>
                      <label htmlFor="vahed" className={baseLabel}>واحد (اختیاری)</label>
                      <input id="vahed" type="text" value={vahed} onChange={(e) => setVahed(e.target.value)} className={baseInput}/>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center">
                  {/* ========== تغییر ۲: حذف شرط isEditMode برای نمایش همیشگی دکمه بازگشت ========== */}
                  <button
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <FaArrowRight />
                    <span>بازگشت به نقشه</span>
                  </button>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button onClick={onClose} className="w-1/2 sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
                      لغو
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="w-1/2 sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50">
                      {isSaving ? (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>) : (isEditMode ? "بروزرسانی" : "ذخیره آدرس")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
// ====================================================================
// مودال تایید حذف
// ====================================================================
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[6000] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center"
        dir="rtl"
      >
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <FaExclamationTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mt-5">حذف آدرس</h3>
        <p className="text-sm text-gray-500 mt-2">
          آیا از حذف این آدرس مطمئن هستید؟ این عمل غیرقابل بازگشت است.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 cursor-pointer"
          >
            بله، حذف کن
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ====================================================================
// مودال نمایش تصویر
// ====================================================================
const ImageViewerModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[7000] p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <img
              src={imageUrl}
              alt="نمای بزرگ شده نقشه"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-10 p-1.5 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
              aria-label="بستن تصویر"
            >
              <IoMdClose size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ====================================================================
// کامپوننت اصلی
// ====================================================================
// ====================================================================
// کامپوننت اصلی (نسخه اصلاح‌شده)
// ====================================================================
export default function UserAddressManager() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState(null);
  const [imageToView, setImageToView] = useState(null);

  const handleLocationConfirm = useCallback(
    (locationData) => {
      setSelectedLocationInfo({
        ...addressToEdit,
        coords: { lat: locationData.lat, lng: locationData.lng },
        mapImage: locationData.mapImage,
      });
      setIsMapModalOpen(false);
      setIsFormModalOpen(true);
    },
    [addressToEdit]
  );

  const handleSaveAddress = useCallback((addressData) => {
    if (addressData.id) {
      setUserAddresses((prev) =>
        prev.map((addr) => (addr.id === addressData.id ? addressData : addr))
      );
    } else {
      setUserAddresses((prev) => [...prev, { ...addressData, id: Date.now() }]);
    }
    setIsFormModalOpen(false);
    setSelectedLocationInfo(null);
    setAddressToEdit(null);
  }, []);

  const handleCloseAllModals = () => {
    setIsMapModalOpen(false);
    setIsFormModalOpen(false);
    setSelectedLocationInfo(null);
    setAddressToEdit(null);
  };

  const handleBackToMap = useCallback(() => {
    setIsFormModalOpen(false);
    setAddressToEdit(selectedLocationInfo);
    setIsMapModalOpen(true);
  }, [selectedLocationInfo]);

  const handleEditAddress = (address) => {
    setAddressToEdit(address);
    setIsMapModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setAddressToEdit(null);
    setIsMapModalOpen(true);
  };

  const startDeleteProcess = (addressId) => {
    setAddressIdToDelete(addressId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUserAddresses((prev) =>
      prev.filter((addr) => addr.id !== addressIdToDelete)
    );
    setIsDeleteModalOpen(false);
    setAddressIdToDelete(null);
  };

  return (
    <div
      className="p-4 sm:p-6 md:p-8 font-sans bg-gray-50 min-h-screen"
      dir="rtl"
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b-2 sm:border-b-0 sm:border-l-2 border-gray-200 pb-2 sm:pb-0 sm:pl-4">
            مدیریت آدرس‌ها
          </h2>
          <motion.button
            onClick={handleAddNewAddress}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlusCircle />
            <span>افزودن آدرس جدید</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h3
            className="text-xl font-semibold mb-4"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            آدرس‌های ذخیره شده
          </motion.h3>
          <div className="space-y-4">
            {userAddresses.length === 0 ? (
              <motion.div
                className="text-center py-10 px-6 bg-white rounded-lg shadow-md"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <p className="text-gray-500">شما هنوز آدرسی ثبت نکرده‌اید.</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {userAddresses.map((addr) => (
                  <motion.div
                    key={addr.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      x: -50,
                      height: 0,
                      padding: 0,
                      margin: 0,
                    }}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                    className="p-4 rounded-lg bg-white shadow-md flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    {addr.mapImage && (
                      <div className="relative flex-shrink-0 w-full sm:w-auto">
                        <button onClick={() => setImageToView(addr.mapImage)} className="block w-full">
                          <img
                            src={addr.mapImage}
                            alt="نمای نقشه آدرس"
                            className="w-full h-32 sm:w-24 sm:h-24 object-cover rounded-md shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
                          />
                        </button>
                        {/* ========== دکمه ویرایش جدید ========== */}
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="absolute top-1.5 right-1.5 z-10 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                          title="ویرایش موقعیت مکانی"
                        >
                          <FaPencilAlt size={14} />
                        </button>
                        {/* ======================================= */}
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="font-bold flex items-start gap-2 text-gray-800 text-sm md:text-base">
                        <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />{" "}
                        {addr.fullAddress}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 mt-2">
                        {addr.province}، {addr.city} - پلاک {addr.plak}
                        {addr.vahed && `، واحد ${addr.vahed}`} - کدپستی:{" "}
                        {addr.postalCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleEditAddress(addr)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        title="ویرایش جزئیات آدرس"
                      >
                        <FaPencilAlt size={16} />
                      </button>
                      <button
                        onClick={() => startDeleteProcess(addr.id)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>

      <MapPickerModal
        isOpen={isMapModalOpen}
        onClose={handleCloseAllModals}
        onConfirm={handleLocationConfirm}
        initialCenter={addressToEdit?.coords}
      />
      <AddressFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseAllModals}
        onSave={handleSaveAddress}
        locationInfo={selectedLocationInfo}
        onBack={handleBackToMap}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <ImageViewerModal
        isOpen={!!imageToView}
        onClose={() => setImageToView(null)}
        imageUrl={imageToView}
      />
    </div>
  );
}
