"use client";

// --- ایمپورت‌های مورد نیاز ---
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaChevronLeft, 
  FaFlag, 
  FaTimes,
  FaPhone,
  FaWhatsapp,
  FaListUl
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import YadakchiLogo from "/public/Y.png";

// ====================================================================
// کامپوننت جستجوی نشان (بدون تغییر)
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
// کامپوننت مودال گزارش مشکل (بدون تغییر)
// ====================================================================
const ReportModal = ({ isOpen, onClose, store, product }) => {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [details, setDetails] = useState("");

  const problems = [
    "اطلاعات نادرست", "قیمت نامعتبر", "عدم پاسخگویی",
    "مکان اشتباه روی نقشه", "مشکل در تماس", "سایر موارد",
  ];

  const handleCheckboxChange = (problem) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((p) => p !== problem)
        : [...prev, problem]
    );
  };

  const handleSubmit = () => {
    if (selectedProblems.length === 0 && !details.trim()) {
      alert("لطفاً حداقل یک مشکل را انتخاب کرده یا توضیحات را وارد کنید.");
      return;
    }
    console.log({
        reportFor: store.name,
        product: product.name,
        problems: selectedProblems,
        details: details,
    });
    alert("گزارش شما با موفقیت ثبت شد.");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedProblems([]);
      setDetails("");
    }
  }, [isOpen]);

  if (!isOpen || !store) return null;

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[5000] p-4" dir="rtl" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="bg-white rounded-lg shadow-xl w-6xl h-[70vh] flex flex-col overflow-hidden p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start p-4 border-b-10  border-gray-200 ">
            <div>
              <h2 className="text-xl font-bold text-gray-800">گزارش مشکل</h2>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="font-semibold text-gray-800">{store.name}</span>
                <span className="text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt size={12}/>
                    {store.city}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                  <span>برای محصول: </span>
                  <span className="font-semibold">{product.name}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-600 rounded-full cursor-pointer"><FaTimes/></button>
          </div>
          <div className="p-6 flex-grow overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">به چه مشکلی برخوردید؟</h3>
            <div className="flex flex-col gap-4 mb-4">
              {problems.map((problem) => (
                <label key={problem} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProblems.includes(problem)}
                    onChange={() => handleCheckboxChange(problem)}
                    className="w-5 h-5 checked:accent-orange-400 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{problem}</span>
                </label>
              ))}
            </div>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="توضیحات بیشتر..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mt-2"
            ></textarea>
          </div>
          <div className=" flex items-center justify-center mb-10 ">
          <button onClick={handleSubmit} className="w-[80%] rounded-xl p-4 bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors cursor-pointer">
            ارسال مشکل
          </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};


// ====================================================================
// کامپوننت سایدبار (بدون تغییر)
// ====================================================================
const StoreListSidebar = ({ stores, onStoreSelect, selectedStoreIdx, onReportClick, onBack }) => {
    return (
        <div className="h-full w-full md:w-[35%] lg:w-[30%] bg-white shadow-2xl flex flex-col z-20" dir="rtl">
            <header className="flex justify-between items-center p-4 border-b-1 border-gray-200">
                <button 
                    onClick={onBack ? onBack : () => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="بازگشت"
                >
                    <FaArrowRight size={20}/>
                    <span>بازگشت</span>
                </button>
            </header>
            <div className="flex-grow overflow-y-auto">
                {stores.map((store, index) => (
                    <button
                        key={index}
                        onClick={() => onStoreSelect(store, index)}
                        className={`w-full text-right p-4 border-b-1 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${selectedStoreIdx === index ? 'bg-blue-50 border-r-4 border-blue-500' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-gray-900">{store.name}</span>
                                <span className="text-gray-500 flex items-center gap-1">
                                    <FaMapMarkerAlt size={12}/>
                                    {store.city}
                                </span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    onReportClick(store);
                                }}
                                className="flex cursor-pointer items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
                            >
                                <FaFlag size={12} />
                                <span>گزارش</span>
                            </button>
                        </div>
                        <div className="mb-3">
                            <span className="text-green-600 font-semibold">
                                <span className="text-black text-xs">عملکرد</span>
                                {store.performance}
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{store.desc}</p>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-800">{store.price} تومان</span>
                            <div className="flex items-center gap-2">
                                <a 
                                    href={`tel:${store.phone}`}
                                    onClick={e => e.stopPropagation()}
                                    className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                    title={`تماس با ${store.name}`}
                                >
                                    <FaPhone size={16} />
                                </a>
                                <a 
                                    href={`https://wa.me/${store.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                                    title={`واتساپ ${store.name}`}
                                >
                                    <FaWhatsapp size={18} />
                                </a>
                                <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    title={`مسیریابی به ${store.name}`}
                                >
                                    <FaMapMarkerAlt size={16} />
                                </a>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};


// ====================================================================
// کامپوننت اصلی صفحه (تغییر یافته)
// ====================================================================
export default function MapWithStoreListPage({ initialCenter = null }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(-1);
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [storeToReport, setStoreToReport] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentProduct = {
    name: "گیربکس پژو فرانسوی"
  };

  const staticMarkers = [
    { id: 1, lat: 35.6892, lng: 51.389, name: "سینا یدک", city: "کرج", performance: " عالی", desc: "خیابان ملت، خیابان کاوه، کوچه افسانه، پلاک ۷، طبقه دوم، واحد ۶", price: "۱۰۱,۴۹۹,۰۰۰", phone: "09121234567", whatsapp: "989121234567" },
    { id: 2, lat: 35.6895, lng: 51.390, name: "امید یدک", city: "تهران", performance: " خوب", desc: "خیابان آزادی، نزدیک فروشگاه اصغر", price: "۹۹,۵۰۰,۰۰۰", phone: "09129876543", whatsapp: "989129876543" },
    { id: 3, lat: 35.6888, lng: 51.388, name: "پارس یدک", city: "تهران", performance: " عالی", desc: "خیابان آزادی، روبروی فروشگاه اصغر", price: "۱۰۵,۰۰۰,۰۰۰", phone: "09125551234", whatsapp: "989125551234" },
  ];

  const staticMarkerRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) => setNmpMapboxgl(mod.default || mod));
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  useEffect(() => {
    if (!nmp_mapboxgl || !mapContainerRef.current) return;
    const centerPoint = initialCenter ? [initialCenter.lng, initialCenter.lat] : [51.389, 35.6892];
    const initialZoom = 12;

    const map = new nmp_mapboxgl.Map({
      mapType: "neshanVector", container: mapContainerRef.current, zoom: initialZoom, pitch: 0,
      center: centerPoint, minZoom: 8, maxZoom: 21, trackResize: true,
      mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5", poi: true, traffic: false, mapTypeControl: false,
    });
    setMapInstance(map);
    mapRef.current = map;

    return () => {
      if (staticMarkerRefs.current.length > 0) {
        staticMarkerRefs.current.forEach((marker) => marker.remove());
        staticMarkerRefs.current = [];
      }
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; setMapInstance(null); }
    };
  }, [nmp_mapboxgl, initialCenter]);

  useEffect(() => {
    if (!mapRef.current || !nmp_mapboxgl) return;
    if (staticMarkerRefs.current.length > 0) {
      staticMarkerRefs.current.forEach((marker) => marker.remove());
      staticMarkerRefs.current = [];
    }

    staticMarkerRefs.current = staticMarkers.map(
        (store, idx) => {
          const wrapper = document.createElement("div");
          wrapper.className = "flex flex-col items-center cursor-pointer";
          
          wrapper.style.transition = 'opacity 0.3s ease-in-out';
          if (selectedMarkerIdx > -1 && selectedMarkerIdx !== idx) {
              wrapper.style.opacity = '0.4';
          } else {
              wrapper.style.opacity = '1';
          }

          const img = document.createElement("img");
          img.src = YadakchiLogo.src; img.alt = "Yadakchi Marker";
          img.className = "w-7 h-7 object-contain transition-all duration-300";
          img.style.transform = selectedMarkerIdx === idx ? 'scale(1.5)' : 'scale(1)';
          img.style.filter = selectedMarkerIdx === idx ? 'drop-shadow(0 0 5px #00f)' : 'none';
          wrapper.appendChild(img);
          
          const label = document.createElement("div");
          label.innerText = store.price ? `${store.name} (${store.price} ت)` : store.name;
          label.className = "bg-white text-black border-1 border-orange-500 text-[10px] px-2 py-0.5 rounded-lg mt-1 whitespace-nowrap font-bold";
          wrapper.appendChild(label);

          wrapper.onclick = (e) => {
              e.stopPropagation();
              handleStoreSelect(store, idx);
          };

          return new nmp_mapboxgl.Marker({ element: wrapper, anchor: 'bottom' })
            .setLngLat([store.lng, store.lat])
            .addTo(mapRef.current);
        }
    );
    
  }, [selectedMarkerIdx, nmp_mapboxgl, mapInstance]);

  // --- تغییر اصلی در این بخش است ---
  const handleStoreSelect = (store, index) => {
      setSelectedMarkerIdx(index);
      if (mapRef.current) {
          mapRef.current.flyTo({
              center: [store.lng, store.lat],
              zoom: 15,
              essential: true
          });
      }
      // اگر موبایل بود، سایدبار را باز کن
      if(isMobile) {
          setIsMobileSidebarOpen(true);
      }
  };

  const handleOpenReportModal = (store) => {
      setStoreToReport(store);
      setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
      setIsReportModalOpen(false);
      setStoreToReport(null);
  };

  const handleMapContainerClick = () => {
    setSelectedMarkerIdx(-1);
    if(isMobile) {
        setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
        <div className="relative w-screen h-screen flex" dir="rtl">
            {!isMobile && (
              <StoreListSidebar 
                stores={staticMarkers}
                onStoreSelect={handleStoreSelect}
                selectedStoreIdx={selectedMarkerIdx}
                onReportClick={handleOpenReportModal}
              />
            )}
            
            <div className="h-full flex-grow relative">
                <div
                  ref={mapContainerRef}
                  className="h-full w-full"
                  onClick={handleMapContainerClick}
                />
                
                {mapInstance && (<NeshanSearchControl map={mapInstance} apiKey="service.07ed2db203df42b5a08ce4340ad38b5c" />)}
                
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm text-right flex gap-2 items-center">
                    <img src={YadakchiLogo.src} alt="Yadakchi Logo" className="w-10 h-10 object-contain" />
                    <p className=" text-gray-900 mt-1 text-sm">{currentProduct.name}</p>
                </div>

                {isMobile && (
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="absolute bottom-20 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg shadow-lg"
                    >
                        <FaListUl size={16}/>
                        <span>نمایش لیست فروشگاه‌ها</span>
                    </button>
                )}
            </div>
            
            <AnimatePresence>
                {isMobile && isMobileSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 flex" onClick={() => setIsMobileSidebarOpen(false)}>
                    <motion.div 
                        className="w-full max-w-md bg-white shadow-2xl ml-auto h-full" 
                        initial={{x: "100%"}} 
                        animate={{x: 0}} 
                        exit={{x: "100%"}} 
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        onClick={e => e.stopPropagation()}
                    >
                    <StoreListSidebar 
                        stores={staticMarkers}
                        onStoreSelect={(store, index) => {
                            handleStoreSelect(store, index);
                            setIsMobileSidebarOpen(false);
                        }}
                        selectedStoreIdx={selectedMarkerIdx}
                        onReportClick={handleOpenReportModal}
                        onBack={() => setIsMobileSidebarOpen(false)}
                    />
                    </motion.div>
                </div>
                )}
            </AnimatePresence>
        </div>

        <ReportModal 
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            store={storeToReport}
            product={currentProduct}
        />
    </>
  );
};