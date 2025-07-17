'use client'; // این دستور حیاتی است و این فایل را به یک کامپوننت کلاینت تبدیل می‌کند

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function MapLoader() {
  // از useMemo استفاده می‌کنیم تا کامپوننت داینامیک در هر رندر دوباره ساخته نشود
  const Map = useMemo(() => dynamic(
    () => import('./MapComponent'), // کامپوننت اصلی نقشه را import کن
    { 
      loading: () => <p className="mt-10 text-center font-semibold">در حال بارگذاری نقشه...</p>,
      ssr: false // حالا این گزینه مجاز است، چون در یک کامپوننت کلاینت هستیم
    }
  ), []);

  return <Map />;
}