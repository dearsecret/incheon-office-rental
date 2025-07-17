const texts = {
    ko: {
      title: "인천 중고차매매단지 사무실 임대",
      description: "한달 $300부터 시작하는 송도유원지 내 사무실 임대",
      contactPhone: "문의하기 : 010-8116-0896",
      contactEmail: "📧 dearsecret1217@gmail.com",
      contactWhatsApp: "WhatsApp 문의",
      contactKakao: "카카오톡 문의",
    },
    en: {
      title: "Office for Rent in Songdo Car Market, Incheon",
      description: "Office rental starting at $300 per month in Songdo Used Car Market.",
      contactPhone: "Contact: 010-8116-0896",
      contactEmail: "📧 dearsecret1217@gmail.com",
      contactWhatsApp: "WhatsApp Contact",
      contactKakao: "Contact via KakaoTalk",
    },
    ar: {
      title: "تأجير مكاتب في سوق السيارات إنشون - سونغدو",
      description: "تبدأ أسعار تأجير المكاتب من 300 دولار شهريًا في سوق سيارات سونغدو.",
      contactPhone: 'اتصل: <span dir="ltr">010-8116-0896</span>',
      contactEmail: "📧 dearsecret1217@gmail.com",
      contactWhatsApp: "WhatsApp Contact",
      contactKakao: "تواصل عبر كاكاو",
    },
    ru: {
      title: "Аренда офиса в Инчхоне (рынок автомобилей Сонгдо)",
      description: "Аренда офисов от $300 в месяц на авторынке Сонгдо, Инчхон.",
      contactPhone: "Контакт: 010-8116-0896",
      contactEmail: "📧 dearsecret1217@gmail.com",
      contactWhatsApp: "WhatsApp Contact",
      contactKakao: "Contact via KakaoTalk",
    },
  };

const userLang = navigator.language.slice(0, 2);
const localizedContent = texts[userLang] || texts["ko"];

document.getElementById("title").textContent = localizedContent.title;
document.getElementById("desc").textContent = localizedContent.description;