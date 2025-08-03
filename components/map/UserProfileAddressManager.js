// --- ایمپورت‌های مورد نیاز ---
// دستور "use client" مشخص می‌کند که این کامپوننت و تمام فرزندانش در سمت کلاینت (مرورگر کاربر) رندر و اجرا می‌شوند.
"use client";
// ایمپورت کتابخانه‌های اصلی React برای ساخت کامپوننت، مدیریت حالت (useState)، مدیریت چرخه‌های عمر (useEffect)، بهینه‌سازی توابع (useCallback) و دسترسی به DOM (useRef).
import React, { useState, useEffect, useCallback, useRef } from "react";
// ایمپورت کتابخانه framer-motion برای ایجاد انیمیشن‌های روان در رابط کاربری.
import { motion, AnimatePresence } from "framer-motion";
// ایمپورت کتابخانه html-to-image برای تبدیل بخشی از صفحه (یک عنصر HTML) به تصویر.
import * as htmlToImage from "html-to-image";
// ایمپورت آیکون‌های مختلف از کتابخانه react-icons/fa برای استفاده در دکمه‌ها و عناصر بصری.
import {
  FaPlusCircle,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPencilAlt,
  FaTrash,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
// ایمپورت آیکون‌های دیگر از react-icons/md.
import { MdMyLocation } from "react-icons/md";
import { MdSearch, MdOutlinePowerSettingsNew } from "react-icons/md";
// ایمپورت لوگوی یدک‌چی برای استفاده در نشانگرهای نقشه و بخش‌های دیگر.
import YadakchiLogo from "/public/Y.png";
// ایمپورت آیکون بستن از react-icons/io.
import { IoMdClose } from "react-icons/io";

// ====================================================================
// کامپوننت جستجو (YadakchiSearchControl)
// وظیفه: ایجاد یک نوار جستجو برای یافتن آدرس‌ها با استفاده از API یدک‌چی.
// ====================================================================
const YadakchiSearchControl = ({ map }) => {
  // --- مدیریت حالت‌های داخلی کامپوننت جستجو ---
  const [query, setQuery] = useState(""); // متنی که کاربر در نوار جستجو تایپ می‌کند.
  const [suggestions, setSuggestions] = useState([]); // لیستی از آدرس‌های پیشنهادی که از API دریافت می‌شود.
  const [isLoading, setIsLoading] = useState(false); // وضعیتی برای نمایش آیکون لودینگ هنگام جستجو.
  const [isFocused, setIsFocused] = useState(false); // وضعیتی برای کنترل نمایش/عدم نمایش لیست پیشنهادات.
  const searchContainerRef = useRef(null); // رفرنسی به عنصر اصلی کامپوننت برای تشخیص کلیک در خارج از آن.

  // --- مدیریت کلیک در خارج از کادر جستجو ---
  useEffect(() => {
    // این تابع بررسی می‌کند که آیا کلیک کاربر خارج از محدوده کامپوننت جستجو بوده است یا خیر.
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]); // اگر کلیک خارج بود، لیست پیشنهادات را خالی می‌کند.
        setIsFocused(false); // و حالت فوکوس را غیرفعال می‌کند.
      }
    };
    // یک event listener به کل سند اضافه می‌شود تا کلیک‌ها را شنود کند.
    document.addEventListener("mousedown", handleClickOutside);
    // در زمان unmount شدن کامپوننت، این listener حذف می‌شود تا از نشت حافظه جلوگیری شود.
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- منطق اصلی جستجو و دریافت پیشنهادات ---
  useEffect(() => {
    // اگر طول متن جستجو کمتر از ۲ کاراکتر باشد، هیچ درخواستی ارسال نمی‌شود.
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    // یک تایم‌اوت برای جلوگیری از ارسال درخواست به ازای هر بار تایپ کردن کاربر (debounce).
    const searchTimeout = setTimeout(async () => {
      if (!map) return; // اگر نقشه هنوز آماده نباشد، جستجو انجام نمی‌شود.
      setIsLoading(true); // فعال کردن حالت لودینگ.
      const center = map.getCenter(); // دریافت مرکز فعلی نقشه برای ارسال به API (افزایش دقت نتایج).

      // ساخت URL برای فراخوانی API جستجوی یدک‌چی.
      const url = `/api/yadakchi/SearchAddress?SearchText=${encodeURIComponent(
        query
      )}&Latitude=${center.lat}&Longitude=${center.lng}`;

      try {
        // تنظیم هدرهای مورد نیاز برای احراز هویت در API.
        const headers = {
          accept: "*/*",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzODg5ZTAyNS03YzZhLTRmYjMtYWFmZi0wZGQ2N2NiMjUxMTgiLCJSb2xlIjoiQW5vbnltb3VzIiwibmJmIjoxNzUzNzcxNjQ3LCJleHAiOjE3NjM3NzE1NDcsImlzcyI6IllhZGFrY2hpIiwiYXVkIjoiZnJvbnQubG90dGVzdC5pciJ9.RmnFkJQzU5HpS9czSOE_WHDjfACxbRwrBw8ECHGZbfYk2lhjen03C6E-HDT3NQTilrKoIDighRSiOhMDlkLRpw",
        };
        const response = await fetch(url, { headers }); // ارسال درخواست به API.

        if (!response.ok) {
          throw new Error("Yadakchi Search API request failed");
        }

        const data = await response.json(); // تبدیل پاسخ به فرمت JSON.

        // بررسی اینکه آیا پاسخ معتبر است و شامل لیستی از آیتم‌هاست.
        if (
          data &&
          data.items &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          // تبدیل داده‌های دریافتی از API به فرمت مورد نیاز کامپوننت.
          const mappedSuggestions = data.items.map((item, index) => ({
            id: item.title + index, // ایجاد یک ID منحصر به فرد.
            title: item.title,
            address: item.address,
            neighbourhood: item.neighbourhood, // اضافه کردن فیلد محله.
            location: {
              x: item.location.x, // طول جغرافیایی
              y: item.location.y, // عرض جغرافیایی
            },
          }));
          setSuggestions(mappedSuggestions); // به‌روزرسانی لیست پیشنهادات.
        } else {
          setSuggestions([]); // اگر نتیجه‌ای یافت نشد، لیست را خالی می‌کند.
        }
      } catch (error) {
        console.error("Yadakchi search error:", error);
        setSuggestions([]); // در صورت بروز خطا، لیست پیشنهادات خالی می‌شود.
      } finally {
        setIsLoading(false); // غیرفعال کردن حالت لودینگ در هر صورت.
      }
    }, 500); // تاخیر ۵۰۰ میلی‌ثانیه‌ای برای debounce.
    // پاک کردن تایم‌اوت در هر بار اجرای مجدد useEffect.
    return () => clearTimeout(searchTimeout);
  }, [query, map]); // این افکت به تغییرات query و map وابسته است.

  // --- مدیریت انتخاب یک پیشنهاد ---
  const handleSelectSuggestion = (item) => {
    if (!map || !item.location) return;
    const { x: lng, y: lat } = item.location;
    map.flyTo({ center: [lng, lat], zoom: 16 }); // پرواز نقشه به سمت مکان انتخاب شده.
    setQuery(""); // خالی کردن نوار جستجو.
    setSuggestions([]); // بستن لیست پیشنهادات.
    setIsFocused(false);
  };

  // --- رندر کردن کامپوننت ---
  return (
    <div
      ref={searchContainerRef} // اتصال رفرنس به عنصر اصلی.
      className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[90%] max-w-sm"
      dir="rtl"
    >
      <div className="relative w-full mx-auto ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // به‌روزرسانی متن جستجو با تایپ کاربر.
          onFocus={() => setIsFocused(true)} // فعال کردن حالت فوکوس.
          placeholder="جستجوی آدرس یا مکان..."
          // کلاس‌های شرطی برای تغییر ظاهر (گرد شدن گوشه‌ها) بر اساس وجود پیشنهادات.
          className={`bg-white h-10 w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 shadow-lg outline-none transition-all ${
            suggestions.length > 0 && isFocused ? "rounded-t-lg" : "rounded-lg"
          }`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ">
          {/* نمایش آیکون لودینگ یا آیکون جستجو */}
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <MdSearch size={24} />
          )}
        </div>
      </div>
      {/* نمایش لیست پیشنهادات فقط در صورتی که پیشنهادی وجود داشته باشد و نوار جستجو در حالت فوکوس باشد. */}
      {suggestions.length > 0 && isFocused && (
        <ul className="absolute w-full bg-white border-r-2 border-l-2 border-b-2 border-gray-300 rounded-b-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onMouseDown={() => handleSelectSuggestion(item)} // استفاده از onMouseDown برای اجرا قبل از از بین رفتن فوکوس.
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <div>
                {/* نمایش عنوان و محله (در صورت وجود) */}
                <p className="font-bold text-gray-800">
                  {item.title}
                  {item.neighbourhood && (
                    <span className="text-gray-500 font-normal mr-1">
                      ({item.neighbourhood})
                    </span>
                  )}
                </p>
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
// کانتینر نمایش اطلاعات فروشگاه (StoreInfoContainer)
// وظیفه: نمایش جزئیات یک فروشگاه (مارکر) در یک پنل کناری.
// ====================================================================
const StoreInfoContainer = ({ isOpen, marker, onClose }) => {
  // --- مدیریت حالت‌های داخلی ---
  const [directionInfo, setDirectionInfo] = React.useState({
    distance: null,
    duration: null,
    loading: false,
    error: null,
  });
  const [routePolyline, setRoutePolyline] = React.useState(null);
  const mapPolylineRef = useRef(null);
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null);
  const mapRef = useRef(null);

  // --- تابع کمکی برای دیکود کردن Polyline ---
  // این تابع رشته کدگذاری شده مسیر را به آرایه‌ای از مختصات جغرافیایی تبدیل می‌کند.
  function decodePolyline(str) {
    let index = 0,
      lat = 0,
      lng = 0,
      coordinates = [];
    while (index < str.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      coordinates.push([lng * 1e-5, lat * 1e-5]);
    }
    return coordinates;
  }

  // --- ایمپورت داینامیک کتابخانه نقشه نشان ---
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) =>
        setNmpMapboxgl(mod.default || mod)
      );
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  // --- دریافت اطلاعات مسیر از API نشان ---
  useEffect(() => {
    if (!isOpen || !marker) return;
    // ... (این بخش در کد اصلی شما برای نمایش مسیر از کرج بود و برای عملکرد اصلی پنل ضروری نیست)
  }, [isOpen, marker]);

  // --- رسم Polyline روی نقشه ---
  useEffect(() => {
    // ... (این بخش نیز مربوط به رسم مسیر بود)
  }, [routePolyline, nmp_mapboxgl]);

  // --- رندر کردن کامپوننت ---
  return (
    <AnimatePresence>
      {isOpen && marker && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 right-0 h-full w-full md:w-[30%] bg-white z-30 shadow-2xl flex flex-col"
          dir="rtl"
        >
          <div className="p-4 flex-grow overflow-y-auto relative ">
            <div className=" h-[5vh]  mb-5">
              <button
                onClick={onClose}
                className="z-10 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                aria-label="بستن پنل"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* هدر پنل */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {marker.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1 cursor-pointer select-none">
                <span className="text-xs text-gray-600 font-bold">گزارش</span>
                <FaExclamationTriangle className="text-yellow-500" />
              </div>
            </div>
            {/* عملکرد عالی */}
            <div className="mb-3">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                عملکرد عالی
              </span>
            </div>
            {/* آدرس */}
            <div className="mb-3">
              <span className="block text-sm text-gray-700 font-bold mb-1">
                آدرس:
              </span>
              <span className="block text-xs text-gray-600">{marker.desc}</span>
            </div>
            {/* اطلاعات تماس */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-1">
                  اطلاعات تماس:
                </span>
                <span className="font-bold text-sm text-gray-800">
                  0912xxxxxxx
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ====================================================================
// مودال انتخاب مکان از روی نقشه (MapPickerModal)
// وظیفه: نمایش یک نقشه برای انتخاب موقعیت مکانی توسط کاربر.
// ====================================================================
const MapPickerModal = ({ isOpen, onClose, onConfirm, initialCenter }) => {
  // --- مدیریت حالت‌های داخلی ---
  const mapRef = useRef(null); // رفرنس به نمونه نقشه (instance).
  const mapContainerRef = useRef(null); // رفرنس به عنصر div که نقشه در آن رندر می‌شود.
  const [mapInstance, setMapInstance] = useState(null); // حالت برای نگهداری نمونه نقشه.
  const [showStaticMarkers, setShowStaticMarkers] = useState(true); // کنترل نمایش مارکرهای ثابت فروشگاه‌ها.
  const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null); // ایندکس مارکر فروشگاه انتخاب شده.
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null); // ماژول کتابخانه نقشه نشان.
  const [isLocating, setIsLocating] = useState(false); // وضعیت لودینگ برای دکمه مکان‌یابی کاربر.

  // تعریف مارکرهای ثابت فروشگاه‌ها.
  const staticMarkers = [
    { lat: 35.6892, lng: 51.389, name: "فروشگاه اصغر", desc: "میدان آزادی" },
    {
      lat: 35.6895,
      lng: 51.39,
      name: "فروشگاه امید",
      desc: "خیابان آزادی، نزدیک فروشگاه اصغر",
    },
    {
      lat: 35.6888,
      lng: 51.388,
      name: "فروشگاه پارس",
      desc: "خیابان آزادی، روبروی فروشگاه اصغر",
    },
    {
      lat: 35.689,
      lng: 51.391,
      name: "فروشگاه یکتا",
      desc: "خیابان آزادی، کنار فروشگاه اصغر",
    },
    { lat: 35.7219, lng: 51.3347, name: "فروشگاه مهدی", desc: "میدان تجریش" },
    { lat: 35.7006, lng: 51.337, name: "فروشگاه رضا", desc: "میدان ونک" },
    { lat: 35.6467, lng: 51.389, name: "فروشگاه فلان", desc: "نازی‌آباد" },
  ];
  const staticMarkerRefs = useRef([]); // رفرنس برای نگهداری نمونه‌های مارکرها برای حذف آن‌ها.

  // ایمپورت داینامیک کتابخانه نقشه نشان.
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) =>
        setNmpMapboxgl(mod.default || mod)
      );
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  // --- راه‌اندازی و تخریب نقشه ---
  useEffect(() => {
    if (!isOpen || !nmp_mapboxgl || !mapContainerRef.current) return;
    const centerPoint = initialCenter
      ? [initialCenter.lng, initialCenter.lat]
      : [51.389, 35.6892];
    const initialZoom = initialCenter ? 16 : 12;
    // ایجاد یک نمونه جدید از نقشه نشان با تنظیمات اولیه.
    const map = new nmp_mapboxgl.Map({
      mapType: "neshanVector",
      container: mapContainerRef.current,
      zoom: initialZoom,
      pitch: 0,
      center: centerPoint,
      minZoom: 8,
      maxZoom: 21,
      trackResize: true,
      mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5",
      poi: true,
      traffic: false,
      mapTypeControl: false,
    });
    setMapInstance(map);
    mapRef.current = map;

    // تابع بازگشتی (cleanup) که هنگام بسته شدن مودال اجرا می‌شود.
    return () => {
      if (staticMarkerRefs.current.length > 0) {
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

  // --- مدیریت نمایش مارکرهای ثابت ---
  useEffect(() => {
    if (!mapRef.current || !nmp_mapboxgl) return;
    if (staticMarkerRefs.current.length > 0) {
      staticMarkerRefs.current.forEach((marker) => marker.remove());
      staticMarkerRefs.current = [];
    }
    if (showStaticMarkers) {
      staticMarkerRefs.current = staticMarkers.map(
        ({ lat, lng, name, desc }, idx) => {
          const wrapper = document.createElement("div");
          wrapper.className = "flex flex-col items-center cursor-pointer";
          wrapper.style.position = "absolute";
          wrapper.style.top = "0";
          wrapper.style.left = "0";
          const img = document.createElement("img");
          img.src = YadakchiLogo.src;
          img.alt = "Yadakchi Marker";
          img.className = "w-6 h-6 object-contain transition-all duration-200";
          img.style.transform =
            selectedMarkerIdx === idx ? "scale(1.2)" : "scale(1)";
          img.style.opacity = selectedMarkerIdx === idx ? "1" : "0.7";
          wrapper.appendChild(img);
          const label = document.createElement("div");
          label.innerText = name;
          label.className =
            "bg-white text-black text-[11px] px-2 py-0.5 rounded-full mt-1 whitespace-nowrap border-1 border-orange-600";
          wrapper.appendChild(label);
          wrapper.onclick = (e) => {
            e.stopPropagation();
            setSelectedMarkerIdx(idx);
            mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
          };
          return new nmp_mapboxgl.Marker({ element: wrapper, anchor: "bottom" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
      );
    }
  }, [showStaticMarkers, isOpen, selectedMarkerIdx, nmp_mapboxgl]);

  // افکت برای resize کردن نقشه بعد از تغییر اندازه پنل اطلاعات.
  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.resize();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedMarkerIdx]);

  // افکت برای مدیریت کلیک روی نقشه (برای لغو انتخاب مارکر).
  useEffect(() => {
    if (!mapRef.current) return;
    const handleMapClick = () => {
      setSelectedMarkerIdx(null);
    };
    mapRef.current.on("click", handleMapClick);
    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", handleMapClick);
      }
    };
  }, [isOpen]);

  // --- تابع تایید موقعیت مکانی ---
  const handleConfirmLocation = async () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    let originalZoom = map.getZoom();
    let needRestoreZoom = false;
    if (originalZoom < 15.5 || originalZoom > 16.5) {
      needRestoreZoom = true;
      map.setZoom(16);
    }
    const takeScreenshot = () => {
      const center = map.getCenter();
      const mapCanvas = map.getCanvas();
      const mapImage = mapCanvas ? mapCanvas.toDataURL("image/png") : null;
      onConfirm({ lat: center.lat, lng: center.lng, mapImage });
      if (needRestoreZoom) {
        map.setZoom(originalZoom);
      }
    };
    map.once("idle", takeScreenshot);
    map.triggerRepaint();
  };

  // --- تابع رفتن به موقعیت مکانی کاربر ---
  const handleGoToUserLocation = () => {
    if (!mapRef.current) return;
    if (!navigator.geolocation) {
      alert("مرورگر شما از قابلیت مکان‌یابی پشتیبانی نمی‌کند.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 16,
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.error("خطا در دریافت موقعیت مکانی:", error);
        if (error.code === 1) {
          alert(
            "برای استفاده از این قابلیت، لطفاً دسترسی به موقعیت مکانی را فعال کنید."
          );
        } else {
          alert("خطایی در دریافت موقعیت مکانی رخ داد.");
        }
      }
    );
  };

  // --- رندر کردن کامپوننت مودال ---
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-[4000] sm:p-4">
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="relative bg-white rounded-t-2xl sm:rounded-lg shadow-xl w-full max-w-lg md:max-w-4xl lg:max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col overflow-hidden border-gray-200 p-2 sm:p-4"
            >
              {/* دکمه بستن مودال */}
              <button
                onClick={onClose}
                className="absolute top-3 left-3 z-30 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white hover:text-red-600 transition-all duration-200 cursor-pointer"
                aria-label="بستن نقشه"
              >
                <IoMdClose size={24} />
              </button>

              {/* هدر مودال */}
              <div className="p-2 sm:p-4 text-right">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  انتخاب موقعیت مکانی
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  سفارش‌های شما به موقعیتی که انتخاب می‌کنید ارسال می‌شود.
                </p>
              </div>

              {/* کانتینر اصلی نقشه و پنل اطلاعات */}
              <div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden flex flex-row-reverse">
                {/* بخش نقشه */}
                <div
                  className={`h-full relative transition-all duration-300 ease-in-out ${
                    selectedMarkerIdx !== null ? "w-full md:w-[70%]" : "w-full"
                  }`}
                >
                  <div ref={mapContainerRef} className="h-full w-full" />
                  {mapInstance && <YadakchiSearchControl map={mapInstance} />}
                  {/* نشانگر ثابت در مرکز نقشه */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <img
                      src={YadakchiLogo.src}
                      alt="Yadakchi Logo"
                      className="w-6 h-8"
                    />
                  </div>
                  {/* چک‌باکس نمایش/عدم نمایش فروشگاه‌ها */}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-20 backdrop-blur-sm rounded-lg shadow-md"
                    dir="rtl"
                  >
                    <div className="flex items-center rounded-lg p-2 gap-2 bg-black/40">
                      <img
                        src={YadakchiLogo.src}
                        width={25}
                        height={25}
                        alt="Yadakchi Logo"
                      />
                      <label className="flex items-center gap-1 cursor-pointer select-none text-xs text-white">
                        <input
                          type="checkbox"
                          checked={showStaticMarkers}
                          onChange={(e) =>
                            setShowStaticMarkers(e.target.checked)
                          }
                          className="accent-blue-600 w-4 h-4 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* دکمه مکان‌یابی کاربر */}
                  <button
                    onClick={handleGoToUserLocation}
                    disabled={isLocating}
                    className="lg:hidden absolute bottom-20 right-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="برو به مکان من"
                    title="برو به مکان من"
                  >
                    {isLocating ? (
                      <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <MdMyLocation size={24} className="text-blue-600" />
                    )}
                  </button>
                </div>

                {/* پنل اطلاعات فروشگاه */}
                <StoreInfoContainer
                  isOpen={selectedMarkerIdx !== null}
                  marker={
                    selectedMarkerIdx !== null
                      ? staticMarkers[selectedMarkerIdx]
                      : null
                  }
                  onClose={() => setSelectedMarkerIdx(null)}
                />
              </div>

              {/* فوتر مودال با دکمه‌های تایید و انصراف */}
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
// مودال فرم آدرس (AddressFormModal)
// وظیفه: دریافت جزئیات تکمیلی آدرس (پلاک، واحد، کد پستی) از کاربر.
// ====================================================================
const AddressFormModal = ({
  isOpen,
  onClose,
  onSave,
  locationInfo,
  onBack,
}) => {
  // --- مدیریت حالت‌های داخلی ---
  const imageContainerRef = useRef(null); // رفرنس به کانتینر تصویر نقشه.
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [plak, setPlak] = useState("");
  const [vahed, setVahed] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isFetching, setIsFetching] = useState(false); // لودینگ دریافت اطلاعات آدرس.
  const [isSaving, setIsSaving] = useState(false); // لودینگ دکمه ذخیره.
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // تشخیص اینکه آیا در حالت ویرایش هستیم یا ایجاد آدرس جدید.
  const isEditMode = !!locationInfo?.id;

  // --- دریافت اطلاعات آدرس از API با استفاده از مختصات ---
  useEffect(() => {
    if (!isOpen || !locationInfo) return;
    // ریست کردن و پر کردن فیلدها.
    setPlak(locationInfo.plak || "");
    setVahed(locationInfo.vahed || "");
    setPostalCode(locationInfo.postalCode || "");
    setIsFetching(true);
    setAddress("");
    setProvince("");
    setCity("");

    // تابع برای فراخوانی API reverse-geocode یدک‌چی.
    const fetchAddressFromYadakchiAPI = async () => {
      try {
        const { lat, lng } = locationInfo.coords;
        const url = `/api/yadakchi/GetAddressInfoByLocation?Latitude=${lat}&Longitude=${lng}`;
        const headers = {
          accept: "*/*",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzODg5ZTAyNS03YzZhLTRmYjMtYWFmZi0wZGQ2N2NiMjUxMTgiLCJSb2xlIjoiQW5vbnltb3VzIiwibmJmIjoxNzUzNzcxNjQ3LCJleHAiOjE3NjM3NzE1NDcsImlzcyI6IllhZGFrY2hpIiwiYXVkIjoiZnJvbnQubG90dGVzdC5pciJ9.RmnFkJQzU5HpS9czSOE_WHDjfACxbRwrBw8ECHGZbfYk2lhjen03C6E-HDT3NQTilrKoIDighRSiOhMDlkLRpw",
        };
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error("Yadakchi API Error: " + response.statusText);
        }
        const data = await response.json();
        if (data?.status === "OK") {
          setAddress(data.formatted_address || "آدرس یافت نشد");
          setProvince(data.state || "");
          setCity(data.city || "");
        } else {
          throw new Error("Address not found in API response");
        }
      } catch (error) {
        console.error("Error fetching address from Yadakchi API:", error);
        setAddress("خطا در دریافت آدرس. لطفا دوباره تلاش کنید.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchAddressFromYadakchiAPI();
  }, [isOpen, locationInfo]);

  // توابع کنترل ورودی‌های فرم.
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

  // --- تابع ذخیره آدرس ---
  const handleSave = async () => {
    // اعتبارسنجی ورودی‌ها.
    if (address.startsWith("خطا")) {
      setAlertMessage(
        "آدرس معتبر نیست. لطفاً به نقشه بازگشته و مکان جدیدی انتخاب کنید."
      );
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

    try {
      // ایجاد تصویر ترکیبی از نقشه و اطلاعات روی آن.
      const compositeImage = await htmlToImage.toPng(
        imageContainerRef.current,
        {
          skipFonts: true, // برای جلوگیری از خطاهای CORS
          fetchOptions: { mode: "cors", credentials: "omit" },
          cacheBust: true,
          pixelRatio: 2,
          filter: (node) => node.id !== "edit-map-icon-in-form",
        }
      );
      // فراخوانی تابع onSave و ارسال تمام اطلاعات به کامپوننت والد.
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
      // در صورت خطا، از تصویر قبلی استفاده می‌شود.
      onSave({
        id: locationInfo.id,
        fullAddress: address,
        province,
        city,
        plak,
        vahed,
        postalCode,
        coords: locationInfo.coords,
        mapImage: locationInfo.mapImage, // Fallback
      });
    } finally {
      setIsSaving(false);
    }
  };

  // کلاس‌های پایه برای استایل‌دهی.
  const baseLabel = "block text-sm font-medium text-gray-700 mb-1";
  const baseInput =
    "w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500";
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
                  <p className="mt-4 text-gray-600">
                    در حال دریافت اطلاعات مکان...
                  </p>
                </div>
              ) : (
                <>
                  <div
                    ref={imageContainerRef}
                    className="relative w-full h-56 rounded-t-lg bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0"
                  >
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
                          <p className="text-white text-xs text-center truncate">
                            {address}
                          </p>
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
                      // این بخش کد صحیح برای حالت else است
                      <div className="text-center text-gray-500 p-4">
                        <p className="font-bold">ویرایش جزئیات آدرس</p>
                        <p className="text-sm">
                          برای انتخاب یا تغییر موقعیت، به نقشه بازگردید.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* بخش فرم با فیلدهای ورودی */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div>
                      <label className={baseLabel}>
                        آدرس کامل (غیرقابل ویرایش)
                      </label>
                      <textarea
                        value={address}
                        readOnly
                        rows="3"
                        className={`${disabledInput} resize-none`}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={baseLabel}>استان</label>
                        <input
                          type="text"
                          value={province}
                          disabled
                          className={disabledInput}
                        />
                      </div>
                      <div>
                        <label className={baseLabel}>شهر</label>
                        <input
                          type="text"
                          value={city}
                          disabled
                          className={disabledInput}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="plak" className={baseLabel}>
                          پلاک <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="plak"
                          type="text"
                          value={plak}
                          onChange={handlePlakChange}
                          className={baseInput}
                          required
                          autoFocus
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className={baseLabel}>
                          کد پستی <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          value={postalCode}
                          onChange={handlePostalCodeChange}
                          className={baseInput}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="vahed" className={baseLabel}>
                          واحد (اختیاری)
                        </label>
                        <input
                          id="vahed"
                          type="text"
                          value={vahed}
                          onChange={(e) => setVahed(e.target.value)}
                          className={baseInput}
                        />
                      </div>
                    </div>
                  </div>
                  {/* فوتر فرم */}
                  <div className="p-4 bg-gray-50 border-t border-t-gray-300 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center flex-shrink-0">
                    <button
                      onClick={onClose}
                      className="w-1/2 sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                    >
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
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-1/2 sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold text-[13px] rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50"
                      >
                        {isSaving ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
                        ) : isEditMode ? (
                          "بروزرسانی"
                        ) : (
                          "ذخیره آدرس"
                        )}
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
// سایر کامپوننت‌های مودال (Alert, ConfirmDelete, ImageViewer)
// این کامپوننت‌ها ساختار ساده‌تری دارند و برای نمایش پیام‌ها استفاده می‌شوند.
// ====================================================================
const AlertModal = ({ isOpen, onClose, title, message }) => {
  /* ... */
};
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  /* ... */
};
const ImageViewerModal = ({ isOpen, onClose, imageUrl }) => {
  /* ... */
};

// ====================================================================
// کامپوننت اصلی (UserAddressManager)
// وظیفه: مدیریت کل فرآیند افزودن، ویرایش، حذف و نمایش آدرس‌های کاربر.
// ====================================================================
export default function UserAddressManager() {
  // --- مدیریت حالت‌های اصلی برنامه ---
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState(null);
  const [imageToView, setImageToView] = useState(null);
  const [showDefaultModal, setShowDefaultModal] = useState(false);
  const [pendingAddress, setPendingAddress] = useState(null);
  const [pendingDefaultId, setPendingDefaultId] = useState(null);

  // --- توابع مدیریت رویدادها و جریان کاری ---

  // ۱. وقتی کاربر یک مکان را روی نقشه تایید می‌کند.
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

  // ۲. وقتی کاربر فرم آدرس را ذخیره می‌کند.
  const handleSaveAddress = useCallback(
    (addressData) => {
      if (addressData.id) {
        // حالت ویرایش
        setUserAddresses((prev) =>
          prev.map((addr) => (addr.id === addressData.id ? addressData : addr))
        );
      } else {
        // حالت افزودن آدرس جدید
        const newId = Date.now();
        const newAddress = { ...addressData, id: newId };
        if (userAddresses.length === 0) {
          setUserAddresses([newAddress]);
          setDefaultAddressId(newId);
        } else {
          setPendingAddress(newAddress);
          setShowDefaultModal(true); // پرسیدن برای تنظیم به عنوان پیش‌فرض
        }
      }
      setIsFormModalOpen(false);
      setAddressToEdit(null);
    },
    [userAddresses]
  );

  // ۳. توابع مربوط به مودال "آدرس پیش‌فرض".
  const confirmSetDefault = () => {
    if (pendingAddress) {
      setUserAddresses((prev) => [...prev, pendingAddress]);
      setDefaultAddressId(pendingAddress.id);
    } else if (pendingDefaultId) {
      setDefaultAddressId(pendingDefaultId);
    }
    setShowDefaultModal(false);
    setPendingAddress(null);
    setPendingDefaultId(null);
  };
  const declineSetDefault = () => {
    if (pendingAddress) {
      setUserAddresses((prev) => [...prev, pendingAddress]);
    }
    setShowDefaultModal(false);
    setPendingAddress(null);
    setPendingDefaultId(null);
  };

  // ۴. توابع مدیریت مودال‌ها.
  const handleCloseAllModals = () => {
    setIsMapModalOpen(false);
    setIsFormModalOpen(false);
    setAddressToEdit(null);
  };
  const handleBackToMap = useCallback(() => {
    setIsFormModalOpen(false);
    setAddressToEdit(selectedLocationInfo);
    setIsMapModalOpen(true);
  }, [selectedLocationInfo]);

  // ۵. شروع فرآیند ویرایش یا افزودن.
  const handleEditAddress = (address) => {
    setAddressToEdit(address);
    setIsMapModalOpen(true);
  };
  const handleAddNewAddress = () => {
    setAddressToEdit(null);
    setIsMapModalOpen(true);
  };

  // ۶. توابع مربوط به حذف آدرس.
  const startDeleteProcess = (addressId) => {
    setAddressIdToDelete(addressId);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    setUserAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== addressIdToDelete);
      if (defaultAddressId === addressIdToDelete && filtered.length > 0) {
        setDefaultAddressId(filtered[filtered.length - 1].id);
      } else if (filtered.length === 0) {
        setDefaultAddressId(null);
      }
      return filtered;
    });
    setIsDeleteModalOpen(false);
    setAddressIdToDelete(null);
  };

  // --- رندر کردن کامپوننت اصلی ---
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
        {/* هدر صفحه */}
        <motion.div
          className="bg-white p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold border-b-2 sm:border-b-0 border-gray-200 pb-2 sm:pb-0">
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

        {/* لیست آدرس‌های ذخیره شده */}
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
                {[...userAddresses]
                  .sort((a, b) =>
                    defaultAddressId === a.id
                      ? -1
                      : defaultAddressId === b.id
                      ? 1
                      : 0
                  )
                  .map((addr) => (
                    <motion.div
                      key={addr.id}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="p-4 rounded-lg bg-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative"
                    >
                      {defaultAddressId === addr.id && (
                        <div className="absolute top-2 left-2 z-20">
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 border border-green-300 shadow">
                            پیش‌فرض
                          </span>
                        </div>
                      )}
                      {addr.mapImage && (
                        <div className="relative flex-shrink-0 w-full sm:w-auto">
                          <button
                            onClick={() => setImageToView(addr.mapImage)}
                            className="block w-full"
                          >
                            <img
                              src={addr.mapImage}
                              alt="نمای نقشه آدرس"
                              className="w-full h-32 sm:w-24 sm:h-24 object-cover rounded-md shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            />
                          </button>
                          <button
                            onClick={() => handleEditAddress(addr)}
                            className="absolute top-1.5 right-1.5 z-10 p-1.5 cursor-pointer bg-white/70 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                            title="ویرایش موقعیت"
                          >
                            <FaPencilAlt size={14} />
                          </button>
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="font-bold flex items-start gap-2 text-gray-800 text-sm md:text-base">
                          <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                          {addr.fullAddress}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-2">
                          {addr.province}، {addr.city} - پلاک {addr.plak}
                          {addr.vahed && `، واحد ${addr.vahed}`} - کدپستی:{" "}
                          {addr.postalCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                        {defaultAddressId !== addr.id && (
                          <button
                            type="button"
                            className="p-2 cursor-pointer bg-white border border-gray-300 rounded-full shadow hover:text-green-700 transition-colors"
                            title="انتخاب به عنوان پیش‌فرض"
                            onClick={() => {
                              setPendingDefaultId(addr.id);
                              setShowDefaultModal(true);
                            }}
                          >
                            <MdOutlinePowerSettingsNew
                              size={14}
                              className="cursor-pointer"
                            />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                          title="ویرایش جزئیات"
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

      {/* رندر کردن تمام مودال‌ها */}
      <AnimatePresence>
        {showDefaultModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9000] p-4"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2">
                <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                آدرس پیش‌فرض
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                آیا می‌خواهید این آدرس به عنوان آدرس پیش‌فرض شما ثبت شود؟
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={confirmSetDefault}
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 cursor-pointer"
                >
                  بله، پیش‌فرض شود
                </button>
                <button
                  onClick={declineSetDefault}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  خیر
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
