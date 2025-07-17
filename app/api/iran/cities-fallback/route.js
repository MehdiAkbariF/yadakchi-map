import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provinceNameFromFrontend = searchParams.get('province_name');

  if (!provinceNameFromFrontend) {
    return NextResponse.json({ message: "province_name parameter is required" }, { status: 400 });
  }

  // +++ راه حل اصلی: کلمه "استان " را از نام حذف می کنیم +++
  const cleanedProvinceName = provinceNameFromFrontend.replace('استان ', '').trim();

  // حالا از نام پاک شده برای ساخت URL استفاده می کنیم
  const fallbackApiUrl = `https://iran-locations-api.ir/api/v1/fa/cities?state=${encodeURIComponent(cleanedProvinceName)}`;

  console.log(`[Fallback API] Cleaned province name: "${cleanedProvinceName}"`);
  console.log(`[Fallback API] Attempting to fetch from: ${fallbackApiUrl}`);

  try {
    const response = await fetch(fallbackApiUrl, {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Fallback API] Upstream API request failed for province ${cleanedProvinceName}:`, {
        status: response.status,
        text: errorText,
      });
      throw new Error(`Fallback upstream API failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('[Fallback API] Response from upstream is not an array:', data);
      throw new Error('Invalid data format from fallback API.');
    }
    
    console.log(`[Fallback API] Successfully received ${data.length} items for ${cleanedProvinceName}.`);
    
    // استانداردسازی پاسخ (این بخش صحیح است)
    const standardizedCities = data.map(city => ({
      id: city.id,
      name: city.name,
      state_id: city.state_id,
      latitude: parseFloat(city.latitude),
      longitude: parseFloat(city.longitude)
    })).sort((a, b) => a.name.localeCompare(b.name, 'fa'));

    return NextResponse.json(standardizedCities);

  } catch (error) {
    console.error('[Fallback API] A critical error occurred:', error);
    return NextResponse.json(
      { message: "Error fetching cities from the fallback API", errorDetails: error.message },
      { status: 500 }
    );
  }
}