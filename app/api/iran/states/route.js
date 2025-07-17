// ✅✅✅ محتوای صحیح برای فایل: app/api/iran/states/route.js ✅✅✅

import { NextResponse } from 'next/server';
import { provinces } from '../../../../lib/iran-data'; // @ یعنی از ریشه پروژه شروع کن

export async function GET() {
  try {
    return NextResponse.json(provinces);
  } catch (error) {
    console.error('STATES LOCAL DATA ERROR:', error);
    return NextResponse.json(
      { message: "Error fetching provinces from local data" },
      { status: 500 }
    );
  }
}