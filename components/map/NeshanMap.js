"use client";

import React, { useEffect, useRef } from 'react';
import NeshanMap from '@neshan-maps-platform/mapbox-gl';

// ✅ تغییر در این خط: نام فایل به style.css اصلاح شد


const NeshanMapbox = ({ options, style }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (mapInstance.current) return;

        mapInstance.current = new NeshanMap.Map({
            ...options,
            container: mapRef.current,
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [options]);

    return (
        <div ref={mapRef} style={style || { width: '100%', height: '100vh', margin: 0 }}></div>
    );
};

export default NeshanMapbox;