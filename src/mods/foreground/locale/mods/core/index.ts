import { Records } from "@/libs/records"

export const codes = [
  "en",
  "zh",
  "hi",
  "es",
  "ar",
  "fr",
  "de",
  "ru",
  "pt",
  "ja",
  "pa",
  "bn",
  "id",
  "ur",
  "ms",
  "it",
  "tr",
  "ta",
  "te",
  "ko",
  "vi",
  "pl",
  "ro",
  "nl",
  "el",
  "th",
  "cs",
  "hu",
  "sv",
  "da",
] as const

export const direction = {
  en: "ltr",
  zh: "ltr",
  hi: "ltr",
  es: "ltr",
  ar: "rtl",
  fr: "ltr",
  de: "ltr",
  ru: "ltr",
  pt: "ltr",
  ja: "ltr",
  pa: "ltr",
  bn: "ltr",
  id: "ltr",
  ur: "rtl",
  ms: "ltr",
  it: "ltr",
  tr: "ltr",
  ta: "ltr",
  te: "ltr",
  ko: "ltr",
  vi: "ltr",
  pl: "ltr",
  ro: "ltr",
  nl: "ltr",
  el: "ltr",
  th: "ltr",
  cs: "ltr",
  hu: "ltr",
  sv: "ltr",
  da: "ltr",
} as const

export type Localized<T> = {
  [key in typeof codes[number]]: T
}

export function get<T>(localized: Localized<T>, locale: string): T {
  const result = Records.getOrNull(localized, locale)

  if (result != null)
    return result

  return localized["en"]
}

export const Enter: Localized<string> = {
  en: "Enter",
  zh: "输入",
  hi: "दर्ज करें",
  es: "Entrar",
  ar: "أدخل",
  fr: "Entrer",
  de: "Eintreten",
  ru: "Войти",
  pt: "Entrar",
  ja: "入る",
  pa: "ਦਾਖਲ ਹੋਵੋ",
  bn: "ঢুকুন",
  id: "Masuk",
  ur: "داخل ہونا",
  ms: "Masuk",
  it: "Entra",
  tr: "Girmek",
  ta: "உள்ளுக",
  te: "నమోదు",
  ko: "들어가다",
  vi: "Vào",
  pl: "Wejdź",
  ro: "Intra",
  nl: "Binnenkomen",
  el: "Μπείτε",
  th: "เข้า",
  cs: "Vstoupit",
  hu: "Belépés",
  sv: "Gå in",
  da: "Gå ind",
}

export const Home: Localized<string> = {
  en: "Home",
  zh: "主页",
  hi: "होम",
  es: "Inicio",
  ar: "الصفحة الرئيسية",
  fr: "Accueil",
  de: "Zuhause",
  ru: "Главная",
  pt: "Casa",
  ja: "ホーム",
  pa: "ਘਰ",
  bn: "হোম",
  id: "Rumah",
  ur: "گھر",
  ms: "Rumah",
  it: "Casa",
  tr: "Ev",
  ta: "வீடு",
  te: "హోమ్",
  ko: "집",
  vi: "Nhà",
  pl: "Dom",
  ro: "Acasă",
  nl: "Huis",
  el: "Σπίτι",
  th: "บ้าน",
  cs: "Domov",
  hu: "Otthon",
  sv: "Hem",
  da: "Hjem",
}

export const Download: Localized<string> = {
  en: "Download",
  zh: "下载",
  hi: "डाउनलोड",
  es: "Descargar",
  ar: "تحميل",
  fr: "Télécharger",
  de: "Herunterladen",
  ru: "Скачать",
  pt: "Baixar",
  ja: "ダウンロード",
  pa: "ਡਾਊਨਲੋਡ",
  bn: "ডাউনলোড",
  id: "Unduh",
  ur: "ڈاؤن لوڈ",
  ms: "Muat turun",
  it: "Scaricare",
  tr: "İndir",
  ta: "பதிவிறக்க",
  te: "డౌన్లోడ్",
  ko: "다운로드",
  vi: "Tải về",
  pl: "Pobierz",
  ro: "Descărca",
  nl: "Downloaden",
  el: "Λήψη",
  th: "ดาวน์โหลด",
  cs: "Stáhnout",
  hu: "Letöltés",
  sv: "Ladda ner",
  da: "Download",
}

export const Install: Localized<string> = {
  en: "Install",
  zh: "安装",
  hi: "स्थापित करें",
  es: "Instalar",
  ar: "تثبيت",
  fr: "Installer",
  de: "Installieren",
  ru: "Установить",
  pt: "Instalar",
  ja: "インストール",
  pa: "ਇੰਸਟਾਲ ਕਰੋ",
  bn: "ইনস্টল করুন",
  id: "Memasang",
  ur: "انسٹال کریں",
  ms: "Pasang",
  it: "Installare",
  tr: "Yükle",
  ta: "நிறுவு",
  te: "ఇన్స్టాల్",
  ko: "설치",
  vi: "Cài đặt",
  pl: "Zainstaluj",
  ro: "Instalare",
  nl: "Installeren",
  el: "Εγκατάσταση",
  th: "ติดตั้ง",
  cs: "Instalovat",
  hu: "Telepítés",
  sv: "Installera",
  da: "Installere",
}

export const Loading: Localized<string> = {
  en: "Loading",
  zh: "载入中",
  hi: "लोड हो रहा है",
  es: "Cargando",
  ar: "جار التحميل",
  fr: "Chargement",
  de: "Wird geladen",
  ru: "Загрузка",
  pt: "Carregando",
  ja: "ロード中",
  pa: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ",
  bn: "লোড হচ্ছে",
  id: "Memuat",
  ur: "لوڈ ہو رہا ہے",
  ms: "Memuat",
  it: "Caricamento",
  tr: "Yükleniyor",
  ta: "ஏற்றுகிறது",
  te: "లోడ్ అవుతోంది",
  ko: "로드 중",
  vi: "Đang tải",
  pl: "Ładowanie",
  ro: "Se încarcă",
  nl: "Bezig met laden",
  el: "Φόρτωση",
  th: "กำลังโหลด",
  cs: "Načítání",
  hu: "Betöltés",
  sv: "Laddar",
  da: "Indlæser",
}

export const MoreDownloads: Localized<string> = {
  en: "More downloads",
  zh: "更多下载",
  hi: "अधिक डाउनलोड",
  es: "Más descargas",
  ar: "المزيد من التنزيلات",
  fr: "Plus de téléchargements",
  de: "Mehr Downloads",
  ru: "Больше загрузок",
  pt: "Mais downloads",
  ja: "その他のダウンロード",
  pa: "ਹੋਰ ਡਾਊਨਲੋਡ",
  bn: "আরও ডাউনলোড",
  id: "Lebih banyak unduhan",
  ur: "مزید ڈاؤن لوڈ",
  ms: "Lebih muat turun",
  it: "Altri download",
  tr: "Daha fazla indirme",
  ta: "மேலும் பதிவிறக்கங்கள்",
  te: "మరిన్ని డౌన్లోడ్లు",
  ko: "더 많은 다운로드",
  vi: "Tải về nhiều hơn",
  pl: "Więcej pobrań",
  ro: "Mai multe descărcări",
  nl: "Meer downloads",
  el: "Περισσότερες λήψεις",
  th: "ดาวน์โหลดเพิ่มเติม",
  cs: "Více stahování",
  hu: "Több letöltés",
  sv: "Fler nedladdningar",
  da: "Flere downloads",
}

export const MadeByCypherpunks: Localized<string> = {
  en: "Made by cypherpunks",
  zh: "由 cypherpunks 制作",
  hi: "साइफरपंक्स द्वारा बनाया गया",
  es: "Hecho por cypherpunks",
  ar: "صنعها cypherpunks",
  fr: "Fait par des cypherpunks",
  de: "Hergestellt von Cypherpunks",
  ru: "Сделано киберпанками",
  pt: "Feito por cypherpunks",
  ja: "サイファーパンクス製",
  pa: "cypherpunks ਵਲੋਂ ਬਣਾਇਆ ਗਿਆ",
  bn: "cypherpunks দ্বারা তৈরি",
  id: "Dibuat oleh cypherpunks",
  ur: "cypherpunks کی طرف سے بنایا گیا",
  ms: "Dibuat oleh cypherpunks",
  it: "Realizzato da cypherpunks",
  tr: "Cypherpunks tarafından yapıldı",
  ta: "cypherpunks ஆல் உருவாக்கப்பட்டது",
  te: "cypherpunks ద్వారా తయారు",
  ko: "사이퍼펑크가 만듦",
  vi: "Được làm bởi cypherpunks",
  pl: "Zrobione przez cypherpunks",
  ro: "Făcut de cypherpunks",
  nl: "Gemaakt door cypherpunks",
  el: "Φτιαγμένο από cypherpunks",
  th: "ทำโดย cypherpunks",
  cs: "Vytvořeno cypherpunks",
  hu: "Cypherpunks által készítve",
  sv: "Gjord av cypherpunks",
  da: "Lavet af cypherpunks",
}

export const tellMeWhatYouWant: Localized<string> = {
  en: "tell me what you want",
  zh: "告诉我你想要什么",
  hi: "मुझे बताओ तुम्हें क्या चाहिए",
  es: "dime qué quieres",
  ar: "قل لي ما تريد",
  fr: "dis-moi ce que tu veux",
  de: "sag mir, was du willst",
  ru: "скажи мне, что ты хочешь",
  pt: "diz-me o que queres",
  ja: "欲しいものを教えて",
  pa: "ਮੈਨੂੰ ਦੱਸੋ ਤੁਸੀਂ ਕੀ ਚਾਹੁੰਦੇ ਹੋ",
  bn: "আমাকে বলুন আপনি কি চান",
  id: "beritahu saya apa yang kamu inginkan",
  ur: "مجھے بتاؤ تم چاہتے کیا ہو",
  ms: "beritahu saya apa yang anda mahu",
  it: "dimmi cosa vuoi",
  tr: "bana ne istediğini söyle",
  ta: "உங்கள் விரு  க்கியதை சொ  ல்லுங்கள்",
  te: "మీరు ఏమి కావాలన్న చెప్పండి",
  ko: "무엇을 원하는지 말해줘",
  vi: "nói cho tôi biết bạn muốn gì",
  pl: "powiedz mi, czego chcesz",
  ro: "spune-mi ce vrei",
  nl: "vertel me wat je wilt",
  el: "πες μου τι θες",
  th: "บอกฉันว่าคุณต้องการอะไร",
  cs: "řekni mi, co chceš",
  hu: "mond el, mit szeretnél",
  sv: "berätta för mig vad du vill",
  da: "fortæl mig hvad du vil",
}

export const Hello: Localized<string> = {
  en: "Hello",
  zh: "你好",
  hi: "नमस्ते",
  es: "Hola",
  ar: "مرحبا",
  fr: "Bonjour",
  de: "Hallo",
  ru: "Привет",
  pt: "Olá",
  ja: "こんにちは",
  pa: "ਹੈਲੋ",
  bn: "হ্যালো",
  id: "Halo",
  ur: "ہیلو",
  ms: "Halo",
  it: "Ciao",
  tr: "Merhaba",
  ta: "வணக்கம்",
  te: "హలో",
  ko: "안녕",
  vi: "Xin chào",
  pl: "Cześć",
  ro: "Salut",
  nl: "Hallo",
  el: "Γεια",
  th: "สวัสดี",
  cs: "Ahoj",
  hu: "Helló",
  sv: "Hej",
  da: "Hej",
}

export const Name: Localized<string> = {
  en: "Name",
  zh: "名称",
  hi: "नाम",
  es: "Nombre",
  ar: "اسم",
  fr: "Nom",
  de: "Name",
  ru: "Имя",
  pt: "Nome",
  ja: "名前",
  pa: "ਨਾਮ",
  bn: "নাম",
  id: "Nama",
  ur: "نام",
  ms: "Nama",
  it: "Nome",
  tr: "Ad",
  ta: "பெயர்",
  te: "పేరు",
  ko: "이름",
  vi: "Tên",
  pl: "Nazwa",
  ro: "Nume",
  nl: "Naam",
  el: "Όνομα",
  th: "ชื่อ",
  cs: "Jméno",
  hu: "Név",
  sv: "Namn",
  da: "Navn",
}

export const Password: Localized<string> = {
  en: "Password",
  zh: "密码",
  hi: "पासवर्ड",
  es: "Contraseña",
  ar: "كلمة السر",
  fr: "Mot de passe",
  de: "Passwort",
  ru: "Пароль",
  pt: "Senha",
  ja: "パスワード",
  pa: "ਪਾਸਵਰਡ",
  bn: "পাসওয়ার্ড",
  id: "Kata sandi",
  ur: "پاس ورڈ",
  ms: "Kata laluan",
  it: "Parola d'ordine",
  tr: "Parola",
  ta: "கடவுச்சொல்",
  te: "పాస్వర్డ్",
  ko: "암호",
  vi: "Mật khẩu",
  pl: "Hasło",
  ro: "Parolă",
  nl: "Wachtwoord",
  el: "Κωδικός",
  th: "รหัสผ่าน",
  cs: "Heslo",
  hu: "Jelszó",
  sv: "Lösenord",
  da: "Adgangskode",
}

export const Wallets: Localized<string> = {
  en: "Wallets",
  zh: "钱包",
  hi: "बटुए",
  es: "Billeteras",
  ar: "محافظ",
  fr: "Portefeuilles",
  de: "Brieftaschen",
  ru: "Кошельки",
  pt: "Carteiras",
  ja: "ウォレット",
  pa: "ਵਾਲੇਟ",
  bn: "মানিব্যাগ",
  id: "Dompet",
  ur: "والٹ",
  ms: "Dompet",
  it: "Portafogli",
  tr: "Cüzdanlar",
  ta: "பணப்பைக்குறி",
  te: "వాలెట్లు",
  ko: "지갑",
  vi: "Ví",
  pl: "Portfele",
  ro: "Portofele",
  nl: "Portefeuilles",
  el: "Πορτοφόλια",
  th: "กระเป๋าเงิน",
  cs: "Peněženky",
  hu: "Pénztárcák",
  sv: "Plånböcker",
  da: "Punge",
}

export const Seeds: Localized<string> = {
  en: "Seeds",
  zh: "种子",
  hi: "बीज",
  es: "Semillas",
  ar: "بذور",
  fr: "Graines",
  de: "Samen",
  ru: "Семена",
  pt: "Sementes",
  ja: "シード",
  pa: "ਬੀਜ",
  bn: "বীজ",
  id: "Benih",
  ur: "بیج",
  ms: "Benih",
  it: "Semi",
  tr: "Tohumlar",
  ta: "விதைகள்",
  te: "విత్తనాలు",
  ko: "씨앗",
  vi: "Hạt giống",
  pl: "Nasiona",
  ro: "Seminte",
  nl: "Zaden",
  el: "Σπόροι",
  th: "เมล็ด",
  cs: "Semena",
  hu: "Magok",
  sv: "Frön",
  da: "Frø",
}

export const Requests: Localized<string> = {
  en: "Requests",
  zh: "请求",
  hi: "अनुरोध",
  es: "Solicitudes",
  ar: "طلبات",
  fr: "Requêtes",
  de: "Anfragen",
  ru: "Запросы",
  pt: "Pedidos",
  ja: "リクエスト",
  pa: "ਬਾਰੀਆਂ",
  bn: "অনুরোধ",
  id: "Permintaan",
  ur: "درخواستیں",
  ms: "Permintaan",
  it: "Richieste",
  tr: "İstekler",
  ta: "கோரிக்கைகள்",
  te: "అభ్యర్థనలు",
  ko: "요청",
  vi: "Yêu cầu",
  pl: "Prośby",
  ro: "Cereri",
  nl: "Verzoeken",
  el: "Αιτήματα",
  th: "คำขอ",
  cs: "Žádosti",
  hu: "Kérések",
  sv: "Förfrågningar",
  da: "Anmodninger"
}

export const Sessions: Localized<string> = {
  en: "Sessions",
  zh: "会话",
  hi: "सत्र",
  es: "Sesiones",
  ar: "جلسات",
  fr: "Sessions",
  de: "Sitzungen",
  ru: "Сессии",
  pt: "Sessões",
  ja: "セッション",
  pa: "ਸ਼ੈਸ਼ਨ",
  bn: "সেশন",
  id: "Sesi",
  ur: "سیشن",
  ms: "Sesi",
  it: "Sessioni",
  tr: "Oturumlar",
  ta: "அமர்வுகள்",
  te: "సెషన్లు",
  ko: "세션",
  vi: "Phiên",
  pl: "Sesje",
  ro: "Sesiuni",
  nl: "Sessies",
  el: "Συνεδρίες",
  th: "เซสชัน",
  cs: "Relace",
  hu: "Munkamenetek",
  sv: "Sessioner",
  da: "Sessioner"
}

export const Settings: Localized<string> = {
  en: "Settings",
  zh: "设置",
  hi: "सेटिंग्स",
  es: "Configuración",
  ar: "الإعدادات",
  fr: "Paramètres",
  de: "Einstellungen",
  ru: "Настройки",
  pt: "Configurações",
  ja: "設定",
  pa: "ਸੈਟਿੰਗਾਂ",
  bn: "সেটিংস",
  id: "Pengaturan",
  ur: "ترتیبات",
  ms: "Tetapan",
  it: "Impostazioni",
  tr: "Ayarlar",
  ta: "அமைப்புகள்",
  te: "అమరికలు",
  ko: "설정",
  vi: "Cài đặt",
  pl: "Ustawienia",
  ro: "Setări",
  nl: "Instellingen",
  el: "Ρυθμίσεις",
  th: "การตั้งค่า",
  cs: "Nastavení",
  hu: "Beállítások",
  sv: "Inställningar",
  da: "Indstillinger",
}

export const Showcase: Localized<string> = {
  en: "Showcase",
  zh: "展示",
  hi: "प्रदर्शन",
  es: "Vitrina",
  ar: "عرض",
  fr: "Vitrine",
  de: "Vitrine",
  ru: "Витрина",
  pt: "Vitrine",
  ja: "ショーケース",
  pa: "ਦਿਖਾਵਾ",
  bn: "দেখান",
  id: "Pameran",
  ur: "نمائش",
  ms: "Pameran",
  it: "Mostra",
  tr: "Vitrin",
  ta: "காட்சி",
  te: "షోకేస్",
  ko: "쇼케이스",
  vi: "Trưng bày",
  pl: "Wystawa",
  ro: "Prezentare",
  nl: "Showcase",
  el: "Βιτρίνα",
  th: "แสดง",
  cs: "Vitrína",
  hu: "Showcase",
  sv: "Showcase",
  da: "Showcase"
}

export const ComingSoon: Localized<string> = {
  en: "Coming soon",
  zh: "即将推出",
  hi: "जल्द आ रहा है",
  es: "Próximamente",
  ar: "قريبا",
  fr: "Bientôt disponible",
  de: "Demnächst verfügbar",
  ru: "Скоро",
  pt: "Em breve",
  ja: "近日公開",
  pa: "ਜਲਦ ਹੀ",
  bn: "শীঘ্রই",
  id: "Segera hadir",
  ur: "جلد آ رہا ہے",
  ms: "Akan datang",
  it: "Prossimamente",
  tr: "Yakında",
  ta: "விரைவில்",
  te: "త్వరలో",
  ko: "곧 출시될 예정입니다",
  vi: "Sắp ra mắt",
  pl: "Wkrótce",
  ro: "În curând",
  nl: "Binnenkort",
  el: "Έρχεται σύντομα",
  th: "เร็ว ๆ นี้",
  cs: "Brzy",
  hu: "Hamarosan",
  sv: "Kommer snart",
  da: "Kommer snart"
}

export const User: Localized<string> = {
  en: "User",
  zh: "用户",
  hi: "उपयोगकर्ता",
  es: "Usuario",
  ar: "مستخدم",
  fr: "Utilisateur",
  de: "Benutzer",
  ru: "Пользователь",
  pt: "Usuário",
  ja: "ユーザー",
  pa: "ਯੂਜ਼ਰ",
  bn: "ব্যবহারকারী",
  id: "Pengguna",
  ur: "صارف",
  ms: "Pengguna",
  it: "Utente",
  tr: "Kullanıcı",
  ta: "பயனர்",
  te: "వినియోగదారు",
  ko: "사용자",
  vi: "Người dùng",
  pl: "Użytkownik",
  ro: "Utilizator",
  nl: "Gebruiker",
  el: "Χρήστης",
  th: "ผู้ใช้",
  cs: "Uživatel",
  hu: "Felhasználó",
  sv: "Användare",
  da: "Bruger",
}

export const Global: Localized<string> = {
  en: "Global",
  zh: "全球",
  hi: "वैश्विक",
  es: "Global",
  ar: "عالمي",
  fr: "Global",
  de: "Global",
  ru: "Глобальный",
  pt: "Global",
  ja: "グローバル",
  pa: "ਗਲੋਬਲ",
  bn: "গ্লোবাল",
  id: "Global",
  ur: "عالمی",
  ms: "Global",
  it: "Globale",
  tr: "Global",
  ta: "உலகளாவிய",
  te: "గ్లోబల్",
  ko: "글로벌",
  vi: "Toàn cầu",
  pl: "Globalny",
  ro: "Global",
  nl: "Globaal",
  el: "Παγκόσμιο",
  th: "โลก",
  cs: "Globální",
  hu: "Globális",
  sv: "Global",
  da: "Global",
}

export const IDontCare: Localized<string> = {
  en: "I don't care",
  zh: "我不在乎",
  hi: "मुझे फर्क नहीं पड़ता",
  es: "No me importa",
  ar: "لا يهمني",
  fr: "Je m'en fiche",
  de: "Das ist mir egal",
  ru: "Мне все равно",
  pt: "Não me importo",
  ja: "気にしない",
  pa: "ਮੈਨੂੰ ਫਰਕ ਨਹੀਂ ਪਿਆ",
  bn: "আমি চিন্তা করি না",
  id: "Saya tidak peduli",
  ur: "مجھے فرق نہیں پڑتا",
  ms: "Saya tidak kisah",
  it: "Non mi importa",
  tr: "Umrumda değil",
  ta: "எனக்கு பார்த்தல் இல்லை",
  te: "నాకు పరిగణలేదు",
  ko: "상관없어",
  vi: "Tôi không quan tâm",
  pl: "Nie obchodzi mnie to",
  ro: "Nu-mi pasă",
  nl: "Het kan me niet schelen",
  el: "Δεν με νοιάζει",
  th: "ฉันไม่สนใจ",
  cs: "Je mi to jedno",
  hu: "Nem érdekel",
  sv: "Det spelar ingen roll",
  da: "Det er jeg ligeglad med"
}

export const Compatibility: Localized<string> = {
  en: "Compatibility",
  zh: "兼容性",
  hi: "संगतता",
  es: "Compatibilidad",
  ar: "التوافق",
  fr: "Compatibilité",
  de: "Kompatibilität",
  ru: "Совместимость",
  pt: "Compatibilidade",
  ja: "互換性",
  pa: "ਸੰਗਤੀ",
  bn: "সাথে সাথে",
  id: "Kompatibilitas",
  ur: "ہم آہنگی",
  ms: "Keserasian",
  it: "Compatibilità",
  tr: "Uyumluluk",
  ta: "ஒத்திசைவு",
  te: "అనుకూలత",
  ko: "호환성",
  vi: "Tương thích",
  pl: "Zgodność",
  ro: "Compatibilitate",
  nl: "Compatibiliteit",
  el: "Συμβατότητα",
  th: "ความเข้ากันได้",
  cs: "Kompatibilita",
  hu: "Kompatibilitás",
  sv: "Kompatibilitet",
  da: "Kompatibilitet"
}

export const NewUser: Localized<string> = {
  en: "New user",
  zh: "新用户",
  hi: "नया उपयोगकर्ता",
  es: "Nuevo usuario",
  ar: "مستخدم جديد",
  fr: "Nouvel utilisateur",
  de: "Neuer Benutzer",
  ru: "Новый пользователь",
  pt: "Novo usuário",
  ja: "新規ユーザー",
  pa: "ਨਵਾਂ ਯੂਜ਼ਰ",
  bn: "নতুন ব্যবহারকারী",
  id: "Pengguna baru",
  ur: "نیا صارف",
  ms: "Pengguna baru",
  it: "Nuovo utente",
  tr: "Yeni kullanıcı",
  ta: "புதிய பயனர்",
  te: "కొత్త వినియోగదారు",
  ko: "새로운 사용자",
  vi: "Người dùng mới",
  pl: "Nowy użytkownik",
  ro: "Utilizator nou",
  nl: "Nieuwe gebruiker",
  el: "Νέος χρήστης",
  th: "ผู้ใช้ใหม่",
  cs: "Nový uživatel",
  hu: "Új felhasználó",
  sv: "Ny användare",
  da: "Ny bruger",
}

export const NewWallet: Localized<string> = {
  en: "New wallet",
  zh: "新钱包",
  hi: "नया बटुआ",
  es: "Nueva billetera",
  ar: "محفظة جديدة",
  fr: "Nouveau portefeuille",
  de: "Neue Brieftasche",
  ru: "Новый кошелек",
  pt: "Nova carteira",
  ja: "新しいウォレット",
  pa: "ਨਵਾਂ ਵਾਲੇਟ",
  bn: "নতুন মানিব্যাগ",
  id: "Dompet baru",
  ur: "نیا والٹ",
  ms: "Dompet baru",
  it: "Nuovo portafoglio",
  tr: "Yeni cüzdan",
  ta: "புதிய பணப்பைக்குறி",
  te: "కొత్త వాలెట్",
  ko: "새 지갑",
  vi: "Ví mới",
  pl: "Nowy portfel",
  ro: "Portofel nou",
  nl: "Nieuwe portemonnee",
  el: "Νέο πορτοφόλι",
  th: "กระเป๋าเงินใหม่",
  cs: "Nová peněženka",
  hu: "Új pénztárca",
  sv: "Ny plånbok",
  da: "Ny pung",
}

export const PrivateKey: Localized<string> = {
  en: "Private key",
  zh: "私钥",
  hi: "निजी कुंजी",
  es: "Clave privada",
  ar: "المفتاح الخاص",
  fr: "Clé privée",
  de: "Privater Schlüssel",
  ru: "Приватный ключ",
  pt: "Chave privada",
  ja: "プライベートキー",
  pa: "ਨਿੱਜੀ ਕੁੰਜੀ",
  bn: "ব্যক্তিগত কী",
  id: "Kunci pribadi",
  ur: "نجی کلید",
  ms: "Kunci peribadi",
  it: "Chiave privata",
  tr: "Özel anahtar",
  ta: "தனிப்பட்ட விசை",
  te: "ప్రైవేట్ కీ",
  ko: "개인 키",
  vi: "Khóa cá nhân",
  pl: "Klucz prywatny",
  ro: "Cheie privată",
  nl: "Privésleutel",
  el: "Ιδιωτικό κλειδί",
  th: "กุญแจส่วนตัว",
  cs: "Soukromý klíč",
  hu: "Privát kulcs",
  sv: "Privat nyckel",
  da: "Privat nøgle",
}

export const Address: Localized<string> = {
  en: "Address",
  zh: "地址",
  hi: "पता",
  es: "Dirección",
  ar: "عنوان",
  fr: "Adresse",
  de: "Adresse",
  ru: "Адрес",
  pt: "Endereço",
  ja: "住所",
  pa: "ਪਤਾ",
  bn: "ঠিকানা",
  id: "Alamat",
  ur: "پتہ",
  ms: "Alamat",
  it: "Indirizzo",
  tr: "Adres",
  ta: "முகவரி",
  te: "చిరునామా",
  ko: "주소",
  vi: "Địa chỉ",
  pl: "Adres",
  ro: "Adresă",
  nl: "Adres",
  el: "Διεύθυνση",
  th: "ที่อยู่",
  cs: "Adresa",
  hu: "Cím",
  sv: "Adress",
  da: "Adresse",
}

export const MnemonicPhrase: Localized<string> = {
  en: "Mnemonic phrase",
  zh: "助记词",
  hi: "स्मरण वाक्य",
  es: "Frase mnemotécnica",
  ar: "عبارة تذكرية",
  fr: "Phrase mnémonique",
  de: "Mnemonic phrase",
  ru: "Мнемоническая фраза",
  pt: "Frase mnemônica",
  ja: "ニーモニックフレーズ",
  pa: "ਮਨਾਨਾਂਕ ਵਾਕ",
  bn: "মনের বাক্য",
  id: "Frasa mnemonic",
  ur: "یادگار جملہ",
  ms: "Frasa mnemonik",
  it: "Frase mnemonica",
  tr: "Mnemonik cümle",
  ta: "நினைவு வாக்கு",
  te: "నెమోనిక్ వాక్యం",
  ko: "기억구",
  vi: "Cụm từ ghi nhớ",
  pl: "Frazy mnemotechniczne",
  ro: "Fraza mnemotehnică",
  nl: "Mnemonic phrase",
  el: "Μνημονική φράση",
  th: "วลีจำ",
  cs: "Mnemotechnická fráze",
  hu: "Mnemonikus mondat",
  sv: "Mnemonic fras",
  da: "Mnemonic sætning",
}

export const Add: Localized<string> = {
  en: "Add",
  zh: "添加",
  hi: "जोड़ें",
  es: "Añadir",
  ar: "إضافة",
  fr: "Ajouter",
  de: "Hinzufügen",
  ru: "Добавить",
  pt: "Adicionar",
  ja: "追加",
  pa: "ਜੋੜੋ",
  bn: "যোগ",
  id: "Tambahkan",
  ur: "شامل کریں",
  ms: "Tambah",
  it: "Aggiungi",
  tr: "Ekle",
  ta: "சேர்க்க",
  te: "జోడించండి",
  ko: "추가",
  vi: "Thêm",
  pl: "Dodaj",
  ro: "Adaugă",
  nl: "Toevoegen",
  el: "Προσθήκη",
  th: "เพิ่ม",
  cs: "Přidat",
  hu: "Hozzáad",
  sv: "Lägg till",
  da: "Tilføj",
}

export const PasswordRequired: Localized<string> = {
  en: "Password required",
  zh: "需要密码",
  hi: "पासवर्ड आवश्यक है",
  es: "Se requiere contraseña",
  ar: "كلمة المرور مطلوبة",
  fr: "Mot de passe requis",
  de: "Passwort erforderlich",
  ru: "Требуется пароль",
  pt: "Senha necessária",
  ja: "パスワードが必要です",
  pa: "ਪਾਸਵਰਡ ਦੀ ਲੋੜ ਹੈ",
  bn: "পাসওয়ার্ড প্রয়োজন",
  id: "Kata sandi diperlukan",
  ur: "پاس ورڈ درکار ہے",
  ms: "Kata laluan diperlukan",
  it: "Password richiesta",
  tr: "Parola gerekli",
  ta: "கடவுச்சொல் தேவை",
  te: "పాస్వర్డ్ అవసరం",
  ko: "비밀번호 필요",
  vi: "Yêu cầu mật khẩu",
  pl: "Wymagane hasło",
  ro: "Parolă necesară",
  nl: "Wachtwoord vereist",
  el: "Απαιτείται κωδικός",
  th: "ต้องการรหัสผ่าน",
  cs: "Vyžadováno heslo",
  hu: "Jelszó szükséges",
  sv: "Lösenord krävs",
  da: "Adgangskode påkrævet",
}

export const PasswordTooShort: Localized<string> = {
  en: "Password too short",
  zh: "密码太短",
  hi: "पासवर्ड बहुत छोटा है",
  es: "Contraseña demasiado corta",
  ar: "كلمة السر قصيرة جدا",
  fr: "Mot de passe trop court",
  de: "Passwort zu kurz",
  ru: "Пароль слишком короткий",
  pt: "Senha muito curta",
  ja: "パスワードが短すぎます",
  pa: "ਪਾਸਵਰਡ ਬਹੁਤ ਛੋਟਾ ਹੈ",
  bn: "পাসওয়ার্ড খুব ছোট",
  id: "Kata sandi terlalu pendek",
  ur: "پاس ورڈ بہت چھوٹا ہے",
  ms: "Kata laluan terlalu pendek",
  it: "Password troppo corta",
  tr: "Parola çok kısa",
  ta: "கடவுச்சொல் மிகவும் குறைந்தது",
  te: "పాస్వర్డ్ చాలా చిన్నది",
  ko: "비밀번호가 너무 짧습니다",
  vi: "Mật khẩu quá ngắn",
  pl: "Hasło jest za krótkie",
  ro: "Parola prea scurtă",
  nl: "Wachtwoord te kort",
  el: "Ο κωδικός είναι πολύ μικρός",
  th: "รหัสผ่านสั้นเกินไป",
  cs: "Heslo je příliš krátké",
  hu: "A jelszó túl rövid",
  sv: "Lösenordet är för kort",
  da: "Adgangskoden er for kort",
}

export const PasswordsDontMatch: Localized<string> = {
  en: "Passwords don't match",
  zh: "密码不匹配",
  hi: "पासवर्ड मेल नहीं खाते",
  es: "Las contraseñas no coinciden",
  ar: "كلمات السر غير متطابقة",
  fr: "Les mots de passe ne correspondent pas",
  de: "Passwörter stimmen nicht überein",
  ru: "Пароли не совпадают",
  pt: "Senhas não correspondem",
  ja: "パスワードが一致しません",
  pa: "ਪਾਸਵਰਡ ਮੈਚ ਨਹੀਂ ਕਰਦੇ",
  bn: "পাসওয়ার্ড মিলছে না",
  id: "Kata sandi tidak cocok",
  ur: "پاس ورڈ میچ نہیں ہوتے",
  ms: "Kata laluan tidak sepadan",
  it: "Le password non corrispondono",
  tr: "Parolalar uyuşmuyor",
  ta: "கடவுச்சொல்கள் பொருந்தவில்லை",
  te: "పాస్వర్డ్లు పొరపడవు",
  ko: "비밀번호가 일치하지 않습니다",
  vi: "Mật khẩu không khớp",
  pl: "Hasła nie pasują",
  ro: "Parolele nu se potrivesc",
  nl: "Wachtwoorden komen niet overeen",
  el: "Οι κωδικοί δεν ταιριάζουν",
  th: "รหัสผ่านไม่ตรงกัน",
  cs: "Hesla se neshodují",
  hu: "A jelszavak nem egyeznek",
  sv: "Lösenorden matchar inte",
  da: "Adgangskoderne stemmer ikke overens",
}

export const NameRequired: Localized<string> = {
  en: "Please enter a name",
  zh: "请输入名称",
  hi: "कृपया एक नाम दर्ज करें",
  es: "Por favor, introduce un nombre",
  ar: "الرجاء إدخال اسم",
  fr: "Veuillez entrer un nom",
  de: "Bitte geben Sie einen Namen ein",
  ru: "Пожалуйста, введите имя",
  pt: "Por favor, insira um nome",
  ja: "名前を入力してください",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਨਾਮ ਦਿਓ",
  bn: "নাম লিখুন",
  id: "Silakan masukkan nama",
  ur: "براہ کرم ایک نام درج کریں",
  ms: "Sila masukkan nama",
  it: "Si prega di inserire un nome",
  tr: "Lütfen bir isim girin",
  ta: "ஒரு பெயரை உள்ளிடவும்",
  te: "దయచేసి ఒక పేరు నమోదు చేయండి",
  ko: "이름을 입력하십시오",
  vi: "Vui lòng nhập tên",
  pl: "Proszę podać nazwę",
  ro: "Vă rugăm să introduceți un nume",
  nl: "Voer een naam in",
  el: "Παρακαλώ εισάγετε ένα όνομα",
  th: "กรุณาใส่ชื่อ",
  cs: "Zadejte prosím jméno",
  hu: "Kérjük, adjon meg egy nevet",
  sv: "Ange ett namn",
  da: "Indtast venligst et navn",
}

export const ValidAddressRequired: Localized<string> = {
  en: "Please enter a valid address",
  zh: "请输入有效地址",
  hi: "कृपया एक मान्य पता दर्ज करें",
  es: "Por favor, introduce una dirección válida",
  ar: "الرجاء إدخال عنوان صالح",
  fr: "Veuillez entrer une adresse valide",
  de: "Bitte geben Sie eine gültige Adresse ein",
  ru: "Пожалуйста, введите действительный адрес",
  pt: "Por favor, insira um endereço válido",
  ja: "有効な住所を入力してください",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵਾਲੀਡ ਪਤਾ ਦਿਓ",
  bn: "একটি বৈধ ঠিকানা লিখুন",
  id: "Silakan masukkan alamat yang valid",
  ur: "براہ کرم ایک درست پتہ درج کریں",
  ms: "Sila masukkan alamat yang sah",
  it: "Si prega di inserire un indirizzo valido",
  tr: "Lütfen geçerli bir adres girin",
  ta: "ஒரு செல்லுபடியான முகவரி உள்ளிடவும்",
  te: "దయచేసి ఒక చెల్లని చిరునామా నమోదు చేయండి",
  ko: "유효한 주소를 입력하십시오",
  vi: "Vui lòng nhập một địa chỉ hợp lệ",
  pl: "Proszę podać poprawny adres",
  ro: "Vă rugăm să introduceți o adresă validă",
  nl: "Voer een geldig adres in",
  el: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση",
  th: "กรุณาใส่ที่อยู่ที่ถูกต้อง",
  cs: "Zadejte prosím platnou adresu",
  hu: "Kérjük, adjon meg egy érvényes címet",
  sv: "Ange en giltig adress",
  da: "Indtast venligst en gyldig adresse",
}

export const ValidPrivateKeyRequired: Localized<string> = {
  en: "Please enter a valid private key",
  zh: "请输入有效的私钥",
  hi: "कृपया एक मान्य निजी कुंजी दर्ज करें",
  es: "Por favor, introduce una clave privada válida",
  ar: "الرجاء إدخال مفتاح خاص صالح",
  fr: "Veuillez entrer une clé privée valide",
  de: "Bitte geben Sie einen gültigen privaten Schlüssel ein",
  ru: "Пожалуйста, введите действительный закрытый ключ",
  pt: "Por favor, insira uma chave privada válida",
  ja: "有効なプライベートキーを入力してください",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਨਿਜੀ ਕੁੰਜੀ ਦਿਓ",
  bn: "একটি বৈধ ব্যক্তিগত কী লিখুন",
  id: "Silakan masukkan kunci pribadi yang valid",
  ur: "براہ کرم ایک درست نجی کلید درج کریں",
  ms: "Sila masukkan kunci peribadi yang sah",
  it: "Si prega di inserire una chiave privata valida",
  tr: "Lütfen geçerli bir özel anahtar girin",
  ta: "ஒரு செல்லுபடியான தனிப்பட்ட விசை உள்ளிடவும்",
  te: "దయచేసి ఒక చెల్లని ప్రైవేట్ కీ నమోదు చేయండి",
  ko: "유효한 개인 키를 입력하십시오",
  vi: "Vui lòng nhập một khóa cá nhân hợp lệ",
  pl: "Proszę podać poprawny klucz prywatny",
  ro: "Vă rugăm să introduceți o cheie privată validă",
  nl: "Voer een geldige privésleutel in",
  el: "Παρακαλώ εισάγετε ένα έγκυρο ιδιωτικό κλειδί",
  th: "กรุณาใส่คีย์ส่วนตัวที่ถูกต้อง",
  cs: "Zadejte prosím platný soukromý klíč",
  hu: "Kérjük, adjon meg egy érvényes privát kulcsot",
  sv: "Ange en giltig privat nyckel",
  da: "Indtast venligst en gyldig privat nøgle",
}

export const ValidDerivationPathRequired: Localized<string> = {
  en: "Please enter a valid derivation path",
  zh: "请输入有效的派生路径",
  hi: "कृपया एक मान्य विकल्प पथ दर्ज करें",
  es: "Por favor, introduce una ruta de derivación válida",
  ar: "الرجاء إدخال مسار اشتقاق صالح",
  fr: "Veuillez entrer un chemin de dérivation valide",
  de: "Bitte geben Sie einen gültigen Derivationspfad ein",
  ru: "Пожалуйста, введите действительный путь производной",
  pt: "Por favor, insira um caminho de derivação válido",
  ja: "有効な導出パスを入力してください",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਨਿਕਾਸ ਰਾਹ ਦਿਓ",
  bn: "একটি বৈধ প্রস্তুতি পথ লিখুন",
  id: "Silakan masukkan jalur derivasi yang valid",
  ur: "براہ کرم ایک درست اشتقاقی راستہ درج کریں",
  ms: "Sila masukkan laluan derivasi yang sah",
  it: "Si prega di inserire un percorso di derivazione valido",
  tr: "Lütfen geçerli bir türetme yolu girin",
  ta: "ஒரு செல்லுபடியான மாற்று பாதை உள்ளிடவும்",
  te: "దయచేసి ఒక చెల్లని డిరివేషన్ పాథ్ నమోదు చేయండి",
  ko: "유효한 파생 경로를 입력하십시오",
  vi: "Vui lòng nhập một đường dẫn phát sinh hợp lệ",
  pl: "Proszę podać poprawną ścieżkę pochodną",
  ro: "Vă rugăm să introduceți un drum de derivare valid",
  nl: "Voer een geldig afgeleidingspad in",
  el: "Παρακαλώ εισάγετε ένα έγκυρο μονοπάτι παράγωγης",
  th: "กรุณาใส่เส้นทางที่ถูกต้อง",
  cs: "Zadejte prosím platnou odvozovací cestu",
  hu: "Kérjük, adjon meg egy érvényes származási utat",
  sv: "Ange en giltig härledningsväg",
  da: "Indtast venligst en gyldig afledningsvej",
}

export const ValidMnemonicPhraseRequired: Localized<string> = {
  en: "Please enter a valid mnemonic phrase",
  zh: "请输入有效的助记词",
  hi: "कृपया एक मान्य स्मरण वाक्य दर्ज करें",
  es: "Por favor, introduce una frase mnemotécnica válida",
  ar: "الرجاء إدخال عبارة تذكرية صالحة",
  fr: "Veuillez entrer une phrase mnémonique valide",
  de: "Bitte geben Sie eine gültige Mnemonic phrase ein",
  ru: "Пожалуйста, введите действительную мнемоническую фразу",
  pt: "Por favor, insira uma frase mnemônica válida",
  ja: "有効なニーモニックフレーズを入力してください",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਯਾਦਗਾਰ ਵਾਕ ਦਿਓ",
  bn: "একটি বৈধ মনের বাক্য লিখুন",
  id: "Silakan masukkan frasa mnemonic yang valid",
  ur: "براہ کرم ایک درست یادگار جملہ درج کریں",
  ms: "Sila masukkan frasa mnemonik yang sah",
  it: "Si prega di inserire una frase mnemonica valida",
  tr: "Lütfen geçerli bir mnemonik cümle girin",
  ta: "ஒரு செல்லுபடியான நினைவு வாக்கு உள்ளிடவும்",
  te: "దయచేసి ఒక చెల్లని నెమోనిక్ వాక్యం నమోదు చేయండి",
  ko: "유효한 기억구를 입력하십시오",
  vi: "Vui lòng nhập một cụm từ ghi nhớ hợp lệ",
  pl: "Proszę podać poprawną frazę mnemotechniczną",
  ro: "Vă rugăm să introduceți o frază mnemotehnică validă",
  nl: "Voer een geldige Mnemonic phrase in",
  el: "Παρακαλώ εισάγετε μια έγκυρη μνημονική φράση",
  th: "กรุณาใส่วลีจำที่ถูกต้อง",
  cs: "Zadejte prosím platnou mnemotechnickou frázi",
  hu: "Kérjük, adjon meg egy érvényes mnemonikus mondatot",
  sv: "Ange en giltig mnemonisk fras",
  da: "Indtast venligst en gyldig mnemonisk sætning",
}

export const Generate: Localized<string> = {
  en: "Generate",
  zh: "生成",
  hi: "उत्पन्न",
  es: "Generar",
  ar: "توليد",
  fr: "Générer",
  de: "Generieren",
  ru: "Генерировать",
  pt: "Gerar",
  ja: "生成する",
  pa: "ਉਤਪੰਨ",
  bn: "উত্পন্ন",
  id: "Menghasilkan",
  ur: "پیدا کریں",
  ms: "Hasilkan",
  it: "Generare",
  tr: "Oluşturmak",
  ta: "உருவாக்க",
  te: "రూపొచ్చు",
  ko: "생성",
  vi: "Tạo ra",
  pl: "Generować",
  ro: "Genera",
  nl: "Genereren",
  el: "Δημιουργώ",
  th: "สร้าง",
  cs: "Generovat",
  hu: "Generál",
  sv: "Generera",
  da: "Generere",
}

export const Generate12Words: Localized<string> = {
  en: "Generate 12 words",
  zh: "生成 12 个单词",
  hi: "12 शब्द उत्पन्न करें",
  es: "Generar 12 palabras",
  ar: "توليد 12 كلمة",
  fr: "Générer 12 mots",
  de: "12 Wörter generieren",
  ru: "Сгенерировать 12 слов",
  pt: "Gerar 12 palavras",
  ja: "12 単語を生成する",
  pa: "12 ਸ਼ਬਦ ਉਤਪੰਨ ਕਰੋ",
  bn: "12 শব্দ উত্পন্ন",
  id: "Menghasilkan 12 kata",
  ur: "12 الفاظ پیدا کریں",
  ms: "Hasilkan 12 perkataan",
  it: "Generare 12 parole",
  tr: "12 kelime oluştur",
  ta: "12 வார்த்தைகளை உருவாக்கவும்",
  te: "12 అక్షరాలను రూపొచ్చు",
  ko: "12 단어 생성",
  vi: "Tạo ra 12 từ",
  pl: "Generuj 12 słów",
  ro: "Generați 12 cuvinte",
  nl: "Genereer 12 woorden",
  el: "Δημιουργήστε 12 λέξεις",
  th: "สร้าง 12 คำ",
  cs: "Generovat 12 slov",
  hu: "12 szó generálása",
  sv: "Generera 12 ord",
  da: "Generer 12 ord",
}

export const Generate24Words: Localized<string> = {
  en: "Generate 24 words",
  zh: "生成 24 个单词",
  hi: "24 शब्द उत्पन्न करें",
  es: "Generar 24 palabras",
  ar: "توليد 24 كلمة",
  fr: "Générer 24 mots",
  de: "24 Wörter generieren",
  ru: "Сгенерировать 24 слова",
  pt: "Gerar 24 palavras",
  ja: "24 単語を生成する",
  pa: "24 ਸ਼ਬਦ ਉਤਪੰਨ ਕਰੋ",
  bn: "24 শব্দ উত্পন্ন",
  id: "Menghasilkan 24 kata",
  ur: "24 الفاظ پیدا کریں",
  ms: "Hasilkan 24 perkataan",
  it: "Generare 24 parole",
  tr: "24 kelime oluştur",
  ta: "24 வார்த்தைகளை உருவாக்கவும்",
  te: "24 అక్షరాలను రూపొచ్చు",
  ko: "24 단어 생성",
  vi: "Tạo ra 24 từ",
  pl: "Generuj 24 słów",
  ro: "Generați 24 cuvinte",
  nl: "Genereer 24 woorden",
  el: "Δημιουργήστε 24 λέξεις",
  th: "สร้าง 24 คำ",
  cs: "Generovat 24 slov",
  hu: "24 szó generálása",
  sv: "Generera 24 ord",
  da: "Generer 24 ord",
}