"use client";

// --- ایمپورت‌های مورد نیاز ---
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// حذف ایمپورت مستقیم mapbox-gl برای جلوگیری از خطای SSR
// import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
// import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import * as htmlToImage from "html-to-image";
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
      <div className="relative w-full mx-auto ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="جستجوی آدرس یا مکان..."
          className={`bg-white h-10 w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 shadow-lg outline-none transition-all ${
            suggestions.length > 0 && isFocused ? "rounded-t-lg" : "rounded-lg"
          }`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ">
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


// Overlay جدید: نمایش نقشه جداگانه فروشگاه
const StoreMapOverlay = ({ isOpen, marker, onClose }) => {
  const [directionInfo, setDirectionInfo] = React.useState({ distance: null, duration: null, loading: false, error: null });
  const [routePolyline, setRoutePolyline] = React.useState(null);
  const mapPolylineRef = useRef(null);
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  // decode polyline utility
  function decodePolyline(str) {
    let index = 0, lat = 0, lng = 0, coordinates = [];
    while (index < str.length) {
      let b, shift = 0, result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      coordinates.push([lng * 1e-5, lat * 1e-5]);
    }
    return coordinates;
  }

  // داینامیک ایمپورت mapbox-gl فقط سمت کلاینت
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) => setNmpMapboxgl(mod.default || mod));
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !marker || !nmp_mapboxgl) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    // ساخت نقشه جدید با مرکز فروشگاه
    mapRef.current = new nmp_mapboxgl.Map({
      mapType: "neshanVector",
      container: mapContainerRef.current,
      zoom: 15,
      center: [marker.lng, marker.lat],
      mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5",
      poi: true,
      traffic: false,
      mapTypeControl: false,
      touchZoomRotate: true
    });
    // مارکر فروشگاه روی نقشه کوچک
    new nmp_mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .addTo(mapRef.current);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen, marker, nmp_mapboxgl]);

  // گرفتن مسیر و رسم روی نقشه
  useEffect(() => {
    if (!isOpen || !marker) return;
    setDirectionInfo({ distance: null, duration: null, loading: true, error: null });
    setRoutePolyline(null);
    const karaj = { lat: 35.8327, lng: 50.9916 };
    const url = `https://api.neshan.org/v4/direction?origin=${karaj.lat},${karaj.lng}&destination=${marker.lat},${marker.lng}&type=car&traffic=true`;
    fetch(url, {
      headers: { 'Api-Key': 'service.e4ba1df0f9674c2da041ddd8c4a810b3' }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.routes && data.routes[0]) {
          const route = data.routes[0];
          setDirectionInfo({
            distance: route.legs[0]?.distance?.text || null,
            duration: route.legs[0]?.duration?.text || null,
            loading: false,
            error: null
          });
          if (route.overview_polyline && route.overview_polyline.points) {
            setRoutePolyline(route.overview_polyline.points);
          }
        } else {
          setDirectionInfo({ distance: null, duration: null, loading: false, error: 'خطا در دریافت اطلاعات مسیر' });
        }
      })
      .catch(() => setDirectionInfo({ distance: null, duration: null, loading: false, error: 'خطا در دریافت اطلاعات مسیر' }));
  }, [isOpen, marker]);

  // رسم polyline روی نقشه
  useEffect(() => {
    if (!mapRef.current || !routePolyline || !nmp_mapboxgl) return;
    // پاک کردن لایه قبلی
    if (mapPolylineRef.current) {
      try { mapRef.current.removeLayer('route'); } catch {}
      try { mapRef.current.removeSource('route'); } catch {}
      mapPolylineRef.current = null;
    }
    const coords = decodePolyline(routePolyline).map(([lng, lat]) => [lng, lat]);
    mapRef.current.on('load', () => {
      if (mapRef.current.getSource('route')) return;
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        }
      });
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#1976d2', 'line-width': 5, 'line-opacity': 0.85 }
      });
      mapPolylineRef.current = true;
    });
  }, [routePolyline, nmp_mapboxgl]);

  if (!isOpen || !marker) return null;
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[200]" style={{ pointerEvents: 'auto' }} dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 pt-12 text-center mx-auto relative" style={{ minHeight: '340px', minWidth: '320px' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="بازگشت"
        >
          <FaArrowRight size={24} />
        </button>
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-3">
          <img src={YadakchiLogo.src} alt="Yadakchi Marker" className="w-10 h-10 object-contain" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{marker.name}</h3>
        <p className="text-gray-700 text-sm mb-4">{marker.desc}</p>
        {/* نمایش فاصله و زمان رسیدن از کرج تا فروشگاه */}
        <div className="mb-4">
          <div className="inline-block bg-blue-50 rounded-lg px-4 py-2 text-xs text-blue-900 font-semibold shadow">
            {directionInfo.loading ? (
              <span>در حال دریافت مسیر...</span>
            ) : directionInfo.error ? (
              <span className="text-red-500">{directionInfo.error}</span>
            ) : (
              <>
                <span>فاصله تا فروشگاه: <b>{directionInfo.distance || '-'}</b></span>
                <span className="mx-2">|</span>
                <span>زمان تقریبی: <b>{directionInfo.duration || '-'}</b></span>
              </>
            )}
          </div>
        </div>
        <div ref={mapContainerRef} className="w-full h-48 rounded-lg border border-gray-200 shadow-inner mx-auto" />
      </div>
    </div>
  );
};


const MapPickerModal = ({ isOpen, onClose, onConfirm, initialCenter }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [showStaticMarkers, setShowStaticMarkers] = useState(true);
  const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null);
  const [storeMapOverlay, setStoreMapOverlay] = useState({ open: false, marker: null });
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null);

  // مختصات مارکرهای ثابت یدکچی در تهران
  const staticMarkers = [
    { lat: 35.6892, lng: 51.3890, name: "فروشگاه اصغر ", desc: "میدان آزادی" },
    { lat: 35.7219, lng: 51.3347, name: "فروشگاه مهدی", desc: "میدان تجریش" },
    { lat: 35.7006, lng: 51.3370, name: "فروشگاه رضا", desc: "میدان ونک" },
    { lat: 35.6467, lng: 51.3890, name: "فروشگاه فلان", desc: "میدان نازی‌آباد" },
  ];

  // نگهداری رفرنس مارکرها برای حذف
  const staticMarkerRefs = useRef([]);

  // ساخت map فقط یکبار هنگام باز شدن مودال یا تغییر initialCenter
  // داینامیک ایمپورت mapbox-gl فقط سمت کلاینت
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) => setNmpMapboxgl(mod.default || mod));
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !nmp_mapboxgl) return;
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
      minZoom: 8, // محدودیت زوم اوت تا سطح دو شهر
      maxZoom: 21,
      trackResize: true,
      mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5",
      poi: true,
      traffic: false,
      mapTypeControl: false,
      touchZoomRotate: true
    });
    setMapInstance(map);
    mapRef.current = map;

    return () => {
      // حذف مارکرهای ثابت از نقشه
      if (staticMarkerRefs.current && staticMarkerRefs.current.length > 0) {
        staticMarkerRefs.current.forEach((marker) => marker.remove());
        staticMarkerRefs.current = [];
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapInstance(null);
      }
    };
  }, [isOpen, initialCenter, nmp_mapboxgl]);

  // افزودن/حذف مارکرهای ثابت بدون ریست نقشه
  useEffect(() => {
    if (!mapRef.current || !nmp_mapboxgl) return;
    // حذف مارکرهای قبلی
    if (staticMarkerRefs.current && staticMarkerRefs.current.length > 0) {
      staticMarkerRefs.current.forEach((marker) => marker.remove());
      staticMarkerRefs.current = [];
    }
    if (showStaticMarkers) {
      staticMarkerRefs.current = staticMarkers.map(({ lat, lng, name, desc }, idx) => {
        // ساخت یک div برای نام و مارکر
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.style.pointerEvents = 'auto';

        // نام مارکر
        const label = document.createElement('div');
        label.innerText = name;
        label.style.background = 'rgba(0,0,0,0.7)';
        label.style.color = '#fff';
        label.style.fontSize = '11px';
        label.style.padding = '2px 8px';
        label.style.borderRadius = '8px';
        label.style.marginBottom = '2px';
        label.style.whiteSpace = 'nowrap';
        label.style.userSelect = 'none';
        wrapper.appendChild(label);

        // مارکر تصویری
        const el = document.createElement('div');
        el.style.width = '22px';
        el.style.height = '22px';
        el.style.background = 'none';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        const img = document.createElement('img');
        img.src = YadakchiLogo.src;
        img.alt = 'Yadakchi Marker';
        img.style.width = '22px';
        img.style.height = '22px';
        img.style.objectFit = 'contain';
        img.style.opacity = (selectedMarkerIdx === idx) ? '1' : '0.5';
        el.appendChild(img);
        el.style.cursor = 'pointer';
        el.onclick = (e) => {
          e.stopPropagation();
          setSelectedMarkerIdx(idx);
          setStoreMapOverlay({ open: true, marker: { lat, lng, name, desc } });
        };
        wrapper.appendChild(el);

        const marker = new nmp_mapboxgl.Marker({ element: wrapper })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
        return marker;
      });
    }
  }, [showStaticMarkers, isOpen, selectedMarkerIdx, nmp_mapboxgl]);

  // اگر روی نقشه کلیک شد (نه روی مارکر)، انتخاب مارکر را حذف کن
  useEffect(() => {
    if (!mapRef.current) return;
    const handleMapClick = (e) => {
      setSelectedMarkerIdx(null);
    };
    // فقط روی خود نقشه کلیک شود، نه روی مارکر
    mapRef.current.on('click', handleMapClick);
    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, [isOpen]);

  const handleConfirmLocation = async () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    let originalZoom = null;
    let needRestoreZoom = false;
    // اگر زوم فعلی نزدیک به 16 نیست، زوم را روی 16 بگذار
    if (typeof map.getZoom === 'function') {
      originalZoom = map.getZoom();
      if (originalZoom < 15.5 || originalZoom > 16.5) {
        needRestoreZoom = true;
        map.setZoom(16);
      }
    }

    // تابعی که عکس می‌گیرد و زوم را برمی‌گرداند
    const takeScreenshot = () => {
      const center = map.getCenter();
      const mapCanvas = map.getCanvas();
      let mapImage = null;
      if (mapCanvas) {
        mapImage = mapCanvas.toDataURL("image/png");
      }
      onConfirm({ lat: center.lat, lng: center.lng, mapImage });
      // اگر لازم بود زوم را برگردان
      if (needRestoreZoom && originalZoom !== null) {
        map.setZoom(originalZoom);
      }
    };

    // اگر زوم تغییر کرده، منتظر رویداد idle شو
    if (needRestoreZoom) {
      const onIdle = () => {
        map.off("idle", onIdle);
        takeScreenshot();
      };
      map.on("idle", onIdle);
      map.triggerRepaint();
    } else {
      // اگر زوم تغییر نکرده، بلافاصله عکس بگیر
      takeScreenshot();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[4000] p-2 sm:p-4">
            {/* StoreMapOverlay is now rendered outside the blurred modal */}
            {storeMapOverlay.open && (
              <StoreMapOverlay
                isOpen={storeMapOverlay.open}
                marker={storeMapOverlay.marker}
                onClose={() => setStoreMapOverlay({ open: false, marker: null })}
              />
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl h-[90vh] md:h-[80vh] lg:h-[90vh] flex flex-col overflow-hidden border-gray-200 p-2 sm:p-4"
              style={storeMapOverlay.open ? { filter: 'blur(2px)', opacity: 0.4, pointerEvents: 'none', transition: 'all 0.2s' } : {}}
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
                  className="scale-pulse absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-20 backdrop-blur-sm rounded-lg shadow-md w-[90%] max-w-xs sm:w-auto"
                  dir="rtl"
                >
                  <div className="flex items-center w-fit rounded-lg p-2 mx-auto sm:mx-0 gap-2">
                    <p className="text-sm font-semibold p-2 text-white rounded-lg scale-pulse-color">
                      یدکچی
                    </p>
                    <label className="flex items-center gap-1 cursor-pointer select-none text-xs text-white">
                      <input
                        type="checkbox"
                        checked={showStaticMarkers}
                        onChange={e => setShowStaticMarkers(e.target.checked)}
                        className="accent-blue-600 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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
    </>
  );
};


// ====================================================================
// مودال هشدار
// ====================================================================
const AlertModal = ({ isOpen, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[8000] p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center"
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-5">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">
              {message}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 cursor-pointer"
              >
                متوجه شدم
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

  // --- فاصله و زمان رسیدن از نقطه کاربر تا کرج ---
  const [distanceInfo, setDistanceInfo] = useState({ distance: null, duration: null, loading: false, error: null });

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
    setDistanceInfo({ distance: null, duration: null, loading: true, error: null });
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

    // --- گرفتن فاصله و زمان رسیدن از کاربر تا کرج ---
    const fetchDistance = async () => {
      try {
        // نقطه ثابت کرج
        const karaj = { lat: 35.8327, lng: 50.9916 };
        const { lat, lng } = locationInfo.coords;
        const res = await fetch("https://api.neshan.org/v2/matrix?type=car&traffic=true", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": "service.23006b3aa8e144539acb107eaa77f6e6"
          },
          body: JSON.stringify({
            origins: [{ lat, lng }],
            destinations: [karaj]
          })
        });
        if (!res.ok) throw new Error("خطا در دریافت فاصله از نشان");
        const data = await res.json();
        const el = data?.rows?.[0]?.elements?.[0];
        if (el && el.status === "OK") {
          setDistanceInfo({
            distance: el.distance.text,
            duration: el.duration.text,
            loading: false,
            error: null
          });
        } else {
          setDistanceInfo({ distance: null, duration: null, loading: false, error: "خطا در محاسبه فاصله" });
        }
      } catch (err) {
        setDistanceInfo({ distance: null, duration: null, loading: false, error: "خطا در دریافت فاصله" });
      }
    };
    fetchDistance();
  }, [isOpen, locationInfo]);

  const handlePlakChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 15) {
      setPlak(value);
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setPostalCode(value);
    }
  };


  const handleSave = async () => {
    if (address.startsWith("خطا")) {
      setAlertMessage("آدرس معتبر نیست. لطفاً به نقشه بازگشته و مکان جدیدی انتخاب کنید.");
      setIsAlertModalOpen(true);
      return;
    }
    if (!plak.trim()) {
      setAlertMessage("لطفاً پلاک را وارد کنید.");
      setIsAlertModalOpen(true);
      return;
    }
    if (postalCode.trim().length !== 10) {
      setAlertMessage("کد پستی وارد شده باید ۱۰ رقم باشد.");
      setIsAlertModalOpen(true);
      return;
    }

    if (!imageContainerRef.current) return;

    setIsSaving(true);

    // اگر نقشه‌ای وجود دارد، زوم را قبل از عکس گرفتن روی 16 بگذار
    let originalZoom = null;
    let mapCanvas = null;
    try {
      // سعی کن نقشه را پیدا کنی (درون imageContainerRef)
      const mapDiv = imageContainerRef.current.querySelector('canvas');
      if (mapDiv && mapDiv.parentElement && mapDiv.parentElement._mapInstance) {
        const mapInstance = mapDiv.parentElement._mapInstance;
        if (mapInstance && typeof mapInstance.getZoom === 'function') {
          originalZoom = mapInstance.getZoom();
          if (originalZoom < 15.5 || originalZoom > 16.5) {
            mapInstance.setZoom(16);
            // کمی صبر کن تا نقشه رندر شود
            await new Promise(res => setTimeout(res, 400));
          }
        }
      }
    } catch (e) {}

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
      // اگر لازم بود زوم را برگردان
      try {
        const mapDiv = imageContainerRef.current.querySelector('canvas');
        if (mapDiv && mapDiv.parentElement && mapDiv.parentElement._mapInstance && originalZoom) {
          const mapInstance = mapDiv.parentElement._mapInstance;
          if (typeof mapInstance.setZoom === 'function') {
            mapInstance.setZoom(originalZoom);
          }
        }
      } catch (e) {}
    }
  };

  const baseLabel = "block text-sm font-medium text-gray-700 mb-1";
  const baseInput = "w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500";
  const disabledInput = `${baseInput} bg-gray-100 cursor-not-allowed`;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[5000] p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-xl flex flex-col max-h-[95vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible"
              dir="rtl"
            >
              {isFetching ? (
                <div className="h-[500px] flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                  <p className="mt-4 text-gray-600">در حال دریافت اطلاعات مکان...</p>
                </div>
              ) : (
                <>
                  <div ref={imageContainerRef} className="relative w-full h-56 rounded-t-lg bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <input id="plak" type="text" value={plak} onChange={handlePlakChange} className={baseInput} required autoFocus/>
                      </div>
                       <div>
                        <label htmlFor="postalCode" className={baseLabel}>کد پستی <span className="text-red-500">*</span></label>
                        <input id="postalCode" type="text" value={postalCode} onChange={handlePostalCodeChange} className={baseInput} required/>
                      </div>
                      <div>
                        <label htmlFor="vahed" className={baseLabel}>واحد (اختیاری)</label>
                        <input id="vahed" type="text" value={vahed} onChange={(e) => setVahed(e.target.value)} className={baseInput}/>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-t-gray-300 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center flex-shrink-0">
                   
                     <button onClick={onClose} className="w-1/2 sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
                        لغو
                      </button>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                      onClick={onBack}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <FaArrowRight />
                      <span>بازگشت به نقشه</span>
                    </button>
                      <button onClick={handleSave} disabled={isSaving} className="w-1/2 sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold text-[13px] rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50">
                        {isSaving ? (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>) : (isEditMode ? "بروزرسانی" : "ذخیره آدرس")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="خطای ورودی"
        message={alertMessage}
      />
    </>
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
              className="absolute -top-3 -right-3 cursor-pointer z-10 p-1.5 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
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
          className="bg-white p-4 sm:p-6 border-b-1 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          <h2 className=" sm:text-3xl font-bold border-b-2 sm:border-b-0  border-gray-200 pb-2 sm:pb-0 sm:pl-4">
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
            className="text-xl font-semibold mb-4 "
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
                className="text-center py-10 px-6 bg-white rounded-lg shadow-md mt-5"
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
                    className="p-4 rounded-lg bg-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
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
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="absolute top-1.5 right-1.5 z-10 p-1.5 cursor-pointer bg-white/70 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                          title="ویرایش موقعیت مکانی"
                        >
                          <FaPencilAlt size={14} />
                        </button>
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