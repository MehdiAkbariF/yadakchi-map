"use client";

// --- ایمپورت‌های مورد نیاز ---
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaFlag,
  FaTimes,
  FaPhone,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import YadakchiLogo from "/public/Y.png";
import { SlArrowDown } from "react-icons/sl";

// ====================================================================
// کامپوننت‌های جستجو و مودال (بدون تغییر)
// ====================================================================
const NeshanSearchControl = ({ map, apiKey }) => {
  return null;
};
const ReportModal = ({ isOpen, onClose, store, product }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-4 lg:p-5 rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3" dir="rtl">
                <h2 className="text-base lg:text-lg font-bold mb-3">گزارش فروشگاه</h2>
                <p className="text-xs lg:text-sm">شما در حال گزارش فروشگاه <span className="font-bold">{store?.name}</span> برای محصول <span className="font-bold">{product?.name}</span> هستید.</p>
                <textarea className="w-full border p-2 mt-3 rounded text-xs lg:text-sm" placeholder="دلیل گزارش خود را بنویسید..."></textarea>
                <div className="mt-4 flex justify-end gap-3">
                    <button onClick={onClose} className="px-3 py-1.5 bg-gray-300 rounded hover:bg-gray-400 text-xs lg:text-sm">انصراف</button>
                    <button onClick={onClose} className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs lg:text-sm">ارسال گزارش</button>
                </div>
            </div>
        </div>
    );
};


// ====================================================================
// کامپوننت اسلایدر برای موبایل (بازگشت به ظاهر اولیه)
// ====================================================================
const MobileStoreSlider = ({ stores, onStoreSelect, selectedStoreIdx, onReportClick }) => {
    const viewportRef = useRef(null);
    const sliderRef = useRef(null);
    const controls = useAnimationControls();
    const [constraints, setConstraints] = useState({ right: 0, left: 0 });
    
    const reversedStores = React.useMemo(() => [...stores].reverse(), [stores]);

    useEffect(() => {
        const updateSliderState = () => {
            if (!viewportRef.current || !sliderRef.current) return;

            const viewportWidth = viewportRef.current.offsetWidth;
            const sliderWidth = sliderRef.current.scrollWidth;
            const scrollableWidth = sliderWidth - viewportWidth;

            const newConstraints = {
                right: 0,
                left: scrollableWidth > 0 ? -scrollableWidth : 0, 
            };
            setConstraints(newConstraints);
            
            if (selectedStoreIdx > -1) {
                const originalIndex = selectedStoreIdx;
                const reversedIndex = stores.length - 1 - originalIndex;
                const cardNode = sliderRef.current.children[reversedIndex];

                if (cardNode) {
                    const cardWidth = cardNode.offsetWidth;
                    const cardOffsetLeft = cardNode.offsetLeft;

                    let targetX = (viewportWidth / 2) - cardOffsetLeft - (cardWidth / 2);
                    targetX = Math.max(targetX, newConstraints.left);
                    targetX = Math.min(targetX, newConstraints.right);
                    
                    controls.start({
                        x: targetX,
                        transition: { type: 'spring', stiffness: 350, damping: 40 }
                    });
                }
            }
        };

        const timer = setTimeout(updateSliderState, 150);
        window.addEventListener('resize', updateSliderState);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateSliderState);
        };
    }, [selectedStoreIdx, stores, controls]);

    return (
        <div className="h-full w-full flex flex-col z-20" onClick={(e) => e.stopPropagation()}>
            <div
                ref={viewportRef}
                className="relative flex-grow flex items-center overflow-hidden cursor-grab active:cursor-grabbing"
                dir="ltr"
            >
                <motion.div
                    ref={sliderRef}
                    className="flex gap-4 px-4 h-auto"
                    drag="x"
                    dragConstraints={constraints}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                    animate={controls}
                    style={{ touchAction: 'pan-x' }}
                >
                    {reversedStores.map((store, reversedIndex) => {
                        const originalIndex = stores.length - 1 - reversedIndex;
                        return (
                            <motion.div
                                key={store.id || originalIndex}
                                dir="rtl"
                                // ** بازگشت به min-height **
                                className="flex-shrink-0 w-[80vw] max-w-xs flex flex-col rounded-xl shadow-lg bg-white transition-transform duration-300 min-h-[35vh]"
                                style={{
                                    border: selectedStoreIdx === originalIndex ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                    transform: selectedStoreIdx === originalIndex ? 'scale(1.03)' : 'scale(1)',
                                }}
                            >
                               <div className="overflow-y-auto p-2 lg:p-4 h-full flex flex-col" style={{touchAction: 'pan-y'}}>
                                    <motion.div 
                                        onTap={() => onStoreSelect(store, originalIndex)} 
                                        className="w-full text-right p-1 lg:p-2 cursor-pointer flex flex-col flex-grow"
                                    >
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-col items-start gap-1">
                                                    {/* ** بازگشت به فونت‌های اولیه ** */}
                                                    <span className="font-bold text-sm lg:text-base text-gray-900">{store.name}</span>
                                                    <span className="text-gray-500 flex items-center gap-1 text-[10px] lg:text-xs">
                                                        <FaMapMarkerAlt size={10}/> {store.city}
                                                    </span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); onReportClick(store); }} className="flex-shrink-0 flex cursor-pointer items-center gap-1 text-[9px] lg:text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200">
                                                    <FaFlag size={10} /> <span>گزارش</span>
                                                </button>
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-green-600 font-semibold text-xs lg:text-sm">
                                                    <span className="text-black text-[10px] lg:text-xs">عملکرد </span>
                                                    {store.performance}
                                                </span>
                                            </div>
                                            <p className="text-[11px] lg:text-sm text-gray-700 mb-3">{store.desc}</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-sm lg:text-base font-bold text-gray-800">{store.price} تومان</span>
                                            <div className="flex items-center gap-1 lg:gap-2 text-blue-800">
                                                <span className="text-[11px] lg:text-sm">اطلاعات تماس</span>
                                                {selectedStoreIdx === originalIndex ? <SlArrowDown className="transition-transform"/> : <MdArrowBackIos size={14}/>}
                                            </div>
                                        </div>
                                    </motion.div>
                                    <AnimatePresence>
                                        {selectedStoreIdx === originalIndex && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 flex-col w-full pt-2">
                                                <a href={`tel:${store.phone}`} className="p-2.5 sm:p-2 bg-blue-700 text-white rounded-lg w-[90%] flex items-center justify-between text-sm sm:text-xs"><FaPhone size={14} /> <span>تماس: {store.phone}</span> <MdArrowBackIos size={14}/></a>
                                                <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-2 bg-green-600 text-white rounded-lg w-[90%] flex items-center justify-between text-sm sm:text-xs"><FaWhatsapp size={14} /><span>واتساپ</span><MdArrowBackIos size={14}/></a>
                                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-2 bg-purple-700 text-white rounded-lg w-[90%] flex items-center justify-between text-sm sm:text-xs"><FaMapMarkerAlt size={14} /><span>مسیریابی</span><MdArrowBackIos size={14}/></a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

// ====================================================================
// کامپوننت سایدبار برای دسکتاپ (بدون تغییر)
// ====================================================================
const DesktopStoreListSidebar = ({ stores, onStoreSelect, selectedStoreIdx, onReportClick }) => {
    return (
        <div className="h-full w-full bg-white shadow-2xl flex flex-col z-20" dir="rtl">
            <header className="flex justify-between items-center p-3 border-b border-gray-200">
                <span className="font-bold text-base lg:text-lg">لیست فروشگاه‌ها</span>
            </header>
            <div className="flex-grow overflow-y-auto p-1">
                {stores.map((store, index) => (
                    <div
                        key={index}
                        onClick={() => onStoreSelect(store, index)}
                        className={`w-full text-right p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                            selectedStoreIdx === index ? 'border-2 border-blue-500' : 'border-gray-200'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex flex-col items-start gap-1">
                               <span className="font-bold text-sm lg:text-base text-gray-900">{store.name}</span>
                               <span className="text-gray-500 flex items-center gap-1 text-xs">
                                   <FaMapMarkerAlt size={11}/> {store.city}
                               </span>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); onReportClick(store); }} className="flex-shrink-0 flex cursor-pointer items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200"><FaFlag size={11} /> <span>گزارش</span></button>
                       </div>
                       <div className="mb-2">
                           <span className="text-green-600 font-semibold text-xs lg:text-sm">
                               <span className="text-black text-xs">عملکرد </span>
                               {store.performance}
                           </span>
                       </div>
                       <p className="text-xs lg:text-sm text-gray-700 mb-3">{store.desc}</p>
                       <div className="flex justify-between items-center">
                           <span className="text-sm lg:text-base font-bold text-gray-800">{store.price} تومان</span>
                           <div className="flex items-center gap-2 text-blue-800">
                               <span className="text-xs lg:text-sm">اطلاعات تماس</span>
                               {selectedStoreIdx === index ? <SlArrowDown className="transition-transform"/> : <MdArrowBackIos size={14}/>}
                           </div>
                       </div>
                        <AnimatePresence>
                            {selectedStoreIdx === index && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 flex-col w-full pt-2">
                                    <a href={`tel:${store.phone}`} className="p-2 bg-blue-700 text-white rounded-lg w-[90%] flex items-center justify-between text-xs"><FaPhone size={14} /> <span>تماس: {store.phone}</span> <MdArrowBackIos size={14}/></a>
                                    <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-600 text-white rounded-lg w-[90%] flex items-center justify-between text-xs"><FaWhatsapp size={14} /><span>واتساپ</span><MdArrowBackIos size={14}/></a>
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-700 text-white rounded-lg w-[90%] flex items-center justify-between text-xs"><FaMapMarkerAlt size={14} /><span>مسیریابی</span><MdArrowBackIos size={14}/></a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};


// ====================================================================
// کامپوننت اصلی صفحه (بدون تغییر)
// ====================================================================
export default function MapWithStoreListPage({ initialCenter = null }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(-1);
  const [nmp_mapboxgl, setNmpMapboxgl] = React.useState(null);
  const staticMarkerRefs = useRef([]);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [storeToReport, setStoreToReport] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
        const mobileCheck = window.innerWidth < 1024; 
        setIsMobile(mobileCheck);
        setIsSheetOpen(mobileCheck);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const currentProduct = {
    name: "گیربکس پژو فرانسوی"
  };

  const staticMarkers = [
    { id: 1, lat: 35.6892, lng: 51.389, name: "سینا یدک", city: "کرج", performance: " عالی", desc: "خیابان ملت، خیابان کاوه، کوچه افسانه، پلاک ۷، طبقه دوم، واحد ۶", price: "۱۰۱,۴۹۹,۰۰۰", phone: "09121234567", whatsapp: "989121234567" },
    { id: 2, lat: 35.6895, lng: 51.390, name: "امید یدک", city: "تهران", performance: " خوب", desc: "خیابان آزادی، نزدیک فروشگاه اصغر", price: "۹۹,۵۰۰,۰۰۰", phone: "09129876543", whatsapp: "989129876543" },
    { id: 3, lat: 35.6880, lng: 51.381, name: "فلان یدک", city: "تهران", performance: " عالی", desc: "خیابان آزادی، روبروی فروشگاه اصغر", price: "۱۰۵,۰۰۰,۰۰۰", phone: "09125551234", whatsapp: "989125551234" },
    { id: 4, lat: 35.6888, lng: 51.388, name: "پارس یدک", city: "تهران", performance: " عالی", desc: "خیابان آزادی، روبروی فروشگاه اصغر", price: "۱۰۵,۰۰۰,۰۰۰", phone: "09125551234", whatsapp: "989125551234" },
    { id: 5, lat: 35.6880, lng: 51.380, name: "یدک دیگر", city: "تهران", performance: " عالی", desc: "خیابان آزادی، روبروی فروشگاه اصغر", price: "۱۰۵,۰۰۰,۰۰۰", phone: "09125551234", whatsapp: "989125551234" },
  ];
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@neshan-maps-platform/mapbox-gl").then((mod) => setNmpMapboxgl(mod.default || mod));
      import("@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css");
    }
  }, []);

  useEffect(() => {
    if (!nmp_mapboxgl || !mapContainerRef.current) return;
    const centerPoint = initialCenter ? [initialCenter.lng, initialCenter.lat] : [51.389, 35.6892];
    const map = new nmp_mapboxgl.Map({
      container: mapContainerRef.current,
      mapType: "neshanVector",
      zoom: 12,
      center: centerPoint,
      mapKey: "web.1f545dea36314292a96a0da8ef9c2dc5",
    });
    setMapInstance(map);
    mapRef.current = map;
    return () => { if (map) map.remove(); };
  }, [nmp_mapboxgl, initialCenter]);

  useEffect(() => {
    if (!mapInstance) return;
    staticMarkerRefs.current.forEach(marker => marker.remove());
    staticMarkerRefs.current = [];
    staticMarkers.forEach((store, idx) => {
        const wrapper = document.createElement("div");
        wrapper.className = "flex flex-col items-center cursor-pointer";
        wrapper.style.transition = 'opacity 0.3s ease-in-out';
        wrapper.style.opacity = (selectedMarkerIdx !== -1 && selectedMarkerIdx !== idx) ? '0.5' : '1';
        const img = document.createElement("img");
        img.src = YadakchiLogo.src;
        img.className = "w-6 h-6 lg:w-8 lg:h-8 object-contain transition-all duration-300";
        img.style.transform = selectedMarkerIdx === idx ? 'scale(1.5)' : 'scale(1)';
        wrapper.appendChild(img);
        const label = document.createElement("div");
        label.innerText = store.price ? `${store.name} (${store.price} ت)` : store.name;
        label.className = "bg-white text-black border-orange-500 text-[9px] px-1.5 py-0.5 rounded-md mt-1 whitespace-nowrap font-bold";
        wrapper.appendChild(label);
        wrapper.onclick = (e) => { e.stopPropagation(); handleStoreSelect(store, idx); };
        const newMarker = new nmp_mapboxgl.Marker({ element: wrapper, anchor: 'bottom' }).setLngLat([store.lng, store.lat]).addTo(mapInstance);
        staticMarkerRefs.current.push(newMarker);
    });
  }, [selectedMarkerIdx, mapInstance, nmp_mapboxgl, staticMarkers]);

  const handleStoreSelect = (store, index) => {
    if (selectedMarkerIdx === index) {
      setSelectedMarkerIdx(-1);
    } else {
      setSelectedMarkerIdx(index);
      if (mapRef.current) {
          mapRef.current.flyTo({ center: [store.lng, store.lat], zoom: 17, essential: true });
      }
    }
  };

  const handleOpenReportModal = (store) => {
      setStoreToReport(store);
      setIsReportModalOpen(true);
  };
  
  const handleMapContainerClick = () => {
    setSelectedMarkerIdx(-1);
  };

  const sheetVariants = {
    closed: { y: "100%" },
    open: { y: "0%" },
  };

  return (
    <>
        <div className="relative w-screen h-screen flex overflow-hidden" dir="rtl">
            {!isMobile && (
              <div className="w-[35%] lg:w-[30%]">
                <DesktopStoreListSidebar 
                    stores={staticMarkers}
                    onStoreSelect={handleStoreSelect}
                    selectedStoreIdx={selectedMarkerIdx}
                    onReportClick={handleOpenReportModal}
                />
              </div>
            )}
            
            <div className="h-full flex-grow relative">
                <div ref={mapContainerRef} className="h-full w-full" onClick={handleMapContainerClick}/>
                {mapInstance && <NeshanSearchControl map={mapInstance} apiKey="service.07ed2db203df42b5a08ce4340ad38b5c" />}
                
                <div className={`absolute z-20 bg-white/90 backdrop-blur-sm p-2 lg:p-3 rounded-lg shadow-lg text-right flex gap-2 items-center ${
                    isMobile ? 'top-20 right-4' : 'bottom-4 right-4'
                }`}>
                    <img src={YadakchiLogo.src} alt="Yadakchi Logo" className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
                    <p className="text-gray-900 mt-1 text-xs lg:text-sm">{currentProduct.name}</p>
                </div>
            </div>
            
            <AnimatePresence>
                {isSheetOpen && (
                    <motion.div
                        className="fixed left-0 bottom-0 w-full z-30 flex flex-col pointer-events-auto"
                        style={{ height: '45vh' }}
                        variants={sheetVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    >
                        <div className="flex-grow overflow-hidden flex flex-col pt-4">
                           <MobileStoreSlider
                                stores={staticMarkers}
                                onStoreSelect={handleStoreSelect}
                                selectedStoreIdx={selectedMarkerIdx}
                                onReportClick={handleOpenReportModal}
                           />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <ReportModal 
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            store={storeToReport}
            product={currentProduct}
        />
    </>
  );
};