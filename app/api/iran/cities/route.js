import { NextResponse } from 'next/server';
// هر دو دیتا سورس محلی را وارد می‌کنیم
import { provinces, citiesByStateId } from '../../../../lib/iran-data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('state_id');

  if (!stateId) {
    return NextResponse.json({ message: "state_id parameter is required" }, { status: 400 });
  }

  // 1. ابتدا تلاش برای یافتن شهرها از داده‌های محلی (رویکرد سریع)
  const localCities = citiesByStateId[stateId] || [];

  if (localCities.length > 0) {
    console.log(`[Local Data] Found ${localCities.length} cities for state_id: ${stateId}.`);
    return NextResponse.json(localCities);
  }

  // 2. اگر در داده‌های محلی چیزی نبود، به عنوان Fallback از API خارجی استفاده می‌کنیم
  console.warn(`[Fallback] No local data for state_id: ${stateId}. Attempting to use fallback API.`);

  // برای استفاده از API خارجی، نام استان را از روی stateId پیدا می‌کنیم
  const province = provinces.find(p => p.id == stateId);

  if (!province) {
    console.error(`[Fallback] Province with id ${stateId} not found in local data.`);
    return NextResponse.json(
      { message: `Province with id ${stateId} not found.` },
      { status: 404 }
    );
  }

  // کلمه "استان " را از نام حذف می‌کنیم
  const cleanedProvinceName = province.name.replace('استان ', '').trim();
  const fallbackApiUrl = `https://iran-locations-api.ir/api/v1/fa/cities?state=${encodeURIComponent(cleanedProvinceName)}`;

  console.log(`[Fallback API] Attempting to fetch from: ${fallbackApiUrl}`);

  try {
    const response = await fetch(fallbackApiUrl, {
      next: { revalidate: 86400 } // کش کردن نتیجه برای یک روز
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

    // استانداردسازی خروجی API خارجی تا با فرمت داده‌های محلی یکی باشد
    const standardizedCities = data.map(city => ({
      id: city.id,
      name: city.name,
      state_id: city.state_id,
      latitude: parseFloat(city.latitude),
      longitude: parseFloat(city.longitude)
    })).sort((a, b) => a.name.localeCompare(b.name, 'fa'));

    console.log(`[Fallback API] Successfully received and standardized ${standardizedCities.length} cities for ${cleanedProvinceName}.`);
    return NextResponse.json(standardizedCities);

  } catch (error) {
    console.error('[Fallback API] A critical error occurred:', error);
    return NextResponse.json(
      { message: "Error fetching cities from the fallback API", errorDetails: error.message },
      { status: 500 }
    );
  }
}