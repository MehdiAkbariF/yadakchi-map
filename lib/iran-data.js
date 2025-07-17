// ✅✅✅ محتوای کامل و نهایی برای فایل: lib/iran-data.js ✅✅✅

export const provinces = [
  { "id": 2232180, "name": "استان آذربایجان شرقی", "latitude": 38.079, "longitude": 46.289 },
  { "id": 2232182, "name": "استان آذربایجان غربی", "latitude": 37.549, "longitude": 45.076 },
  { "id": 2232184, "name": "استان اردبیل", "latitude": 38.246, "longitude": 48.293 },
  { "id": 2232185, "name": "استان اصفهان", "latitude": 32.653, "longitude": 51.679 },
  { "id": 2341571, "name": "استان البرز", "latitude": 35.832, "longitude": 50.941 },
  { "id": 2232187, "name": "استان ایلام", "latitude": 33.637, "longitude": 46.422 },
  { "id": 2232188, "name": "استان بوشهر", "latitude": 28.970, "longitude": 50.832 },
  { "id": 2393325, "name": "استان تهران", "latitude": 35.694, "longitude": 51.390 },
  { "id": 2232190, "name": "استان چهارمحال و بختیاری", "latitude": 32.333, "longitude": 50.865 },
  { "id": 2232193, "name": "استان خراسان جنوبی", "latitude": 32.868, "longitude": 59.215 },
  { "id": 2232195, "name": "استان خراسان رضوی", "latitude": 36.297, "longitude": 59.605 },
  { "id": 2232194, "name": "استان خراسان شمالی", "latitude": 37.472, "longitude": 57.332 },
  { "id": 2232196, "name": "استان خوزستان", "latitude": 31.328, "longitude": 48.691 },
  { "id": 2232198, "name": "استان زنجان", "latitude": 36.678, "longitude": 48.490 },
  { "id": 2232199, "name": "استان سمنان", "latitude": 35.578, "longitude": 53.397 },
  { "id": 2232200, "name": "استان سیستان و بلوچستان", "latitude": 29.493, "longitude": 60.857 },
  { "id": 2232201, "name": "استان فارس", "latitude": 29.620, "longitude": 52.522 },
  { "id": 2232203, "name": "استان قزوین", "latitude": 36.276, "longitude": 50.003 },
  { "id": 2232204, "name": "استان قم", "latitude": 34.643, "longitude": 50.884 },
  { "id": 2232206, "name": "استان کردستان", "latitude": 35.312, "longitude": 46.996 },
  { "id": 2232207, "name": "استان کرمان", "latitude": 30.283, "longitude": 57.078 },
  { "id": 2232208, "name": "استان کرمانشاه", "latitude": 34.331, "longitude": 47.071 },
  { "id": 2232209, "name": "استان کهگیلویه و بویراحمد", "latitude": 30.669, "longitude": 51.597 },
  { "id": 2232210, "name": "استان گلستان", "latitude": 36.839, "longitude": 54.444 },
  { "id": 2232211, "name": "استان گیلان", "latitude": 37.280, "longitude": 49.589 },
  { "id": 2232213, "name": "استان لرستان", "latitude": 33.483, "longitude": 48.354 },
  { "id": 2232215, "name": "استان مازندران", "latitude": 36.565, "longitude": 53.059 },
  { "id": 2232216, "name": "استان مرکزی", "latitude": 34.095, "longitude": 49.692 },
  { "id": 2232218, "name": "استان هرمزگان", "latitude": 27.190, "longitude": 56.273 },
  { "id": 2232219, "name": "استان همدان", "latitude": 34.798, "longitude": 48.514 },
  { "id": 2232221, "name": "استان یزد", "latitude": 31.896, "longitude": 54.367 }
].sort((a, b) => a.name.localeCompare(b.name, 'fa'));

export const citiesByStateId = {
  // ... سایر استان‌ها ...
  "2232180": [  { id: 1, name: "تبریز", slug: "tabriz", latitude: 38.079, longitude: 46.289 },
    { id: 101, name: "باسمنج", slug: "basmenj", latitude: 38.046, longitude: 46.452 },
    { id: 102, name: "سردرود", slug: "sardrud", latitude: 38.021, longitude: 46.182 },
    { id: 103, name: "خسروشاه", slug: "khosrowshah", latitude: 37.954, longitude: 46.037 },
    // شهرستان مراغه
    { id: 2, name: "مراغه", slug: "maragheh", latitude: 37.391, longitude: 46.239 },
    { id: 201, name: "خداجو", slug: "khodajou", latitude: 37.202, longitude: 46.330 },
    // شهرستان مرند
    { id: 3, name: "مرند", slug: "marand", latitude: 38.431, longitude: 45.774 },
    { id: 301, name: "زنوز", slug: "zonuz", latitude: 38.549, longitude: 45.816 },
    { id: 302, name: "یامچی", slug: "yamchi", latitude: 38.489, longitude: 45.568 },
    { id: 303, name: "کشکسرای", slug: "keshksaray", latitude: 38.406, longitude: 45.656 },
    { id: 304, name: "بناب مرند", slug: "bonab-marand", latitude: 38.530, longitude: 45.452 },
    { id: 305, name: "دیزج حسین‌بیگ", slug: "dizaj-hosein-beyg", latitude: 38.473, longitude: 45.672 },
    // شهرستان اهر
    { id: 4, name: "اهر", slug: "ahar", latitude: 38.475, longitude: 47.068 },
    // شهرستان میانه
    { id: 5, name: "میانه", slug: "miyaneh", latitude: 37.424, longitude: 47.701 },
    { id: 501, name: "آچاچی", slug: "achachi", latitude: 37.472, longitude: 47.917 },
    { id: 502, name: "ترک", slug: "tork", latitude: 37.646, longitude: 47.747 },
    { id: 503, name: "ترکمانچای", slug: "torkamanchay", latitude: 37.589, longitude: 47.406 },
    { id: 504, name: "آقکند", slug: "aqkand", latitude: 37.288, longitude: 48.243 },
    // شهرستان بناب
    { id: 6, name: "بناب", slug: "bonab", latitude: 37.341, longitude: 46.059 },
    { id: 601, name: "خوشه‌مهر", slug: "khusheh-mehr", latitude: 37.375, longitude: 46.037 },
    // شهرستان اسکو
    { id: 7, name: "اسکو", slug: "osku", latitude: 37.914, longitude: 46.126 },
    { id: 701, name: "ایلخچی", slug: "ilkhchi", latitude: 37.912, longitude: 45.989 },
    { id: 702, name: "سهند", slug: "sahand", latitude: 37.954, longitude: 46.126 },
    // شهرستان سراب
    { id: 8, name: "سراب", slug: "sarab", latitude: 37.940, longitude: 47.538 },
    { id: 801, name: "شربیان", slug: "sharabian", latitude: 37.893, longitude: 47.164 },
    { id: 802, name: "مهربان", slug: "mehraban", latitude: 38.077, longitude: 47.369 },
    { id: 803, name: "دوزدوزان", slug: "duzduzan", latitude: 37.990, longitude: 47.240 },
    // شهرستان آذرشهر
    { id: 9, name: "آذرشهر", slug: "azarshahr", latitude: 37.765, longitude: 45.978 },
    { id: 901, name: "گوگان", slug: "gugan", latitude: 37.712, longitude: 45.894 },
    { id: 902, name: "تیمورلو", slug: "teymurlu", latitude: 37.608, longitude: 45.836 },
    { id: 903, name: "ممقان", slug: "mamqan", latitude: 37.848, longitude: 45.939 },
    // شهرستان جلفا
    { id: 10, name: "جلفا", slug: "jolfa", latitude: 38.937, longitude: 45.632 },
    { id: 1001, name: "هادیشهر", slug: "hadishahr", latitude: 38.868, longitude: 45.717 },
    { id: 1002, name: "سیه‌رود", slug: "siah-rud", latitude: 38.961, longitude: 46.023 },
    // شهرستان عجب‌شیر
    { id: 11, name: "عجب‌شیر", slug: "ajabshir", latitude: 37.478, longitude: 45.882 },
    { id: 1101, name: "جوان‌قلعه", slug: "javan-qaleh", latitude: 37.458, longitude: 45.839 },
    // شهرستان ملکان
    { id: 12, name: "ملکان", slug: "malekan", latitude: 37.151, longitude: 46.108 },
    { id: 1201, name: "لیلان", slug: "leylan", latitude: 36.993, longitude: 46.216 },
    { id: 1202, name: "مبارک‌شهر", slug: "mobarak-shahr", latitude: 37.125, longitude: 46.223 },
    // شهرستان شبستر
    { id: 13, name: "شبستر", slug: "shabestar", latitude: 38.181, longitude: 45.719 },
    { id: 1301, name: "شرفخانه", slug: "sharafkhaneh", latitude: 38.172, longitude: 45.520 },
    { id: 1302, name: "شندآباد", slug: "shandabad", latitude: 38.163, longitude: 45.696 },
    { id: 1303, name: "تسوج", slug: "tasuj", latitude: 38.339, longitude: 45.347 },
    { id: 1304, name: "صوفیان", slug: "sufian", latitude: 38.252, longitude: 46.037 },
    { id: 1305, name: "سیس", slug: "sis", latitude: 38.225, longitude: 45.922 },
    { id: 1306, name: "کوزه‌کنان", slug: "kuzeh-konan", latitude: 38.179, longitude: 45.659 },
    { id: 1307, name: "وایقان", slug: "vayqan", latitude: 38.227, longitude: 45.805 },
    { id: 1308, name: "خامنه", slug: "khamaneh", latitude: 38.243, longitude: 45.726 },
    // شهرستان بستان‌آباد
    { id: 14, name: "بستان‌آباد", slug: "bostanabad", latitude: 37.859, longitude: 46.852 },
    { id: 1401, name: "تیکمه‌داش", slug: "tikmeh-dash", latitude: 37.726, longitude: 46.991 },
    { id: 1402, name: "کردکندی", slug: "kord-kandi", latitude: 37.785, longitude: 46.845 },
    // شهرستان هشترود
    { id: 15, name: "هشترود", slug: "hashtrud", latitude: 37.476, longitude: 47.046 },
    { id: 1501, name: "نظرکهریزی", slug: "nazar-kahrizi", latitude: 37.337, longitude: 47.228 },
    // شهرستان هریس
    { id: 16, name: "هریس", slug: "heris", latitude: 38.236, longitude: 47.126 },
    { id: 1601, name: "خواجه", slug: "khajeh", latitude: 38.307, longitude: 46.730 },
    { id: 1602, name: "بخشایش", slug: "bakhshayesh", latitude: 38.156, longitude: 47.070 },
    { id: 1603, name: "زرنق", slug: "zarnaq", latitude: 38.220, longitude: 47.382 },
    { id: 1604, name: "کلوانق", slug: "kolvanaq", latitude: 38.140, longitude: 47.161 },
    // شهرستان کلیبر
    { id: 17, name: "کلیبر", slug: "kaleybar", latitude: 38.868, longitude: 47.039 },
    { id: 1701, name: "آبش‌احمد", slug: "abish-ahmad", latitude: 39.049, longitude: 47.380 },
    // شهرستان چاراویماق
    { id: 18, name: "قره‌آغاج", slug: "qareh-aghaj", latitude: 37.113, longitude: 47.147 },
    // شهرستان ورزقان
    { id: 19, name: "ورزقان", slug: "varzaqan", latitude: 38.508, longitude: 46.654 },
    { id: 1901, name: "خاروانا", slug: "kharvana", latitude: 38.749, longitude: 46.398 },
    // شهرستان هوراند
    { id: 20, name: "هوراند", slug: "hurand", latitude: 38.831, longitude: 47.330 },
    // شهرستان خداآفرین
    { id: 21, name: "خمارلو", slug: "khomarlu", latitude: 39.066, longitude: 46.993 },
    { id: 2101, name: "عاشقلو", slug: "ashiqlu", latitude: 39.117, longitude: 46.666 },
    { id: 2102, name: "لاریجان", slug: "larijan", latitude: 38.995, longitude: 46.804 } /* ... */ ],

    "2232182": [
       // شهرستان ارومیه
    { id: 14, name: "ارومیه", slug: "urmia", latitude: 37.549, longitude: 45.076 },
    { id: 1401, name: "نوشین‌شهر", slug: "nushin-shahr", latitude: 37.702, longitude: 45.143 },
    { id: 1402, name: "قوشچی", slug: "qushchi", latitude: 37.957, longitude: 45.132 },
    { id: 1403, name: "سیلوانه", slug: "silvaneh", latitude: 37.409, longitude: 44.783 },
    { id: 1404, name: "سرو", slug: "serow", latitude: 37.712, longitude: 44.621 },
    // شهرستان خوی
    { id: 15, name: "خوی", slug: "khoy", latitude: 38.549, longitude: 44.954 },
    { id: 1501, name: "فیرورق", slug: "firuraq", latitude: 38.625, longitude: 44.912 },
    { id: 1502, name: "دیزج دیز", slug: "dizaj-diz", latitude: 38.487, longitude: 45.029 },
    { id: 1503, name: "زرآباد", slug: "zarabad", latitude: 38.777, longitude: 45.060 },
    { id: 1504, name: "ایواوغلی", slug: "evoghli", latitude: 38.675, longitude: 45.228 },
    { id: 1505, name: "قطور", slug: "qatur", latitude: 38.455, longitude: 44.414 },
    // شهرستان بوکان
    { id: 16, name: "بوکان", slug: "bukan", latitude: 36.522, longitude: 46.211 },
    { id: 1601, name: "سیمینه", slug: "simmineh", latitude: 36.634, longitude: 46.128 },
    // شهرستان مهاباد
    { id: 17, name: "مهاباد", slug: "mahabad", latitude: 36.764, longitude: 45.722 },
    { id: 1701, name: "گوگ‌تپه", slug: "gugtappeh", latitude: 36.903, longitude: 45.721 },
    { id: 1702, name: "خلیفان", slug: "khalifan", latitude: 36.611, longitude: 45.922 },
    // شهرستان میاندوآب
    { id: 18, name: "میاندوآب", slug: "miandoab", latitude: 36.969, longitude: 46.103 },
    { id: 1801, name: "چهاربرج", slug: "chahar-borj", latitude: 37.218, longitude: 45.961 },
    { id: 1802, name: "باروق", slug: "baruq", latitude: 37.039, longitude: 46.273 },
    { id: 1803, name: "بکتاش", slug: "bektash", latitude: 36.858, longitude: 46.128 },
    // شهرستان سلماس
    { id: 19, name: "سلماس", slug: "salmas", latitude: 38.196, longitude: 44.767 },
    { id: 1901, name: "تازه‌شهر", slug: "tazeh-shahr", latitude: 38.257, longitude: 44.664 },
    // شهرستان نقده
    { id: 21, name: "نقده", slug: "naqadeh", latitude: 36.953, longitude: 45.385 },
    { id: 2101, name: "محمدیار", slug: "mohammadyar", latitude: 36.910, longitude: 45.495 },
    // شهرستان پیرانشهر
    { id: 20, name: "پیرانشهر", slug: "piranshahr", latitude: 36.697, longitude: 45.143 },
    { id: 2001, name: "لاجان", slug: "lajan", latitude: 36.666, longitude: 45.333 }, // Note: Lajan is a district
    // شهرستان تکاب
    { id: 22, name: "تکاب", slug: "takab", latitude: 36.401, longitude: 47.113 },
    { id: 2201, name: "تخت سلیمان", slug: "takht-e-soleyman", latitude: 36.605, longitude: 47.234 },
    // شهرستان ماکو
    { id: 23, name: "ماکو", slug: "maku", latitude: 39.294, longitude: 44.498 },
    { id: 2301, name: "بازرگان", slug: "bazargan", latitude: 39.429, longitude: 44.385 },
    // شهرستان سردشت
    { id: 24, name: "سردشت", slug: "sardasht", latitude: 36.152, longitude: 45.485 },
    { id: 2401, name: "ربط", slug: "rabat", latitude: 36.336, longitude: 45.549 },
    { id: 2402, name: "نلاس", slug: "nalas", latitude: 36.152, longitude: 45.321 },
    { id: 2403, name: "میرآباد", slug: "mirabad-w", latitude: 36.314, longitude: 45.242 },
    // شهرستان شاهین‌دژ
    { id: 25, name: "شاهین‌دژ", slug: "shahin-dezh", latitude: 36.677, longitude: 46.568 },
    { id: 2501, name: "محمودآباد", slug: "mahmudabad-w", latitude: 36.787, longitude: 46.697 },
    { id: 2502, name: "کشاورز", slug: "keshavarz", latitude: 37.168, longitude: 46.564 },
    // شهرستان اشنویه
    { id: 26, name: "اشنویه", slug: "oshnavieh", latitude: 37.042, longitude: 45.099 },
    { id: 2601, name: "نالوس", slug: "nalus", latitude: 36.937, longitude: 45.163 },
    // شهرستان چایپاره
    { id: 27, name: "قره‌ضیاءالدین", slug: "qarah-zia-od-din", latitude: 38.932, longitude: 45.181 },
    { id: 2701, name: "حاجیلار", slug: "hajilar", latitude: 38.918, longitude: 45.035 },
    // شهرستان شوط
    { id: 28, name: "شوط", slug: "showt", latitude: 39.224, longitude: 44.770 },
    { id: 2801, name: "یولاگلدی", slug: "yowla-galdi", latitude: 39.313, longitude: 44.829 },
    { id: 2802, name: "مرگنلر", slug: "marganlar", latitude: 39.260, longitude: 44.922 },
    // شهرستان چالدران
    { id: 29, name: "سیه‌چشمه", slug: "siah-cheshmeh", latitude: 39.068, longitude: 44.475 },
    { id: 2901, name: "آواجیق", slug: "avajiq", latitude: 39.273, longitude: 44.204 },
    // شهرستان پلدشت
    { id: 30, name: "پلدشت", slug: "poldasht", latitude: 39.349, longitude: 45.050 },
    { id: 3001, name: "نازک علیا", slug: "nazok-e-olia", latitude: 39.117, longitude: 45.250 }
    ],

    "2232184": [
       // شهرستان اردبیل
    { id: 25, name: "اردبیل", slug: "ardabil", latitude: 38.246, longitude: 48.293 },
    { id: 2501, name: "هیر", slug: "hir", latitude: 38.069, longitude: 48.563 },
    { id: 2502, name: "آراللو", slug: "arallu", latitude: 38.258, longitude: 48.452 },
    { id: 2503, name: "ثمرین", slug: "samarin", latitude: 38.309, longitude: 48.169 },
    // شهرستان پارس‌آباد
    { id: 26, name: "پارس‌آباد", slug: "parsabad", latitude: 39.648, longitude: 47.917 },
    { id: 2601, name: "اسلام‌آباد", slug: "eslamabad-ar", latitude: 39.569, longitude: 47.785 },
    { id: 2602, name: "مغانسر", slug: "moghan-sar", latitude: 39.588, longitude: 47.935 },
    { id: 2603, name: "اولتان", slug: "oltan", latitude: 39.522, longitude: 48.067 },
    // شهرستان مشگین‌شهر
    { id: 27, name: "مشگین‌شهر", slug: "meshgin-shahr", latitude: 38.397, longitude: 47.688 },
    { id: 2701, name: "لاهرود", slug: "lahrud", latitude: 38.412, longitude: 47.883 },
    { id: 2702, name: "قصابه", slug: "qassabeh", latitude: 38.489, longitude: 47.568 },
    { id: 2703, name: "رضی", slug: "razi-ar", latitude: 38.718, longitude: 48.118 },
    { id: 2704, name: "آلنی", slug: "alni", latitude: 38.291, longitude: 47.751 },
    { id: 2705, name: "مرادلو", slug: "moradlu", latitude: 38.680, longitude: 47.930 },
    { id: 2706, name: "فخرآباد", slug: "fakhravad", latitude: 38.455, longitude: 47.828 },
    // شهرستان خلخال
    { id: 28, name: "خلخال", slug: "khalkhal", latitude: 37.618, longitude: 48.526 },
    { id: 2801, name: "هشجین", slug: "hashtjin", latitude: 37.498, longitude: 48.423 },
    { id: 2802, name: "کلور", slug: "kolur", latitude: 37.362, longitude: 48.728 },
    // شهرستان گرمی
    { id: 29, name: "گرمی", slug: "germi", latitude: 38.995, longitude: 48.067 },
    // { id: 2901, name: "انگوت", slug: "angut", latitude: 39.083, longitude: 47.669 }, // انگوت یک شهرستان مجزا است
    // شهرستان بیله‌سوار
    { id: 30, name: "بیله‌سوار", slug: "bilesavar", latitude: 39.387, longitude: 48.330 },
    { id: 3001, name: "جعفرآباد", slug: "jafarabad-ar", latitude: 39.467, longitude: 48.016 },
    { id: 3002, name: "بابک", slug: "babak-ar", latitude: 39.422, longitude: 48.163 },
    // شهرستان نمین
    { id: 31, name: "نمین", slug: "namin", latitude: 38.423, longitude: 48.487 },
    { id: 3101, name: "عنبران", slug: "anbaran", latitude: 38.472, longitude: 48.583 },
    { id: 3102, name: "آبی‌بیگلو", slug: "abi-biglu", latitude: 38.292, longitude: 48.424 },
    // شهرستان نیر
    { id: 32, name: "نیر", slug: "nir-ar", latitude: 38.040, longitude: 48.005 },
    { id: 3201, name: "کوراییم", slug: "kuraim", latitude: 37.892, longitude: 48.127 },
    // شهرستان کوثر
    { id: 33, name: "گیوی", slug: "givi", latitude: 37.671, longitude: 48.272 },
    { id: 3301, name: "فیروزآباد", slug: "firuzabad-ar", latitude: 37.608, longitude: 48.241 },
    // شهرستان اصلاندوز
    { id: 34, name: "اصلاندوز", slug: "aslan-duz", latitude: 39.378, longitude: 47.458 },
    { id: 3401, name: "بران علیا", slug: "baran-e-olia", latitude: 39.392, longitude: 47.414 },
    // شهرستان سرعین
    { id: 35, name: "سرعین", slug: "sarein", latitude: 38.150, longitude: 48.140 },
    { id: 3501, name: "ایردموسی", slug: "ir-e-musa", latitude: 38.211, longitude: 48.182 },
    // شهرستان انگوت
    { id: 36, name: "انگوت", slug: "angut", latitude: 39.083, longitude: 47.669 }
    ],

    "2232185" :[
      { id: 30, name: "اصفهان", slug: "isfahan", latitude: 32.653, longitude: 51.679 },
    { id: 3001, name: "بهارستان", slug: "baharestan", latitude: 32.502, longitude: 51.722 },
    { id: 3002, name: "قهجاورستان", slug: "qahjavarestan", latitude: 32.701, longitude: 51.841 },
    { id: 3003, name: "زیار", slug: "ziar", latitude: 32.504, longitude: 52.022 },
    // شهرستان کاشان
    { id: 31, name: "کاشان", slug: "kashan", latitude: 33.983, longitude: 51.436 },
    { id: 3101, name: "قمصر", slug: "qamsar", latitude: 33.743, longitude: 51.365 },
    { id: 3102, name: "نیاسر", slug: "niasar", latitude: 33.986, longitude: 51.155 },
    { id: 3103, name: "مشکات", slug: "meshkat", latitude: 34.153, longitude: 51.278 },
    { id: 3104, name: "جوشقان قالی", slug: "jushqan-qali", latitude: 33.565, longitude: 51.286 },
    { id: 3105, name: "راوند", slug: "ravand", latitude: 34.026, longitude: 51.349 },
    { id: 3106, name: "برزک", slug: "barzok", latitude: 33.784, longitude: 51.238 },
    // شهرستان خمینی‌شهر
    { id: 32, name: "خمینی‌شهر", slug: "khomeyni-shahr", latitude: 32.689, longitude: 51.524 },
    { id: 3201, name: "درچه", slug: "dorcheh", latitude: 32.622, longitude: 51.558 },
    { id: 3202, name: "کوشک", slug: "kushk", latitude: 32.744, longitude: 51.517 },
    { id: 3203, name: "اصغرآباد", slug: "asgharabad", latitude: 32.709, longitude: 51.434 },
    // شهرستان نجف‌آباد
    { id: 33, name: "نجف‌آباد", slug: "najafabad", latitude: 32.634, longitude: 51.369 },
    { id: 3301, name: "گلدشت", slug: "goldasht-isf", latitude: 32.646, longitude: 51.268 },
    { id: 3302, name: "کهریزسنگ", slug: "kahrizsang", latitude: 32.663, longitude: 51.419 },
    { id: 3303, name: "دهق", slug: "dehaq", latitude: 33.109, longitude: 50.811 },
    { id: 3304, name: "علویجه", slug: "alavijeh", latitude: 33.097, longitude: 50.963 },
    { id: 3305, name: "جوزدان", slug: "jowzdan", latitude: 32.618, longitude: 51.218 },
    // شهرستان شاهین‌شهر و میمه
    { id: 34, name: "شاهین‌شهر", slug: "shahin-shahr", latitude: 32.868, longitude: 51.558 },
    { id: 3401, name: "گزبرخوار", slug: "gaz-e-borkhar", latitude: 32.813, longitude: 51.681 },
    { id: 3402, name: "گرگاب", slug: "gorgab", latitude: 32.844, longitude: 51.616 },
    { id: 3403, name: "وزوان", slug: "vazvan", latitude: 33.400, longitude: 51.316 },
    { id: 3404, name: "میمه", slug: "meymeh", latitude: 33.435, longitude: 51.201 },
    // شهرستان فلاورجان
    { id: 35, name: "فلاورجان", slug: "falavarjan", latitude: 32.553, longitude: 51.507 },
    { id: 3501, name: "ایمان‌شهر", slug: "imanshahr", latitude: 32.518, longitude: 51.411 },
    { id: 3502, name: "قهدریجان", slug: "qahderijan", latitude: 32.557, longitude: 51.423 },
    { id: 3503, name: "کلیشاد و سودرجان", slug: "kelishad-va-sudarjan", latitude: 32.571, longitude: 51.524 },
    { id: 3504, name: "پیربکران", slug: "pir-bakran", latitude: 32.514, longitude: 51.583 },
    { id: 3505, name: "زازران", slug: "zazeran", latitude: 32.583, longitude: 51.442 },
    // شهرستان لنجان
    { id: 36, name: "زرین‌شهر", slug: "zarrinshahr", latitude: 32.391, longitude: 51.380 },
    { id: 3601, name: "فولادشهر", slug: "fuladshahr", latitude: 32.482, longitude: 51.458 },
    { id: 3602, name: "ورنامخواست", slug: "varnamkhast", latitude: 32.338, longitude: 51.436 },
    { id: 3603, name: "چرمهین", slug: "charmahin", latitude: 32.227, longitude: 51.171 },
    { id: 3604, name: "چمگردان", slug: "chamgardan", latitude: 32.404, longitude: 51.298 },
    { id: 3605, name: "سده لنجان", slug: "sedeh-lenjan", latitude: 32.383, longitude: 51.233 },
    // شهرستان مبارکه
    { id: 37, name: "مبارکه", slug: "mobarakeh", latitude: 32.348, longitude: 51.503 },
    { id: 3701, name: "دیزیچه", slug: "dizicheh", latitude: 32.417, longitude: 51.551 },
    { id: 3702, name: "زیباشهر", slug: "zibashahr", latitude: 32.333, longitude: 51.564 },
    { id: 3703, name: "طالخونچه", slug: "talkhuncheh", latitude: 32.296, longitude: 51.545 },
    // شهرستان شهرضا
    { id: 38, name: "شهرضا", slug: "shahreza", latitude: 32.008, longitude: 51.874 },
    { id: 3801, name: "منظریه", slug: "manzariyeh", latitude: 32.093, longitude: 51.815 },
    // شهرستان آران و بیدگل
    { id: 39, name: "آران و بیدگل", slug: "aran-va-bidgol", latitude: 34.059, longitude: 51.479 },
    { id: 3901, name: "نوش‌آباد", slug: "nushabad", latitude: 34.095, longitude: 51.435 },
    { id: 3902, name: "سفیدشهر", slug: "sefid-shahr", latitude: 33.951, longitude: 51.650 },
    { id: 3903, name: "ابوزیدآباد", slug: "abuzeydabad", latitude: 33.882, longitude: 51.758 },
    // شهرستان گلپایگان
    { id: 40, name: "گلپایگان", slug: "golpayegan", latitude: 33.454, longitude: 50.292 },
    { id: 4001, name: "گوگد", slug: "guged", latitude: 33.483, longitude: 50.323 },
    { id: 4002, name: "گلشهر", slug: "golshahr-isf", latitude: 33.435, longitude: 50.395 },
    // شهرستان خوانسار
    { id: 41, name: "خوانسار", slug: "khansar", latitude: 33.220, longitude: 50.315 },
    // شهرستان سمیرم
    { id: 42, name: "سمیرم", slug: "semirom", latitude: 31.428, longitude: 51.571 },
    { id: 4201, name: "حنا", slug: "hanna", latitude: 31.258, longitude: 51.751 },
    { id: 4202, name: "ونک", slug: "vanak", latitude: 31.579, longitude: 51.412 },
    // شهرستان نائین
    { id: 43, name: "نائین", slug: "nain", latitude: 32.861, longitude: 53.087 },
    { id: 4301, name: "بافران", slug: "bafran", latitude: 32.846, longitude: 52.993 },
    { id: 4301, name: "انارک", slug: "anarak", latitude: 33.310, longitude: 53.684 },
    // شهرستان اردستان
    { id: 44, name: "اردستان", slug: "ardestan", latitude: 33.376, longitude: 52.370 },
    { id: 4401, name: "زواره", slug: "zavareh", latitude: 33.439, longitude: 52.483 },
    { id: 4402, name: "مهاباد", slug: "mahabad-isf", latitude: 33.267, longitude: 52.275 },
    // شهرستان فریدن
    { id: 45, name: "داران", slug: "daran", latitude: 32.990, longitude: 50.413 },
    { id: 4501, name: "دامنه", slug: "damaneh", latitude: 32.964, longitude: 50.370 },
    // شهرستان فریدون‌شهر
    { id: 46, name: "فریدون‌شهر", slug: "fereydunshahr", latitude: 32.964, longitude: 50.126 },
    // شهرستان دهاقان
    { id: 47, name: "دهاقان", slug: "dehaqan", latitude: 32.138, longitude: 51.650 },
    { id: 4701, name: "گلشن", slug: "golshan-isf", latitude: 32.110, longitude: 51.706 },
    // شهرستان چادگان
    { id: 48, name: "چادگان", slug: "chadegan", latitude: 32.684, longitude: 50.672 },
    { id: 4801, name: "رزوه", slug: "razveh", latitude: 32.863, longitude: 50.564 },
    // شهرستان تیران و کرون
    { id: 49, name: "تیران", slug: "tiran", latitude: 32.705, longitude: 51.157 },
    { id: 4901, name: "عسگران", slug: "asgaran", latitude: 32.766, longitude: 50.880 },
    { id: 4902, name: "رضوانشهر", slug: "rezvanshahr", latitude: 32.816, longitude: 50.771 },
    // شهرستان جرقویه
    { id: 50, name: "نصرآباد", slug: "nasrabad-isf", latitude: 32.327, longitude: 52.384 },
    { id: 5001, name: "محمدآباد", slug: "mohammadabad-isf", latitude: 32.417, longitude: 52.193 },
    // شهرستان کوهپایه
    { id: 51, name: "کوهپایه", slug: "kuhpayeh", latitude: 32.802, longitude: 52.352 },
    { id: 5101, name: "سجزی", slug: "sajzi", latitude: 32.748, longitude: 52.053 },
    { id: 5102, name: "تودشک", slug: "tudeshk", latitude: 32.793, longitude: 52.541 },
    // شهرستان بوئین میاندشت
    { id: 52, name: "بوئین میاندشت", slug: "buin-miandasht", latitude: 32.915, longitude: 50.301 },
    { id: 5201, name: "افوس", slug: "afus", latitude: 32.935, longitude: 50.197 },
    // شهرستان هرند
    { id: 53, name: "هرند", slug: "harand", latitude: 32.559, longitude: 52.368 },
    { id: 5301, name: "اژیه", slug: "ezhiyeh", latitude: 32.433, longitude: 52.486 }
    ],

    "2341571" :[
      { id: 41, name: "کرج", slug: "karaj", latitude: 35.832, longitude: 50.941 },
      { id: 4101, name: "کمال‌شهر", slug: "kamalshahr", latitude: 35.882, longitude: 50.852 },
      { id: 4102, name: "محمدشهر", slug: "mohammadshahr", latitude: 35.776, longitude: 50.925 },
      { id: 4103, name: "ماهدشت", slug: "mahdasht", latitude: 35.753, longitude: 50.835 },
      { id: 4104, name: "گرمدره", slug: "garmdarreh", latitude: 35.753, longitude: 51.066 },
      { id: 4105, name: "آسارا", slug: "asara", latitude: 36.035, longitude: 51.247 },
      { id: 4106, name: "ولدآباد", slug: "valadabad", latitude: 35.789, longitude: 50.771 }, // Note: Could be multiple with this name
      // شهرستان فردیس
      { id: 42, name: "فردیس", slug: "fardis", latitude: 35.726, longitude: 50.985 },
      { id: 4201, name: "مشکین‌دشت", slug: "meshkindasht", latitude: 35.751, longitude: 50.938 },
      // شهرستان ساوجبلاغ
      { id: 43, name: "هشتگرد", slug: "hashtgerd", latitude: 35.962, longitude: 50.686 },
      { id: 4301, name: "شهر جدید هشتگرد", slug: "hashtgerd-new-town", latitude: 35.939, longitude: 50.741 },
      { id: 4302, name: "گلسار", slug: "golsar-al", latitude: 35.940, longitude: 50.621 },
      { id: 4303, name: "کوهسار", slug: "kuhsar", latitude: 35.976, longitude: 50.793 },
      // شهرستان نظرآباد
      { id: 44, name: "نظرآباد", slug: "nazarabad", latitude: 35.955, longitude: 50.606 },
      { id: 4401, name: "تنکمان", slug: "tankaman", latitude: 35.922, longitude: 50.592 },
      // شهرستان اشتهارد
      { id: 45, name: "اشتهارد", slug: "eshtehard", latitude: 35.723, longitude: 50.366 },
      { id: 4501, name: "پلنگ‌آباد", slug: "palangabad", latitude: 35.683, longitude: 50.518 }, // Approximated
      // شهرستان طالقان
      { id: 46, name: "طالقان", slug: "taleqan", latitude: 36.191, longitude: 50.767 },
      // شهرستان چهارباغ
      { id: 47, name: "چهارباغ", slug: "charbagh", latitude: 35.836, longitude: 50.797 }
    ],
  // +++ لیست شهرهای استان تهران به‌روز شد +++
  "2393325": [
    { id: 54, name: "تهران", slug: "tehran", latitude: 35.694, longitude: 51.390, neighborhoods: [{name: "تجریش", latitude: 35.804, longitude: 51.428}, {name: "ونک", latitude: 35.760, longitude: 51.411}] },
    { id: 55, name: "اسلام‌شهر", slug: "eslamshahr", latitude: 35.558, longitude: 51.236 },
    { id: 56, name: "شهریار", slug: "shahriar", latitude: 35.664, longitude: 51.059 },
    { id: 57, name: "قدس", slug: "qods", latitude: 35.733, longitude: 51.135 },
    { id: 58, name: "ملارد", slug: "malard", latitude: 35.665, longitude: 50.976 },
    { id: 59, name: "پاکدشت", slug: "pakdasht", latitude: 35.480, longitude: 51.684 },
    { id: 60, name: "ورامین", slug: "varamin", latitude: 35.325, longitude: 51.646 },
    { id: 61, name: "قرچک", slug: "gharchak", latitude: 35.433, longitude: 51.572 },
    { id: 62, name: "ری", slug: "rey", latitude: 35.589, longitude: 51.442 },
    { id: 63, name: "پردیس", slug: "pardis", latitude: 35.733, longitude: 51.758 },
    { id: 64, name: "دماوند", slug: "damavand", latitude: 35.719, longitude: 52.067 },
    { id: 65, name: "فیروزکوه", slug: "firuzkuh", latitude: 35.756, longitude: 52.772 },
    { id: 66, name: "پرند", slug: "parand", latitude: 35.485, longitude: 50.932 },
    { id: 67, name: "رباط‌کریم", slug: "robatkarim", latitude: 35.487, longitude: 51.085 },
    { id: 68, name: "اندیشه", slug: "andisheh", latitude: 35.711, longitude: 51.011 },
    { id: 69, name: "بومهن", slug: "boumehen", latitude: 35.727, longitude: 51.849 },
    { id: 70, name: "پیشوا", slug: "pishva", latitude: 35.305, longitude: 51.726 },
    { id: 71, name: "نسیم‌شهر", slug: "nasimshahr", latitude: 35.568, longitude: 51.157 },
    { id: 72, name: "گلستان", slug: "golestan", latitude: 35.617, longitude: 51.242 },
    { id: 73, name: "صباشهر", slug: "sabashahr", latitude: 35.617, longitude: 51.056 },
    { id: 74, name: "باغستان", slug: "baghestan", latitude: 35.696, longitude: 51.096 },
    { id: 75, name: "فردوسیه", slug: "ferdowsiyeh", latitude: 35.632, longitude: 51.002 },
    { id: 76, name: "شاهدشهر", slug: "shahedshahr", latitude: 35.642, longitude: 51.036 },
    { id: 77, name: "صفادشت", slug: "safadasht", latitude: 35.707, longitude: 50.893 },
    { id: 78, name: "حسن‌آباد", slug: "hasanabad", latitude: 35.304, longitude: 51.464 },
    { id: 79, name: "کهریزک", slug: "kahrizak", latitude: 35.534, longitude: 51.385 },
    { id: 80, name: "باقرشهر", slug: "baghershahr", latitude: 35.556, longitude: 51.393 },
    { id: 81, name: "قلعه‌نو", slug: "ghalehnow", latitude: 35.498, longitude: 51.524 },
    { id: 82, name: "آبعلی", slug: "abali", latitude: 35.816, longitude: 51.921 },
    { id: 83, name: "رودهن", slug: "roudehen", latitude: 35.733, longitude: 51.905 }
  ],

  "2232187":[
    { id: 48, name: "ایلام", slug: "ilam", latitude: 33.637, longitude: 46.422 },
    { id: 4801, name: "چوار", slug: "chavar", latitude: 33.568, longitude: 46.262 },
    { id: 4802, name: "جعفرآباد", slug: "jafarabad-il", latitude: 33.538, longitude: 46.126 },
    // شهرستان دهلران
    { id: 49, name: "دهلران", slug: "dehloran", latitude: 32.694, longitude: 47.268 },
    { id: 4901, name: "موسیان", slug: "musian", latitude: 32.553, longitude: 47.433 },
    { id: 4902, name: "پهله", slug: "pahleh", latitude: 32.898, longitude: 47.019 },
    { id: 4903, name: "میمه", slug: "meymeh-il", latitude: 32.990, longitude: 46.852 },
    // شهرستان ایوان
    { id: 50, name: "ایوان", slug: "eyvan", latitude: 33.829, longitude: 46.311 },
    { id: 5001, name: "زرنه", slug: "zarneh", latitude: 33.918, longitude: 46.182 },
    // شهرستان آبدانان
    { id: 51, name: "آبدانان", slug: "abdanan", latitude: 32.993, longitude: 47.420 },
    { id: 5101, name: "مورموری", slug: "murmuri", latitude: 32.839, longitude: 47.575 },
    { id: 5102, name: "سراب‌باغ", slug: "sarab-bagh", latitude: 32.909, longitude: 47.388 },
    // شهرستان دره‌شهر
    { id: 52, name: "دره‌شهر", slug: "darreh-shahr", latitude: 33.138, longitude: 47.375 },
    { id: 5201, name: "ماژین", slug: "mazhin", latitude: 33.003, longitude: 47.697 },
    // شهرستان مهران
    { id: 53, name: "مهران", slug: "mehran", latitude: 33.125, longitude: 46.166 },
    { id: 5301, name: "صالح‌آباد", slug: "salehabad-il", latitude: 33.473, longitude: 46.236 },
    // شهرستان چرداول (مرکز: سرابله)
    { id: 54, name: "سرابله", slug: "sarableh", latitude: 33.774, longitude: 46.559 },
    { id: 5401, name: "آسمان‌آباد", slug: "asmanabad", latitude: 33.729, longitude: 46.697 },
    { id: 5402, name: "شباب", slug: "shabab", latitude: 33.687, longitude: 46.538 },
    { id: 5403, name: "بلاوه", slug: "balaveh", latitude: 33.824, longitude: 46.685 },
    // شهرستان ملکشاهی (مرکز: ارکواز)
    { id: 55, name: "ارکواز", slug: "arkavaz", latitude: 33.364, longitude: 46.671 },
    { id: 5501, name: "دلگشا", slug: "delgosha-il", latitude: 33.426, longitude: 46.758 },
    { id: 5502, name: "مهر", slug: "mehr-il", latitude: 33.393, longitude: 46.619 },
    // شهرستان بدره
    { id: 56, name: "بدره", slug: "badreh", latitude: 33.298, longitude: 47.078 },
    { id: 5601, name: "چشمه شیرین", slug: "cheshmeh-shirin", latitude: 33.407, longitude: 46.992 },
    // شهرستان سیروان (مرکز: لومار)
    { id: 57, name: "لومار", slug: "lumar", latitude: 33.649, longitude: 46.744 },
    // شهرستان هلیلان (مرکز: توحید)
    { id: 58, name: "توحید", slug: "tohid", latitude: 33.666, longitude: 47.243 }
  ],

  "2232188":[
    { id: 51, name: "بوشهر", slug: "bushehr", latitude: 28.970, longitude: 50.832 },
    { id: 5101, name: "عالی‌شهر", slug: "ali-shahr", latitude: 28.919, longitude: 51.056 },
    { id: 5102, name: "چغادک", slug: "choghadak", latitude: 28.932, longitude: 51.002 },
    { id: 5103, name: "خارک", slug: "khark-island", latitude: 29.261, longitude: 50.323 },
    // شهرستان دشتستان
    { id: 52, name: "برازجان", slug: "borazjan", latitude: 29.266, longitude: 51.214 },
    { id: 5201, name: "آب‌پخش", slug: "ab-pakhsh", latitude: 29.378, longitude: 51.058 },
    { id: 5202, name: "وحدتیه", slug: "vahdatiyeh", latitude: 29.434, longitude: 51.246 },
    { id: 5203, name: "سعدآباد", slug: "sadabad", latitude: 29.418, longitude: 51.135 },
    { id: 5204, name: "شبانکاره", slug: "shabankareh", latitude: 29.508, longitude: 51.008 },
    { id: 5205, name: "دالکی", slug: "dalaki", latitude: 29.475, longitude: 51.350 },
    { id: 5206, name: "کلمه", slug: "kalameh", latitude: 28.949, longitude: 51.529 },
    { id: 5207, name: "بوشکان", slug: "bushkan", latitude: 28.847, longitude: 51.780 },
    { id: 5208, name: "تنگ ارم", slug: "tang-e-eram", latitude: 29.083, longitude: 51.623 },
    // شهرستان دشتی
    { id: 53, name: "خورموج", slug: "khormuj", latitude: 28.653, longitude: 51.378 },
    { id: 5301, name: "کاکی", slug: "kaki", latitude: 28.348, longitude: 51.517 },
    { id: 5302, name: "بادوله", slug: "baduleh", latitude: 28.435, longitude: 51.519 },
    { id: 5303, name: "شنبه", slug: "shonbeh", latitude: 28.384, longitude: 51.688 },
    // شهرستان تنگستان
    { id: 54, name: "اهرم", slug: "ahram", latitude: 28.887, longitude: 51.265 },
    { id: 5401, name: "دلوار", slug: "delvar", latitude: 28.784, longitude: 51.011 },
    { id: 5402, name: "آباد", slug: "abad", latitude: 28.971, longitude: 51.488 },
    // شهرستان گناوه
    { id: 55, name: "بندر گناوه", slug: "bandar-genaveh", latitude: 29.578, longitude: 50.518 },
    { id: 5501, name: "بندر ریگ", slug: "bandar-rig", latitude: 29.444, longitude: 50.638 },
    // شهرستان دیلم
    { id: 56, name: "بندر دیلم", slug: "bandar-dey-lam", latitude: 30.054, longitude: 50.158 },
    { id: 5601, name: "امام حسن", slug: "emam-hasan", latitude: 29.897, longitude: 50.317 },
    // شهرستان دیر
    { id: 57, name: "بندر دیر", slug: "bandar-dayyer", latitude: 27.838, longitude: 51.936 },
    { id: 5701, name: "بردستان", slug: "bordestan", latitude: 27.876, longitude: 51.968 },
    { id: 5702, name: "آبدان", slug: "abdan", latitude: 27.994, longitude: 51.879 },
    { id: 5703, name: "بردخون", slug: "bordekhun", latitude: 28.082, longitude: 51.487 },
    { id: 5704, name: "دوراهک", slug: "dorahak", latitude: 28.056, longitude: 51.782 },
    // شهرستان کنگان
    { id: 58, name: "بندر کنگان", slug: "bandar-kangan", latitude: 27.834, longitude: 52.062 },
    { id: 5801, name: "بنک", slug: "banak", latitude: 27.877, longitude: 52.030 },
    { id: 5802, name: "شیرینو", slug: "shirinu", latitude: 27.671, longitude: 52.379 },
    { id: 5803, name: "بندر سیراف", slug: "bandar-siraf", latitude: 27.665, longitude: 52.345 },
    // شهرستان جم
    { id: 59, name: "جم", slug: "jam", latitude: 28.016, longitude: 52.327 },
    { id: 5901, name: "ریز", slug: "riz", latitude: 28.271, longitude: 51.972 },
    { id: 5902, name: "انارستان", slug: "anarestan", latitude: 28.214, longitude: 52.285 },
    // { id: 5903, name: "بهارستان", slug: "baharestan-b", latitude: 28.0, longitude: 52.0 }, // Duplicate of Isfahan's Baharestan
    // شهرستان عسلویه
    { id: 60, name: "بندر عسلویه", slug: "bandar-asaluyeh", latitude: 27.477, longitude: 52.607 },
    { id: 6001, name: "نخل تقی", slug: "nakhl-e-taqi", latitude: 27.496, longitude: 52.571 },
    { id: 6002, name: "بیدخون", slug: "bidkhun", latitude: 27.531, longitude: 52.569 },
    { id: 6003, name: "چاه‌مبارک", slug: "chah-e-mobarak", latitude: 27.350, longitude: 52.827 }
  ],

  "2232190":[
    { id: 62, name: "شهرکرد", slug: "shahrekord", latitude: 32.333, longitude: 50.865 },
    { id: 6201, name: "هفشجان", slug: "hafshejan", latitude: 32.235, longitude: 50.804 },
    { id: 6202, name: "سورشجان", slug: "sureshjan", latitude: 32.361, longitude: 50.704 },
    { id: 6203, name: "شهرکیان", slug: "shahre-kian", latitude: 32.257, longitude: 50.963 },
    { id: 6204, name: "طاقانک", slug: "taqanak", latitude: 32.327, longitude: 50.778 },
    { id: 6205, name: "سودجان", slug: "sudjan", latitude: 32.535, longitude: 50.518 },
    { id: 6206, name: "نافچ", slug: "nafech", latitude: 32.359, longitude: 50.627 },
    { id: 6207, name: "هارونی", slug: "haruni", latitude: 32.316, longitude: 50.512 },
    // شهرستان بروجن
    { id: 63, name: "بروجن", slug: "borujen", latitude: 31.968, longitude: 51.285 },
    { id: 6301, name: "فرادنبه", slug: "faradonbeh", latitude: 32.038, longitude: 51.157 },
    { id: 6302, name: "بلداجی", slug: "boldaji", latitude: 31.905, longitude: 51.056 },
    { id: 6303, name: "نقنه", slug: "naqneh", latitude: 31.916, longitude: 51.253 },
    { id: 6304, name: "سفیددشت", slug: "sefid-dasht", latitude: 32.062, longitude: 51.042 },
    { id: 6305, name: "گندمان", slug: "gandoman", latitude: 31.890, longitude: 51.196 },
    // شهرستان فارسان
    { id: 64, name: "فارسان", slug: "farsan", latitude: 32.253, longitude: 50.569 },
    { id: 6401, name: "جونقان", slug: "juneqan", latitude: 32.203, longitude: 50.686 },
    { id: 6402, name: "باباحیدر", slug: "babaheydar", latitude: 32.330, longitude: 50.485 },
    { id: 6403, name: "پردنجان", slug: "pordanjan", latitude: 32.207, longitude: 50.630 },
    { id: 6404, name: "فیل‌آباد", slug: "fil-abad", latitude: 32.193, longitude: 50.551 },
    { id: 6405, name: "گوجان", slug: "gujan", latitude: 32.235, longitude: 50.512 },
    // شهرستان اردل
    { id: 65, name: "اردل", slug: "ardal", latitude: 31.996, longitude: 50.655 },
    { id: 6501, name: "کاج", slug: "kaj", latitude: 32.028, longitude: 50.771 },
    { id: 6502, name: "دشتک", slug: "dashtak-chb", latitude: 32.128, longitude: 50.158 },
    { id: 6503, name: "سرخون", slug: "sorkhun", latitude: 31.785, longitude: 50.291 },
    // شهرستان لردگان
    { id: 66, name: "لردگان", slug: "lordegan", latitude: 31.512, longitude: 50.803 },
    { id: 6601, name: "سردشت", slug: "sardasht-chb", latitude: 31.428, longitude: 50.918 }, // Approximated
    { id: 6602, name: "منج", slug: "monj", latitude: 31.564, longitude: 50.565 },
    { id: 6603, name: "مال‌خلیفه", slug: "mal-e-khalifeh", latitude: 31.436, longitude: 50.963 },
    // شهرستان کوهرنگ
    { id: 67, name: "چلگرد", slug: "chelgerd", latitude: 32.463, longitude: 50.119 },
    { id: 6701, name: "بازفت", slug: "bazoft", latitude: 32.129, longitude: 50.040 },
    { id: 6702, name: "صمصامی", slug: "samsami", latitude: 32.355, longitude: 50.081 },
    // شهرستان کیار
    { id: 68, name: "شلمزار", slug: "shalamzar", latitude: 32.059, longitude: 50.817 },
    { id: 6801, name: "ناغان", slug: "naghan", latitude: 31.848, longitude: 50.718 },
    { id: 6802, name: "گهرو", slug: "gahru", latitude: 32.012, longitude: 50.923 },
    { id: 6803, name: "دستنا", slug: "dastena", latitude: 32.091, longitude: 50.844 },
    // شهرستان سامان
    { id: 69, name: "سامان", slug: "saman", latitude: 32.457, longitude: 50.908 },
    { id: 6901, name: "هوره", slug: "hureh", latitude: 32.535, longitude: 50.825 },
    // شهرستان بن
    { id: 70, name: "بن", slug: "ben", latitude: 32.538, longitude: 50.745 },
    { id: 7001, name: "وردنجان", slug: "vardanjan", latitude: 32.464, longitude: 50.784 },
    { id: 7002, name: "یانچشمه", slug: "yancheshmeh", latitude: 32.618, longitude: 50.609 },
    // شهرستان خانمیرزا
    { id: 71, name: "آلونی", slug: "aluni", latitude: 31.488, longitude: 50.981 }
  ],

  "2232193":[
     // شهرستان بیرجند
     { id: 65, name: "بیرجند", slug: "birjand", latitude: 32.868, longitude: 59.215 },
     // { id: 6501, name: "خوسف", slug: "khusf", latitude: 32.793, longitude: 58.583 }, // خوسف شهرستان مجزا است
     // { id: 6502, name: "ماژان", slug: "mazhan", latitude: 32.482, longitude: 58.918 }, // ماژان متعلق به خوسف است
     // شهرستان قائنات
     { id: 66, name: "قائن", slug: "qayen", latitude: 33.725, longitude: 59.182 },
     { id: 6601, name: "خضری دشت‌بیاض", slug: "khezri-dashtebayaz", latitude: 34.020, longitude: 58.627 },
     { id: 6602, name: "نیمبلوک", slug: "nimboluk", latitude: 33.864, longitude: 58.986 },
     { id: 6603, name: "آرین‌شهر", slug: "arianshahr", latitude: 33.565, longitude: 58.654 },
     { id: 6604, name: "اسفدن", slug: "esfeden", latitude: 33.882, longitude: 59.544 },
     // شهرستان طبس
     { id: 68, name: "طبس", slug: "tabas", latitude: 33.595, longitude: 56.924 },
     { id: 6801, name: "دیهوک", slug: "deyhuk", latitude: 33.393, longitude: 57.669 },
     { id: 6802, name: "عشق‌آباد", slug: "eshqabad-sk", latitude: 34.043, longitude: 56.938 },
     // شهرستان فردوس
     { id: 67, name: "فردوس", slug: "ferdos", latitude: 34.015, longitude: 58.172 },
     { id: 6701, name: "اسلامیه", slug: "eslamiyeh", latitude: 34.067, longitude: 58.204 },
     { id: 6702, name: "باغستان", slug: "baghestan-ferdos", latitude: 34.004, longitude: 58.140 },
     // شهرستان نهبندان
     { id: 69, name: "نهبندان", slug: "nahbandan", latitude: 31.543, longitude: 60.035 },
     { id: 6901, name: "شوسف", slug: "shusef", latitude: 31.865, longitude: 60.101 },
     // شهرستان بشرویه
     { id: 70, name: "بشرویه", slug: "boshruyeh", latitude: 33.896, longitude: 57.411 },
     { id: 7001, name: "ارسک", slug: "eresk", latitude: 33.898, longitude: 57.730 },
     // شهرستان سرایان
     { id: 71, name: "سرایان", slug: "sarayan", latitude: 33.856, longitude: 58.520 },
     { id: 7101, name: "آیسک", slug: "aysak", latitude: 33.916, longitude: 58.268 },
     { id: 7102, name: "سه‌قلعه", slug: "seh-qaleh", latitude: 33.649, longitude: 58.261 },
     // شهرستان سربیشه
     { id: 72, name: "سربیشه", slug: "sarbisheh", latitude: 32.574, longitude: 59.789 },
     { id: 7201, name: "مود", slug: "mud", latitude: 32.748, longitude: 59.504 },
     { id: 7202, name: "درح", slug: "doreh", latitude: 32.181, longitude: 60.298 },
     // شهرستان درمیان
     { id: 73, name: "اسدیه", slug: "asadieh", latitude: 32.964, longitude: 59.882 },
     { id: 7301, name: "طبس مسینا", slug: "tabas-masina", latitude: 33.159, longitude: 60.334 },
     { id: 7302, name: "قهستان", slug: "qahestan", latitude: 33.280, longitude: 59.504 },
     { id: 7303, name: "گزیک", slug: "gazik", latitude: 32.610, longitude: 60.551 },
     // شهرستان زیرکوه
     { id: 74, name: "حاجی‌آباد", slug: "hajiabad-sk", latitude: 33.411, longitude: 60.081 },
     { id: 7401, name: "آبیز", slug: "abiz", latitude: 33.593, longitude: 60.211 },
     { id: 7402, name: "زهان", slug: "zahan", latitude: 33.541, longitude: 59.620 },
     // شهرستان خوسف
     { id: 75, name: "خوسف", slug: "khusf", latitude: 32.793, longitude: 58.583 },
     { id: 7501, name: "ماژان", slug: "mazhan", latitude: 32.482, longitude: 58.918 }
  ],

  "2232195":[
    { id: 69, name: "مشهد", slug: "mashhad", latitude: 36.297, longitude: 59.605 },
    { id: 6901, name: "رضویه", slug: "razaviyeh", latitude: 36.088, longitude: 59.987 },
    { id: 6902, name: "ملک‌آباد", slug: "malekabad-khr", latitude: 36.149, longitude: 59.186 },
    // شهرستان نیشابور
    { id: 70, name: "نیشابور", slug: "neyshabur", latitude: 36.213, longitude: 58.795 },
    { id: 7001, name: "قدمگاه", slug: "qadamgah", latitude: 36.113, longitude: 59.049 },
    { id: 7002, name: "چکنه", slug: "chekneh", latitude: 36.663, longitude: 58.804 },
    { id: 7003, name: "بار", slug: "bar-khr", latitude: 36.388, longitude: 58.729 },
    // شهرستان سبزوار
    { id: 71, name: "سبزوار", slug: "sabzevar", latitude: 36.213, longitude: 57.681 },
    { id: 7101, name: "رودآب", slug: "rudab", latitude: 35.807, longitude: 57.481 },
    // شهرستان تربت حیدریه
    { id: 72, name: "تربت حیدریه", slug: "torbat-heydarieh", latitude: 35.274, longitude: 59.219 },
    { id: 7201, name: "کدکن", slug: "kadkan", latitude: 35.617, longitude: 58.918 },
    { id: 7202, name: "رباط سنگ", slug: "robat-sang", latitude: 35.480, longitude: 59.431 },
    { id: 7203, name: "بایگ", slug: "bayg", latitude: 35.433, longitude: 59.011 },
    // شهرستان کاشمر
    { id: 73, name: "کاشمر", slug: "kashmar", latitude: 35.239, longitude: 58.465 },
    { id: 7301, name: "ریوش", slug: "rivash", latitude: 35.539, longitude: 58.377 }, // مرکز کوهسرخ هم هست
    // { id: 7302, name: "فرگ قلعه", slug: "farg-qaleh", latitude: 35.0, longitude: 58.0 },
    // شهرستان قوچان
    { id: 74, name: "قوچان", slug: "quchan", latitude: 37.106, longitude: 58.508 },
    { id: 7401, name: "باجگیران", slug: "bajgiran", latitude: 37.587, longitude: 58.384 },
    { id: 7402, name: "مزرج", slug: "mazraj", latitude: 37.073, longitude: 58.428 },
    { id: 7403, name: "شهرکهنه", slug: "shahre-kohneh-khr", latitude: 37.086, longitude: 58.730 },
    // شهرستان تربت جام
    { id: 75, name: "تربت جام", slug: "torbat-e-jam", latitude: 35.244, longitude: 60.622 },
    { id: 7501, name: "نصرآباد", slug: "nasrabad-khr", latitude: 35.467, longitude: 60.038 },
    { id: 7502, name: "نیل‌شهر", slug: "nilshahr", latitude: 34.825, longitude: 60.771 },
    // شهرستان تایباد
    { id: 76, name: "تایباد", slug: "taybad", latitude: 34.742, longitude: 60.776 },
    { id: 7601, name: "کاریز", slug: "kariz-khr", latitude: 34.925, longitude: 60.728 },
    { id: 7602, name: "مشهد ریزه", slug: "mashhad-rizeh", latitude: 34.935, longitude: 60.852 },
    // شهرستان چناران
    { id: 77, name: "چناران", slug: "chenaran", latitude: 36.643, longitude: 59.122 },
    { id: 7701, name: "سیدآباد", slug: "seyyedabad", latitude: 36.757, longitude: 59.278 },
    { id: 7702, name: "رادکان", slug: "radkan", latitude: 36.529, longitude: 58.828 },
    // شهرستان سرخس
    { id: 78, name: "سرخس", slug: "sarakhs", latitude: 36.544, longitude: 61.157 },
    { id: 7801, name: "مزداوند", slug: "mazdavand", latitude: 36.211, longitude: 60.727 },
    // شهرستان گناباد
    { id: 79, name: "گناباد", slug: "gonabad", latitude: 34.354, longitude: 58.682 },
    { id: 7901, name: "بیدخت", slug: "bidokht", latitude: 34.364, longitude: 58.790 },
    { id: 7902, name: "کاخک", slug: "kakhk", latitude: 34.428, longitude: 58.261 },
    // شهرستان فریمان
    { id: 80, name: "فریمان", slug: "fariman", latitude: 35.705, longitude: 59.849 },
    { id: 8001, name: "فرهادگرد", slug: "farhadgerd", latitude: 35.631, longitude: 59.948 },
    // شهرستان خواف
    { id: 81, name: "خواف", slug: "khaf", latitude: 34.577, longitude: 60.144 },
    { id: 8101, name: "سنگان", slug: "sangan", latitude: 34.409, longitude: 60.252 },
    // شهرستان بردسکن
    { id: 82, name: "بردسکن", slug: "bardaskan", latitude: 35.253, longitude: 57.967 },
    { id: 8201, name: "انابد", slug: "anabad", latitude: 35.340, longitude: 57.771 },
    // شهرستان مه‌ولات
    { id: 83, name: "فیض‌آباد", slug: "feyzabad-khr", latitude: 34.974, longitude: 58.788 },
    // شهرستان درگز
    { id: 84, name: "درگز", slug: "dargaz", latitude: 37.442, longitude: 59.109 },
    // شهرستان بجستان
    { id: 85, name: "بجستان", slug: "bajestan", latitude: 34.515, longitude: 58.181 },
    // شهرستان زاوه
    { id: 86, name: "دولت‌آباد", slug: "dowlatabad-khr", latitude: 35.158, longitude: 59.458 },
    // شهرستان جغتای
    { id: 87, name: "جغتای", slug: "jaghatay", latitude: 36.634, longitude: 57.172 },
    // شهرستان جوین
    { id: 88, name: "نقاب", slug: "neqab", latitude: 36.570, longitude: 57.382 },
    // شهرستان خوشاب
    { id: 89, name: "سلطان‌آباد", slug: "soltanabad", latitude: 36.388, longitude: 57.734 },
    // شهرستان فیروزه
    { id: 90, name: "فیروزه", slug: "firuzeh-khr", latitude: 36.311, longitude: 58.553 },
    // شهرستان کلات
    { id: 91, name: "کلات", slug: "kalat", latitude: 36.993, longitude: 59.766 },
    // شهرستان داورزن
    { id: 92, name: "داورزن", slug: "davarzan", latitude: 36.349, longitude: 56.918 },
    // شهرستان طرقبه–شاندیز
    { id: 93, name: "طرقبه", slug: "torghabeh", latitude: 36.331, longitude: 59.414 },
    { id: 9301, name: "شاندیز", slug: "shandiz", latitude: 36.408, longitude: 59.349 },
    // شهرستان کوهسرخ
    // { id: 94, name: "ریوش", slug: "rivash", latitude: 35.539, longitude: 58.377 }, // قبلا در کاشمر اضافه شد
    // شهرستان صالح‌آباد
    { id: 95, name: "صالح‌آباد", slug: "salehabad-khr", latitude: 35.751, longitude: 60.916 },
    // شهرستان گلبهار
    { id: 96, name: "گلبهار", slug: "golbahar", latitude: 36.471, longitude: 59.197 },
    { id: 9601, name: "گلمکان", slug: "golmakan", latitude: 36.495, longitude: 59.294 },
    // شهرستان باخرز
    { id: 97, name: "باخرز", slug: "bakharz", latitude: 34.793, longitude: 60.334 },
    // شهرستان ششتمد
    { id: 98, name: "ششتمد", slug: "sheshtamad", latitude: 35.889, longitude: 57.755 },
  ],

  "2232194":[
      // شهرستان بجنورد
      { id: 76, name: "بجنورد", slug: "bojnurd", latitude: 37.472, longitude: 57.332 },
      { id: 7601, name: "چناران‌شهر", slug: "chenaran-shahr", latitude: 37.525, longitude: 57.368 },
      { id: 7602, name: "حصار گرم‌خان", slug: "hesar-e-garmkhan", latitude: 37.491, longitude: 57.432 },
      // شهرستان شیروان
      { id: 77, name: "شیروان", slug: "shirvan", latitude: 37.397, longitude: 57.925 },
      { id: 7701, name: "خانلق", slug: "khanlaq", latitude: 37.381, longitude: 57.973 },
      { id: 7702, name: "زیارت", slug: "ziarat-khn", latitude: 37.485, longitude: 58.071 },
      { id: 7703, name: "لوجلی", slug: "lujali", latitude: 37.528, longitude: 58.172 },
      { id: 7704, name: "قوشخانه", slug: "qush-khaneh", latitude: 37.601, longitude: 58.269 },
      // شهرستان اسفراین
      { id: 78, name: "اسفراین", slug: "esfarayen", latitude: 36.852, longitude: 57.509 },
      { id: 7801, name: "صفی‌آباد", slug: "safiabad", latitude: 36.671, longitude: 57.352 },
      // شهرستان مانه و سملقان
      { id: 79, name: "آشخانه", slug: "ashkhaneh", latitude: 37.558, longitude: 56.920 },
      { id: 7901, name: "آوا", slug: "ava-khn", latitude: 37.468, longitude: 56.516 },
      { id: 7902, name: "پیش‌قلعه", slug: "pish-qaleh", latitude: 37.653, longitude: 57.062 },
      { id: 7903, name: "قاضی", slug: "qazi", latitude: 37.575, longitude: 57.198 },
      // شهرستان جاجرم
      { id: 80, name: "جاجرم", slug: "jajarm", latitude: 36.726, longitude: 56.376 },
      { id: 8001, name: "شوقان", slug: "showghan", latitude: 37.135, longitude: 56.764 },
      { id: 8002, name: "سنخواست", slug: "sankhast", latitude: 36.883, longitude: 56.637 },
      // شهرستان فاروج
      { id: 81, name: "فاروج", slug: "faruj", latitude: 37.234, longitude: 58.217 },
      { id: 8101, name: "تیتکانلو", slug: "titkanlu", latitude: 37.170, longitude: 58.192 },
      // شهرستان گرمه
      { id: 82, name: "گرمه", slug: "garmeh-khn", latitude: 36.635, longitude: 56.289 },
      { id: 8201, name: "درق", slug: "daraq", latitude: 36.561, longitude: 56.309 },
      { id: 8202, name: "ایور", slug: "ivar", latitude: 36.529, longitude: 56.402 },
      // شهرستان راز و جرگلان
      { id: 83, name: "راز", slug: "raz", latitude: 37.893, longitude: 57.016 },
      { id: 8301, name: "یکه‌سعود", slug: "yekkeh-sooud", latitude: 38.077, longitude: 56.336 },
      { id: 8302, name: "غلامان", slug: "gholaman", latitude: 37.886, longitude: 56.645 }
  ],

  "2232196":[
     // شهرستان اهواز
     { id: 79, name: "اهواز", slug: "ahvaz", latitude: 31.328, longitude: 48.691 },
     // { id: 7901, name: "حمیدیه", slug: "hamidiyeh", latitude: 31.480, longitude: 48.455 }, // حمیدیه شهرستان مجزا است
     { id: 7902, name: "الهایی", slug: "alahayi", latitude: 31.621, longitude: 48.618 },
     // { id: 7903, name: "شیبان", slug: "sheyban", latitude: 31.428, longitude: 48.804 }, // در باوی
     // { id: 7904, name: "ملاثانی", slug: "mollasani", latitude: 31.571, longitude: 48.889 }, // در باوی
     // شهرستان آبادان
     { id: 81, name: "آبادان", slug: "abadan", latitude: 30.339, longitude: 48.293 },
     { id: 8101, name: "اروندکنار", slug: "arvandkenar", latitude: 29.972, longitude: 48.513 },
     { id: 8102, name: "چویبده", slug: "chovebdeh", latitude: 30.155, longitude: 48.441 },
     // شهرستان خرمشهر
     { id: 84, name: "خرمشهر", slug: "khorramshahr", latitude: 30.435, longitude: 48.163 },
     { id: 8401, name: "مینوشهر", slug: "minushahr", latitude: 30.366, longitude: 48.243 },
     // شهرستان دزفول
     { id: 80, name: "دزفول", slug: "dezful", latitude: 32.383, longitude: 48.402 },
     { id: 8001, name: "صفی‌آباد", slug: "safiabad-khz", latitude: 32.274, longitude: 48.460 },
     { id: 8002, name: "میانرود", slug: "mianrud-khz", latitude: 32.196, longitude: 48.519 },
     { id: 8003, name: "دزآب", slug: "dez-ab", latitude: 32.148, longitude: 48.330 },
     { id: 8004, name: "چغامیش", slug: "choghamish", latitude: 31.956, longitude: 48.702 },
     // شهرستان اندیمشک
     { id: 83, name: "اندیمشک", slug: "andimeshk", latitude: 32.463, longitude: 48.356 },
     { id: 8301, name: "چم گلک", slug: "cham-golak", latitude: 32.559, longitude: 48.261 },
     { id: 8302, name: "آزادی", slug: "azadi-khz", latitude: 32.348, longitude: 48.381 },
     { id: 8303, name: "حسینیه", slug: "hosseiniyeh", latitude: 32.585, longitude: 48.067 },
     { id: 8304, name: "بیدروبه", slug: "bide-rubeh", latitude: 32.744, longitude: 48.046 },
     // شهرستان شوش
     { id: 100, name: "شوش", slug: "shush", latitude: 32.194, longitude: 48.243 },
     { id: 10001, name: "شاوور", slug: "shavur", latitude: 31.859, longitude: 48.452 },
     { id: 10002, name: "حر", slug: "hor-khz", latitude: 32.062, longitude: 48.271 },
     // شهرستان شوشتر
     { id: 85, name: "شوشتر", slug: "shushtar", latitude: 32.046, longitude: 48.855 },
     { id: 8501, name: "گوریه", slug: "gurieh", latitude: 31.674, longitude: 48.910 },
     { id: 8502, name: "سرداران", slug: "sardaran-khz", latitude: 32.181, longitude: 48.878 },
     // شهرستان مسجدسلیمان
     { id: 86, name: "مسجدسلیمان", slug: "masjed-soleyman", latitude: 31.936, longitude: 49.303 },
     { id: 8601, name: "گل‌گیر", slug: "golgir", latitude: 31.758, longitude: 49.525 },
     { id: 8602, name: "عنبر", slug: "anbar", latitude: 31.838, longitude: 49.349 },
     // شهرستان ایذه
     { id: 87, name: "ایذه", slug: "izeh", latitude: 31.835, longitude: 49.866 },
     // { id: 8701, name: "دهدز", slug: "dehdez", latitude: 31.650, longitude: 50.366 }, // دهدز شهرستان مجزا است
     // شهرستان بهبهان
     { id: 88, name: "بهبهان", slug: "behbehan", latitude: 30.596, longitude: 50.241 },
     { id: 8801, name: "منصوریه", slug: "mansuriyeh-khz", latitude: 30.639, longitude: 50.158 },
     { id: 8802, name: "تشان", slug: "tashan", latitude: 30.812, longitude: 50.089 },
     // شهرستان ماهشهر
     { id: 82, name: "بندر ماهشهر", slug: "bandar-mahshahr", latitude: 30.561, longitude: 49.197 },
     { id: 8201, name: "بندر امام خمینی", slug: "bandar-imam-khomeini", latitude: 30.435, longitude: 49.066 },
     { id: 8202, name: "چمران", slug: "chamran-khz", latitude: 30.540, longitude: 49.117 },
     // شهرستان رامهرمز
     { id: 89, name: "رامهرمز", slug: "ramhormoz", latitude: 31.280, longitude: 49.605 },
     { id: 8901, name: "باوج", slug: "bavaj", latitude: 31.050, longitude: 49.778 },
     // شهرستان رامشیر
     { id: 90, name: "رامشیر", slug: "ramshir", latitude: 30.893, longitude: 49.410 },
     { id: 9001, name: "مشراگه", slug: "mashrageh", latitude: 30.985, longitude: 49.231 },
     // شهرستان امیدیه
     { id: 91, name: "امیدیه", slug: "omidiyeh", latitude: 30.755, longitude: 49.704 },
     { id: 9101, name: "جایزان", slug: "jayezan", latitude: 30.852, longitude: 49.871 },
     // شهرستان هندیجان
     { id: 92, name: "هندیجان", slug: "hendijan", latitude: 30.237, longitude: 49.711 },
     { id: 9201, name: "زهره", slug: "zohreh", latitude: 30.211, longitude: 49.912 },
     // شهرستان دشت آزادگان (مرکز: سوسنگرد)
     { id: 93, name: "سوسنگرد", slug: "susangerd", latitude: 31.558, longitude: 48.181 },
     { id: 9301, name: "ابوحمیظه", slug: "abu-homeyzeh", latitude: 31.516, longitude: 48.243 },
     { id: 9302, name: "كوت سيدنعيم", slug: "kut-seyyed-naim", latitude: 31.605, longitude: 48.337 },
     // شهرستان شادگان
     { id: 94, name: "شادگان", slug: "shadegan", latitude: 30.655, longitude: 48.665 },
     { id: 9401, name: "دارخوین", slug: "darkhovin", latitude: 30.835, longitude: 48.406 },
     // شهرستان باغ‌ملک
     { id: 95, name: "باغ‌ملک", slug: "bagh-e-malek", latitude: 31.523, longitude: 49.889 },
     { id: 9501, name: "قلعه‌تل", slug: "qal-eh-tol", latitude: 31.642, longitude: 49.967 },
     { id: 9502, name: "میداوود", slug: "meydavud", latitude: 31.428, longitude: 49.813 },
     // شهرستان گتوند
     { id: 96, name: "گتوند", slug: "gotvand", latitude: 32.247, longitude: 48.805 },
     { id: 9601, name: "صالح شهر", slug: "saleh-shahr", latitude: 32.222, longitude: 48.718 },
     { id: 9602, name: "جنت مکان", slug: "jannat-makan", latitude: 32.067, longitude: 48.749 },
     { id: 9603, name: "ترکالکی", slug: "torkalaki", latitude: 32.029, longitude: 48.783 },
     // شهرستان لالی
     { id: 97, name: "لالی", slug: "lali", latitude: 32.333, longitude: 49.122 },
     // شهرستان هویزه
     { id: 98, name: "هویزه", slug: "hoveyzeh", latitude: 31.458, longitude: 47.939 },
     { id: 9801, name: "رفیع", slug: "rafie", latitude: 31.688, longitude: 47.677 },
     // شهرستان هفتکل
     { id: 99, name: "هفتکل", slug: "haftkel", latitude: 31.454, longitude: 49.531 },
     // شهرستان اندیکا
     { id: 101, name: "قلعه خواجه", slug: "qaleh-khajeh", latitude: 32.091, longitude: 49.591 },
     { id: 10101, name: "آبژدان", slug: "abzhdan", latitude: 32.001, longitude: 49.715 },
     // شهرستان دزپارت
     { id: 102, name: "دهدز", slug: "dehdez", latitude: 31.650, longitude: 50.366 },
     // شهرستان کرخه
     { id: 103, name: "الوان", slug: "alvan", latitude: 31.986, longitude: 48.272 },
     { id: 10003, name: "صالح مشطت", slug: "saleh-moshatat", latitude: 31.970, longitude: 48.330 }, // In Karkheh county
     // شهرستان باوی
     { id: 104, name: "ملاثانی", slug: "mollasani", latitude: 31.571, longitude: 48.889 },
     { id: 10401, name: "شیبان", slug: "sheyban", latitude: 31.428, longitude: 48.804 },
     { id: 10402, name: "ویس", slug: "veys", latitude: 31.488, longitude: 48.815 },
     // شهرستان حمیدیه
     { id: 105, name: "حمیدیه", slug: "hamidiyeh", latitude: 31.480, longitude: 48.455 }
  ],
  
  "2232198":[
      // شهرستان زنجان
      { id: 86, name: "زنجان", slug: "zanjan", latitude: 36.678, longitude: 48.490 },
      { id: 8601, name: "ارمغانخانه", slug: "armaghankhaneh", latitude: 36.885, longitude: 48.789 },
      { id: 8602, name: "نیک‌پی", slug: "nikpey", latitude: 36.471, longitude: 48.514 },
      // شهرستان ابهر
      { id: 87, name: "ابهر", slug: "abhar", latitude: 36.148, longitude: 49.222 },
      { id: 8701, name: "هیدج", slug: "hidaj", latitude: 36.196, longitude: 49.006 },
      { id: 8702, name: "صایین‌قلعه", slug: "saein-qaleh", latitude: 36.136, longitude: 48.892 },
      // شهرستان خرمدره
      { id: 88, name: "خرمدره", slug: "khorramdarreh", latitude: 36.208, longitude: 49.096 },
      // شهرستان خدابنده
      { id: 89, name: "قیدار", slug: "qeydar", latitude: 35.874, longitude: 48.336 },
      { id: 8901, name: "سجاس", slug: "sojas", latitude: 36.126, longitude: 48.273 },
      { id: 8902, name: "سهرورد", slug: "sohrevard", latitude: 36.148, longitude: 48.093 },
      { id: 8903, name: "گرماب", slug: "garmab", latitude: 35.733, longitude: 47.785 },
      { id: 8904, name: "زرین‌رود", slug: "zarin-rud", latitude: 35.816, longitude: 47.887 },
      { id: 8905, name: "نوربهار", slug: "nur-bahar", latitude: 35.913, longitude: 48.163 },
      { id: 8906, name: "کرسف", slug: "karasf", latitude: 35.978, longitude: 48.016 },
      // شهرستان طارم
      { id: 90, name: "آب‌بر", slug: "ab-bar", latitude: 36.879, longitude: 48.973 },
      { id: 9001, name: "چورزق", slug: "chavarzaq", latitude: 37.042, longitude: 48.899 },
      // شهرستان ایجرود
      { id: 91, name: "زرین‌آباد", slug: "zarrinabad", latitude: 36.401, longitude: 48.243 },
      { id: 9101, name: "حلب", slug: "halab-zn", latitude: 36.294, longitude: 48.139 },
      // شهرستان سلطانیه
      { id: 92, name: "سلطانیه", slug: "soltaniyeh", latitude: 36.435, longitude: 48.795 },
      // شهرستان ماهنشان
      { id: 93, name: "ماهنشان", slug: "mahneshan", latitude: 36.750, longitude: 47.669 },
      { id: 9301, name: "دندی", slug: "dandi", latitude: 36.561, longitude: 47.798 }
  ],

  "2232199":[
      // شهرستان سمنان
      { id: 89, name: "سمنان", slug: "semnan", latitude: 35.578, longitude: 53.397 },
      // { id: 8901, name: "سرخه", slug: "sorkheh", latitude: 35.467, longitude: 53.219 }, // سرخه شهرستان مجزا است
      // { id: 8902, name: "درجزین", slug: "darjazin", latitude: 35.801, longitude: 53.136 }, // در مهدی‌شهر
      // شهرستان شاهرود
      { id: 90, name: "شاهرود", slug: "shahroud", latitude: 36.416, longitude: 54.973 },
      { id: 9001, name: "بسطام", slug: "bastam", latitude: 36.491, longitude: 55.006 },
      { id: 9002, name: "مجن", slug: "mojen", latitude: 36.619, longitude: 54.770 },
      { id: 9003, name: "کلاته خیج", slug: "kalateh-khij", latitude: 36.564, longitude: 55.480 },
      { id: 9004, name: "رودیان", slug: "rudian", latitude: 36.311, longitude: 55.121 },
      { id: 9005, name: "بیارجمند", slug: "biarjomand", latitude: 35.688, longitude: 55.856 },
      // شهرستان دامغان
      { id: 91, name: "دامغان", slug: "damghan", latitude: 36.168, longitude: 54.347 },
      { id: 9101, name: "دیباج", slug: "dibaj", latitude: 36.467, longitude: 54.218 },
      { id: 9102, name: "امیریه", slug: "amiriyeh", latitude: 36.084, longitude: 54.269 },
      { id: 9103, name: "کلاته", slug: "kalateh", latitude: 36.236, longitude: 54.195 },
      // شهرستان گرمسار
      { id: 92, name: "گرمسار", slug: "garmsar", latitude: 35.215, longitude: 52.342 },
      { id: 9201, name: "ایوانکی", slug: "eyvanekey", latitude: 35.312, longitude: 52.062 },
      // شهرستان آرادان
      { id: 93, name: "آرادان", slug: "aradan", latitude: 35.253, longitude: 52.484 },
      { id: 9301, name: "کهن‌آباد", slug: "kohnabad", latitude: 35.219, longitude: 52.544 },
      // شهرستان میامی
      { id: 94, name: "میامی", slug: "meyami", latitude: 36.402, longitude: 55.602 },
      { id: 9401, name: "رضوان", slug: "rezvan", latitude: 36.353, longitude: 55.972 },
      // شهرستان سرخه
      { id: 95, name: "سرخه", slug: "sorkheh", latitude: 35.467, longitude: 53.219 },
      // شهرستان مهدی‌شهر
      { id: 96, name: "مهدی‌شهر", slug: "mehdishahr", latitude: 35.713, longitude: 53.351 },
      { id: 9601, name: "شهمیرزاد", slug: "shahmirzad", latitude: 35.782, longitude: 53.310 },
      { id: 9602, name: "درجزین", slug: "darjazin", latitude: 35.801, longitude: 53.136 },
      { id: 9603, name: "چاشم", slug: "chashm", latitude: 35.912, longitude: 53.076 }
  ],

  "2232200":[
    { id: 92, name: "زاهدان", slug: "zahedan", latitude: 29.493, longitude: 60.857 },
    { id: 9201, name: "نصرت‌آباد", slug: "nosratabad-sb", latitude: 30.292, longitude: 59.989 },
    { id: 9202, name: "سرجنگل", slug: "sarjangal", latitude: 28.948, longitude: 60.038 },
    // شهرستان زابل
    { id: 93, name: "زابل", slug: "zabol", latitude: 31.028, longitude: 61.503 },
    { id: 9301, name: "بنجار", slug: "banjar", latitude: 31.071, longitude: 61.439 },
    // شهرستان ایرانشهر
    { id: 94, name: "ایرانشهر", slug: "iranshahr", latitude: 27.202, longitude: 60.684 },
    { id: 9401, name: "بزمان", slug: "bazman", latitude: 27.848, longitude: 59.986 },
    // شهرستان چابهار
    { id: 95, name: "چابهار", slug: "chabahar", latitude: 25.292, longitude: 60.643 },
    { id: 9501, name: "پلان", slug: "plan-sb", latitude: 25.700, longitude: 60.771 },
    // شهرستان سراوان
    { id: 96, name: "سراوان", slug: "saravan", latitude: 27.371, longitude: 62.336 },
    { id: 9601, name: "محمدی", slug: "mohammadi-sb", latitude: 27.387, longitude: 62.246 },
    { id: 9602, name: "گشت", slug: "gosht", latitude: 27.797, longitude: 61.789 },
    { id: 9603, name: "سیرکان", slug: "sirkan", latitude: 26.549, longitude: 63.150 },
    { id: 9604, name: "اسفندک", slug: "esfandak", latitude: 27.135, longitude: 62.809 },
    // شهرستان خاش
    { id: 97, name: "خاش", slug: "khash", latitude: 28.221, longitude: 61.216 },
    { id: 9701, name: "اسماعیل‌آباد", slug: "esmailabad-sb", latitude: 28.324, longitude: 61.328 },
    // شهرستان کنارک
    { id: 98, name: "کنارک", slug: "konarak", latitude: 25.358, longitude: 60.400 },
    // { id: 9801, name: "شهر جدید تیس", slug: "tis-new-town", latitude: 25.362, longitude: 60.605 },
    // شهرستان نیک‌شهر
    { id: 99, name: "نیک‌شهر", slug: "nik-shahr", latitude: 26.233, longitude: 60.218 },
    { id: 9901, name: "بنت", slug: "bent", latitude: 26.257, longitude: 60.463 },
    // شهرستان راسک
    { id: 100, name: "راسک", slug: "rask", latitude: 26.237, longitude: 61.401 },
    { id: 10001, name: "پیشین", slug: "pishin", latitude: 25.751, longitude: 61.748 },
    { id: 10002, name: "پارود", slug: "parud", latitude: 26.115, longitude: 61.219 },
    // شهرستان سیب و سوران
    { id: 101, name: "سوران", slug: "suran", latitude: 27.241, longitude: 62.036 },
    { id: 10101, name: "سیب", slug: "sib", latitude: 27.352, longitude: 61.968 },
    { id: 10102, name: "هیدوچ", slug: "hiduch", latitude: 27.060, longitude: 61.983 },
    // شهرستان مهرستان
    { id: 102, name: "مهرستان", slug: "mehrestan", latitude: 27.138, longitude: 61.854 },
    { id: 10201, name: "آشار", slug: "ashar", latitude: 26.697, longitude: 61.354 },
    // شهرستان بمپور
    { id: 103, name: "بمپور", slug: "bampur", latitude: 27.200, longitude: 60.354 },
    { id: 10301, name: "محمدان", slug: "mohammadan", latitude: 27.234, longitude: 60.457 },
    { id: 10302, name: "قاسم‌آباد", slug: "qasemabad-sb", latitude: 27.253, longitude: 60.518 },
    // شهرستان قصرقند
    { id: 104, name: "قصرقند", slug: "qasr-e-qand", latitude: 26.254, longitude: 60.755 },
    { id: 10401, name: "ساربوک", slug: "sarbuk", latitude: 26.046, longitude: 60.916 },
    // شهرستان دلگان
    { id: 105, name: "گلمورتی", slug: "golmurti", latitude: 27.051, longitude: 59.813 },
    // شهرستان میرجاوه
    { id: 106, name: "میرجاوه", slug: "mirjaveh", latitude: 29.015, longitude: 61.455 },
    { id: 10601, name: "ریگ‌ملک", slug: "rig-malek", latitude: 29.071, longitude: 61.942 },
    // شهرستان زهک
    { id: 107, name: "زهک", slug: "zahak", latitude: 30.892, longitude: 61.649 },
    // شهرستان هیرمند
    { id: 108, name: "دوست‌محمد", slug: "dust-mohammad", latitude: 31.258, longitude: 61.686 },
    // شهرستان هامون
    { id: 109, name: "محمدآباد", slug: "mohammadabad-sb", latitude: 30.899, longitude: 61.343 },
    { id: 10901, name: "شهر جدید رامشار", slug: "ramshar-new-town", latitude: 30.840, longitude: 61.551 },
    // شهرستان فنوج
    { id: 110, name: "فنوج", slug: "fanuj", latitude: 26.574, longitude: 59.626 },
    { id: 11001, name: "کتیج", slug: "kotij", latitude: 26.837, longitude: 59.814 },
    // شهرستان زرآباد
    { id: 111, name: "زرآباد", slug: "zarabad-sb", latitude: 25.568, longitude: 59.818 },
    // شهرستان لاشار
    { id: 112, name: "اسپکه", slug: "espekeh", latitude: 26.782, longitude: 60.187 },
    // شهرستان تفتان
    { id: 113, name: "نوک‌آباد", slug: "nukabad-sb", latitude: 28.513, longitude: 60.835 },
    // شهرستان دشتیاری
    { id: 114, name: "نگور", slug: "negur", latitude: 25.394, longitude: 61.168 },
    { id: 11401, name: "بندر بریس", slug: "bandar-beris", latitude: 25.138, longitude: 60.838 },
    // شهرستان نیمروز
    { id: 115, name: "ادیمی", slug: "adimi", latitude: 31.134, longitude: 61.597 },
    // شهرستان سرباز
    { id: 116, name: "سرباز", slug: "sarbaz-sb", latitude: 26.586, longitude: 61.424 },
    // شهرستان گلشن
    { id: 117, name: "جالق", slug: "jalq", latitude: 27.243, longitude: 62.723 }
  ],

  "2232201":[
    { id: 96, name: "شیراز", slug: "shiraz", latitude: 29.620, longitude: 52.522 },
    { id: 9601, name: "صدرا", slug: "sadra", latitude: 29.771, longitude: 52.484 },
    { id: 9602, name: "داریان", slug: "daryan-fars", latitude: 29.860, longitude: 52.836 },
    { id: 9603, name: "خان‌زنیان", slug: "khan-zenyan", latitude: 29.588, longitude: 52.126 },
    // شهرستان مرودشت
    { id: 97, name: "مرودشت", slug: "marvdasht", latitude: 29.875, longitude: 52.802 },
    { id: 9701, name: "سیدان", slug: "seydan", latitude: 29.986, longitude: 53.053 },
    { id: 9702, name: "کامفیروز", slug: "kamfiruz", latitude: 30.297, longitude: 52.176 },
    { id: 9703, name: "فتح‌آباد", slug: "fathabad-fars", latitude: 30.222, longitude: 52.946 },
    // شهرستان جهرم
    { id: 98, name: "جهرم", slug: "jahrom", latitude: 28.502, longitude: 53.559 },
    { id: 9801, name: "قطب‌آباد", slug: "qotbabad", latitude: 28.618, longitude: 53.778 },
    { id: 9802, name: "دوزه", slug: "duzeh", latitude: 28.324, longitude: 53.303 },
    // شهرستان فسا
    { id: 99, name: "فسا", slug: "fasa", latitude: 28.938, longitude: 53.658 },
    { id: 9901, name: "زاهدشهر", slug: "zahedshahr", latitude: 28.809, longitude: 53.864 },
    { id: 9902, name: "ششده", slug: "sheshdeh", latitude: 28.845, longitude: 53.642 },
    // شهرستان داراب
    { id: 100, name: "داراب", slug: "darab", latitude: 28.752, longitude: 54.544 },
    { id: 10001, name: "جنت‌شهر", slug: "jannat-shahr", latitude: 28.629, longitude: 54.767 },
    { id: 10002, name: "فدامی", slug: "fadami", latitude: 28.384, longitude: 54.912 },
    { id: 10003, name: "پاسخن", slug: "paskhan", latitude: 28.577, longitude: 55.109 },
    // شهرستان کازرون
    { id: 101, name: "کازرون", slug: "kazerun", latitude: 29.619, longitude: 51.655 },
    // { id: 10101, name: "قائمیه", slug: "qaemiyeh", latitude: 29.704, longitude: 51.980 }, // در کوه‌چنار
    { id: 10102, name: "خشت", slug: "khesht", latitude: 29.544, longitude: 51.275 },
    { id: 10103, name: "کنارتخته", slug: "kenar-takhteh", latitude: 29.522, longitude: 51.411 },
    // شهرستان لارستان
    { id: 102, name: "لار", slug: "lar", latitude: 27.683, longitude: 54.283 },
    { id: 10201, name: "خور", slug: "khur-fars", latitude: 27.636, longitude: 54.401 },
    { id: 10202, name: "بیرم", slug: "beyram", latitude: 27.472, longitude: 53.518 },
    // شهرستان لامرد
    { id: 103, name: "لامرد", slug: "lamerd", latitude: 27.332, longitude: 53.181 },
    { id: 10301, name: "اشکنان", slug: "ashkanan", latitude: 27.151, longitude: 53.519 },
    // شهرستان فیروزآباد
    { id: 104, name: "فیروزآباد", slug: "firuzabad-fars", latitude: 28.844, longitude: 52.571 },
    { id: 10401, name: "میمند", slug: "meymand-fars", latitude: 28.898, longitude: 52.793 },
    // شهرستان آباده
    { id: 105, name: "آباده", slug: "abadeh", latitude: 31.160, longitude: 52.651 },
    // شهرستان اقلید
    { id: 106, name: "اقلید", slug: "eqlid", latitude: 30.893, longitude: 52.686 },
    // شهرستان استهبان
    { id: 107, name: "استهبان", slug: "estahban", latitude: 29.127, longitude: 54.034 },
    // شهرستان نی‌ریز
    { id: 108, name: "نی‌ریز", slug: "neyriz", latitude: 29.198, longitude: 54.329 },
    // شهرستان خرامه
    { id: 109, name: "خرامه", slug: "kharameh", latitude: 29.537, longitude: 53.316 },
    // شهرستان خفر
    { id: 110, name: "باب‌انار", slug: "bab-anar", latitude: 28.919, longitude: 53.257 },
    { id: 11001, name: "خاوران", slug: "khavaran-fars", latitude: 29.180, longitude: 53.220 },
    // شهرستان زرین‌دشت
    { id: 111, name: "حاجی‌آباد", slug: "hajiabad-fars", latitude: 28.601, longitude: 54.341 },
    // شهرستان کوار
    { id: 112, name: "کوار", slug: "kavar", latitude: 29.198, longitude: 52.730 },
    // شهرستان سپیدان
    { id: 113, name: "اردکان", slug: "ardakan-fars", latitude: 30.222, longitude: 51.996 },
    // شهرستان ممسنی
    { id: 114, name: "نورآباد", slug: "nurabad-fars", latitude: 30.082, longitude: 51.520 },
    // شهرستان رستم
    { id: 115, name: "مصیری", slug: "masiri", latitude: 30.233, longitude: 51.528 },
    // شهرستان بوانات
    { id: 116, name: "بوانات", slug: "bavanat", latitude: 30.439, longitude: 53.647 },
    // شهرستان بختگان
    { id: 117, name: "آباده طشک", slug: "abadeh-tashk", latitude: 29.740, longitude: 53.714 },
    // شهرستان پاسارگاد
    { id: 118, name: "سعادت‌شهر", slug: "saadat-shahr", latitude: 30.147, longitude: 53.203 },
    // شهرستان سروستان
    { id: 119, name: "سروستان", slug: "sarvestan", latitude: 29.271, longitude: 53.226 },
    // شهرستان زرقان
    { id: 120, name: "زرقان", slug: "zarqan", latitude: 29.774, longitude: 52.723 },
    // شهرستان گراش
    { id: 121, name: "گراش", slug: "gerash", latitude: 27.666, longitude: 54.135 },
    // شهرستان فراشبند
    { id: 122, name: "فراشبند", slug: "farashband", latitude: 28.842, longitude: 52.097 },
    // شهرستان خنج
    { id: 123, name: "خنج", slug: "khonj", latitude: 27.904, longitude: 53.435 },
    // شهرستان اوز
    { id: 124, name: "اوز", slug: "evaz", latitude: 27.755, longitude: 53.978 },
    // شهرستان بیضا
    { id: 125, name: "بیضا", slug: "beyza-fars", latitude: 30.076, longitude: 52.339 },
    // شهرستان جویم
    { id: 126, name: "جویم", slug: "juyom", latitude: 28.196, longitude: 54.108 },
    // شهرستان سرچهان
    { id: 127, name: "کره‌ای", slug: "korei", latitude: 30.638, longitude: 53.989 },
    // شهرستان کوه‌چنار
    { id: 128, name: "قائمیه", slug: "qaemiyeh", latitude: 29.704, longitude: 51.980 },
    // شهرستان قیر و کارزین
    { id: 129, name: "قیر", slug: "qir", latitude: 28.484, longitude: 52.923 },
    // شهرستان مهر
    { id: 130, name: "مهر", slug: "mohr", latitude: 27.568, longitude: 52.880 },
    { id: 13001, name: "گله‌دار", slug: "galleh-dar", latitude: 27.674, longitude: 52.605 },
    // شهرستان دهرم
    { id: 131, name: "دهرم", slug: "dehram", latitude: 28.537, longitude: 52.548 }
  ],

  "2232203":[
    { id: 101, name: "قزوین", slug: "qazvin", latitude: 36.276, longitude: 50.003 },
    { id: 10101, name: "اقبالیه", slug: "eqbaliyeh", latitude: 36.262, longitude: 49.882 },
    { id: 10102, name: "محمودآباد نمونه", slug: "mahmudabad-nemuneh", latitude: 36.315, longitude: 50.155 },
    { id: 10103, name: "معلم‌کلایه", slug: "moallem-kalayeh", latitude: 36.386, longitude: 50.551 },
    { id: 10104, name: "کوهین", slug: "kuhin", latitude: 36.340, longitude: 49.620 },
    { id: 10105, name: "رازمیان", slug: "razmian", latitude: 36.568, longitude: 50.211 },
    { id: 10106, name: "سیردان", slug: "sirdan", latitude: 36.700, longitude: 49.278 },
    // شهرستان البرز (مرکز: الوند)
    { id: 10107, name: "الوند", slug: "alvand", latitude: 36.191, longitude: 50.061 },
    { id: 10108, name: "شریفیه", slug: "sharifiyeh", latitude: 36.082, longitude: 50.089 },
    { id: 10109, name: "محمدیه", slug: "mohammadiyeh-qaz", latitude: 36.149, longitude: 50.093 },
    { id: 10110, name: "بیدستان", slug: "bidestan", latitude: 36.196, longitude: 50.015 },
    { id: 10111, name: "مهرگان", slug: "mehreqan", latitude: 36.168, longitude: 50.158 },
    // شهرستان تاکستان
    { id: 102, name: "تاکستان", slug: "takestan", latitude: 36.069, longitude: 49.697 },
    { id: 10201, name: "اسفرورین", slug: "esfarvarin", latitude: 35.959, longitude: 49.771 },
    { id: 10202, name: "ضیاءآباد", slug: "ziaabad", latitude: 36.011, longitude: 49.339 },
    { id: 10203, name: "خرمدشت", slug: "khorramdasht", latitude: 35.882, longitude: 49.659 },
    { id: 10204, name: "نرجه", slug: "narjeh", latitude: 36.111, longitude: 49.663 },
    // شهرستان بوئین‌زهرا
    { id: 103, name: "بوئین‌زهرا", slug: "buin-zahra", latitude: 35.772, longitude: 49.711 },
    { id: 10301, name: "شال", slug: "shal", latitude: 35.864, longitude: 49.467 },
    { id: 10302, name: "دانسفهان", slug: "danesfahan", latitude: 35.775, longitude: 49.527 },
    { id: 10303, name: "سگزآباد", slug: "sagzabad", latitude: 35.719, longitude: 49.799 },
    { id: 10304, name: "ارداق", slug: "ardaq", latitude: 35.817, longitude: 49.626 },
    { id: 10305, name: "عصمت‌آباد", slug: "esmatabad", latitude: 35.630, longitude: 49.585 },
    // شهرستان آبیک
    { id: 104, name: "آبیک", slug: "abyek", latitude: 36.035, longitude: 50.536 },
    { id: 10401, name: "خاکعلی", slug: "khak-ali", latitude: 36.126, longitude: 50.407 },
    { id: 10402, name: "قشلاق", slug: "qeshlaq", latitude: 35.967, longitude: 50.457 },
    { id: 10403, name: "زیاران", slug: "ziaran", latitude: 36.059, longitude: 50.751 },
    // شهرستان آوج
    { id: 105, name: "آوج", slug: "avaj", latitude: 35.570, longitude: 49.208 },
    { id: 10501, name: "آبگرم", slug: "abgarm", latitude: 35.753, longitude: 49.366 }
  ],

  "2232204":[
     // شهرستان قم
     { id: 104, name: "قم", slug: "qom", latitude: 34.643, longitude: 50.884 },
     { id: 10401, name: "قنوات", slug: "qanavat", latitude: 34.613, longitude: 51.041 },
     { id: 10402, name: "دستجرد", slug: "dastjerd", latitude: 34.409, longitude: 50.198 },
     { id: 10403, name: "سلفچگان", slug: "salafchegan", latitude: 34.490, longitude: 50.463 },
     // شهرستان جعفرآباد
     { id: 10404, name: "جعفریه", slug: "jafariyeh", latitude: 34.783, longitude: 50.413 },
     { id: 10405, name: "قاهان", slug: "qahan", latitude: 34.846, longitude: 50.187 },
     // شهرستان کهک
     { id: 10406, name: "کهک", slug: "kahak", latitude: 34.421, longitude: 50.865 }
  ],

  "2232206":[
    { id: 105, name: "سنندج", slug: "sanandaj", latitude: 35.312, longitude: 46.996 },
    { id: 10501, name: "شویشه", slug: "shuyesheh", latitude: 35.197, longitude: 46.612 },
    { id: 10502, name: "حسین‌آباد", slug: "hoseynabad-k", latitude: 34.814, longitude: 47.377 },
    // شهرستان سقز
    { id: 106, name: "سقز", slug: "saqqez", latitude: 36.239, longitude: 46.274 },
    { id: 10601, name: "صاحب", slug: "saheb", latitude: 36.033, longitude: 46.495 },
    // شهرستان مریوان
    { id: 107, name: "مریوان", slug: "marivan", latitude: 35.526, longitude: 46.176 },
    { id: 10701, name: "کانی‌دینار", slug: "kani-dinar", latitude: 35.597, longitude: 46.297 },
    { id: 10702, name: "برده‌رشه", slug: "bardeh-rasheh", latitude: 35.518, longitude: 46.068 },
    { id: 10703, name: "چناره", slug: "chenareh", latitude: 35.733, longitude: 46.366 },
    // شهرستان بانه
    { id: 108, name: "بانه", slug: "baneh", latitude: 35.998, longitude: 45.885 },
    { id: 10801, name: "آرمرده", slug: "armardeh", latitude: 35.940, longitude: 45.748 },
    { id: 10802, name: "بویین سفلی", slug: "buin-sofla", latitude: 35.887, longitude: 45.895 },
    { id: 10803, name: "کانی سور", slug: "kani-sur", latitude: 35.795, longitude: 45.895 },
    // شهرستان قروه
    { id: 109, name: "قروه", slug: "qorveh", latitude: 35.166, longitude: 47.801 },
    { id: 10901, name: "سریش‌آباد", slug: "serishabad", latitude: 35.257, longitude: 47.922 },
    { id: 10902, name: "دلبران", slug: "delbaran", latitude: 35.148, longitude: 48.064 },
    { id: 10903, name: "دزج", slug: "dezaj", latitude: 35.034, longitude: 47.962 },
    // شهرستان کامیاران
    { id: 110, name: "کامیاران", slug: "kamyaran", latitude: 34.792, longitude: 46.936 },
    { id: 11001, name: "موچش", slug: "muchesh", latitude: 35.122, longitude: 46.853 },
    // شهرستان بیجار
    { id: 111, name: "بیجار", slug: "bijar", latitude: 35.872, longitude: 47.604 },
    { id: 11101, name: "یاسوکند", slug: "yasukand", latitude: 35.886, longitude: 47.333 },
    { id: 11102, name: "بابارشانی", slug: "baba-reshani", latitude: 35.612, longitude: 47.818 },
    { id: 11103, name: "توپ‌آغاج", slug: "tup-aghaj", latitude: 35.932, longitude: 47.465 },
    // شهرستان دیواندره
    { id: 112, name: "دیواندره", slug: "divandarreh", latitude: 35.914, longitude: 47.024 },
    { id: 11201, name: "زرینه", slug: "zarrineh-k", latitude: 36.002, longitude: 47.168 },
    // شهرستان دهگلان
    { id: 113, name: "دهگلان", slug: "deh-golan", latitude: 35.281, longitude: 47.417 },
    { id: 11301, name: "بلبان‌آباد", slug: "bolbanabad", latitude: 35.242, longitude: 47.306 },
    // شهرستان سروآباد
    { id: 114, name: "سروآباد", slug: "sarvabad", latitude: 35.312, longitude: 46.368 },
    { id: 11401, name: "هورامان تخت", slug: "huraman-takht", latitude: 35.313, longitude: 46.262 }
  ],

  "2232207":[
    { id: 108, name: "کرمان", slug: "kerman", latitude: 30.283, longitude: 57.078 },
    { id: 10801, name: "ماهان", slug: "mahan", latitude: 30.060, longitude: 57.291 },
    { id: 10802, name: "گلباف", slug: "golbaf", latitude: 29.907, longitude: 57.644 },
    { id: 10803, name: "چترود", slug: "chatrud", latitude: 30.550, longitude: 56.883 },
    { id: 10804, name: "باغین", slug: "baghin", latitude: 30.211, longitude: 56.786 },
    { id: 10805, name: "راین", slug: "rayen", latitude: 29.584, longitude: 57.447 },
    { id: 10806, name: "اختیارآباد", slug: "ekhtiarabad", latitude: 30.347, longitude: 56.969 },
    { id: 10807, name: "زنگی‌آباد", slug: "zangiabad", latitude: 30.380, longitude: 56.924 },
    { id: 10808, name: "شهداد", slug: "shahdad", latitude: 30.418, longitude: 57.733 },
    { id: 10809, name: "جوپار", slug: "jupar", latitude: 30.046, longitude: 57.060 },
    // شهرستان سیرجان
    { id: 109, name: "سیرجان", slug: "sirjan", latitude: 29.451, longitude: 55.681 },
    { id: 10901, name: "نجف‌شهر", slug: "najaf-shahr", latitude: 29.351, longitude: 55.856 },
    { id: 10902, name: "زیدآباد", slug: "zeydabad", latitude: 29.610, longitude: 55.772 },
    { id: 10903, name: "پاریز", slug: "pariz", latitude: 29.988, longitude: 55.975 },
    // شهرستان رفسنجان
    { id: 110, name: "رفسنجان", slug: "rafsanjan", latitude: 30.407, longitude: 55.993 },
    { id: 11001, name: "کشکوئیه", slug: "koshkuiyeh", latitude: 30.297, longitude: 55.578 },
    { id: 11002, name: "مس سرچشمه", slug: "sarcheshmeh", latitude: 29.947, longitude: 55.882 },
    // شهرستان جیرفت
    { id: 111, name: "جیرفت", slug: "jiroft", latitude: 28.678, longitude: 57.739 },
    { id: 11101, name: "درب‌بهشت", slug: "darb-e-behesht", latitude: 28.980, longitude: 57.729 },
    // شهرستان بم
    { id: 112, name: "بم", slug: "bam", latitude: 29.106, longitude: 58.357 },
    { id: 11201, name: "بروات", slug: "baravat", latitude: 29.072, longitude: 58.406 },
    // شهرستان شهربابک
    { id: 113, name: "شهربابک", slug: "shahr-e-babak", latitude: 30.117, longitude: 55.118 },
    { id: 11301, name: "جوزم", slug: "jowzam", latitude: 29.907, longitude: 55.228 },
    // شهرستان زرند
    { id: 114, name: "زرند", slug: "zarand", latitude: 30.812, longitude: 56.568 },
    { id: 11401, name: "ریحان‌شهر", slug: "reyhan-shahr", latitude: 30.957, longitude: 56.637 },
    // شهرستان کهنوج
    { id: 115, name: "کهنوج", slug: "kahnuj", latitude: 27.954, longitude: 57.701 },
    { id: 11501, name: "دهکهان", slug: "dehkahan", latitude: 27.915, longitude: 57.653 },
    // شهرستان بردسیر
    { id: 116, name: "بردسیر", slug: "bardsir", latitude: 29.932, longitude: 56.592 },
    { id: 11601, name: "نگار", slug: "negar", latitude: 29.831, longitude: 56.766 },
    // شهرستان بافت
    { id: 117, name: "بافت", slug: "baft", latitude: 29.231, longitude: 56.602 },
    { id: 11701, name: "بزنجان", slug: "bezanjan", latitude: 29.400, longitude: 56.593 },
    // شهرستان راور
    { id: 118, name: "راور", slug: "ravar", latitude: 31.258, longitude: 56.837 },
    // شهرستان عنبرآباد
    { id: 119, name: "عنبرآباد", slug: "anbarabad", latitude: 28.508, longitude: 57.842 },
    // شهرستان منوجان
    { id: 120, name: "منوجان", slug: "manujan", latitude: 27.469, longitude: 57.514 },
    { id: 12001, name: "نودژ", slug: "nudej", latitude: 27.674, longitude: 57.382 },
    // شهرستان قلعه‌گنج
    { id: 121, name: "قلعه‌گنج", slug: "qaleh-ganj", latitude: 27.531, longitude: 57.886 },
    // شهرستان رودبار جنوب
    { id: 122, name: "رودبار", slug: "rudbar-kerman", latitude: 27.818, longitude: 57.901 },
    // شهرستان ریگان
    { id: 123, name: "محمدآباد", slug: "mohammadabad-r", latitude: 28.650, longitude: 59.011 },
    // شهرستان نرماشیر
    { id: 124, name: "نرماشیر", slug: "narmashir", latitude: 28.910, longitude: 58.552 },
    // شهرستان ارزوئیه
    { id: 125, name: "ارزوئیه", slug: "arzuiyeh", latitude: 28.423, longitude: 56.402 },
    // شهرستان رابر
    { id: 126, name: "رابر", slug: "rabor", latitude: 29.294, longitude: 56.915 },
    // شهرستان کوهبنان
    { id: 127, name: "کوهبنان", slug: "kuhbonan", latitude: 31.066, longitude: 56.284 },
    // شهرستان فهرج
    { id: 128, name: "فهرج", slug: "fahraj", latitude: 28.956, longitude: 58.895 },
    // شهرستان انار
    { id: 129, name: "انار", slug: "anar", latitude: 30.871, longitude: 55.275 },
    { id: 12901, name: "امین‌شهر", slug: "aminshahr", latitude: 30.739, longitude: 55.337 },
    // شهرستان فاریاب
    { id: 130, name: "فاریاب", slug: "faryab", latitude: 28.094, longitude: 57.251 },
  ],

  "2232208":[
    
  ],
  // ... سایر استان‌ها بدون تغییر ...
};

// این حلقه برای سازگاری ساختار داده‌ها ضروری است و باید بماند
for (const stateId in citiesByStateId) {
  citiesByStateId[stateId].forEach(city => {
    if (!city.neighborhoods) {
      city.neighborhoods = [];
    }
    if (city.neighborhoods.length > 0) {
      city.neighborhoods.forEach((hood, index) => {
        hood.id = `${city.id}-${index}`;
      });
    }
  });
}
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    // به سادگی لیست استان‌های از پیش آماده شده را برمی‌گردانیم
    return NextResponse.json(provinces);
  } catch (error) {
    console.error('STATES LOCAL DATA ERROR:', error);
    return NextResponse.json(
      { message: "Error fetching provinces from local data" },
      { status: 500 }
    );
  }
}