function renderContact(isMobile) {
    const footer = document.getElementById("page-footer");
    const content = localizedContent;
    const parts = [];
  
    if (contactInfo.whatsappNumber) {
      parts.push(`
        <a href="https://wa.me/${contactInfo.whatsappNumber}" target="_blank" class="contact-button whatsapp-button">
        <span class="whatsapp-icon-wrapper">
          <img src="assets/icons/whatsapp.svg" alt="WhatsApp" class="kakao-icon"/> 
        </span>
        ${content.contactWhatsApp}
        </a>
      `);
    }
  
    if (contactInfo.kakaoId) {
      parts.push(`
        <a href="https://pf.kakao.com/${contactInfo.kakaoId}/chat" target="_blank" class="contact-button kakao-button">
        <span class="icon-wrapper">
          <img src="assets/icons/kakaotalk.svg" alt="KakaoTalk" class="kakao-icon"/>
        </span>
        ${content.contactKakao}
        </a>
      `);
    }
  
    if (contactInfo.instagramId) {
      parts.push(`
        <a href="https://instagram.com/${contactInfo.instagramId}" target="_blank" class="contact-button insta-button">
        <span class="icon-wrapper">
          <img src="assets/icons/instagram.svg" alt="Instagram" class="instagram-icon"/>
        </span>
        Instagram
        </a>
      `);
    }
  
    footer.innerHTML = parts.join("\n");
  
    const mapSection = document.getElementById("map-section");
    mapSection.querySelector(".map-contact")?.remove();
  
    if (contactInfo.phone) {
      const mapContact = document.createElement("div");
      mapContact.className = "map-contact";
  
      if (isMobile) {
        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${contactInfo.phone}`;
        phoneLink.textContent = content.contactPhone;
        phoneLink.className = "phone-link active-phone";
        mapContact.appendChild(phoneLink);
      } else {
        mapContact.textContent = content.contactPhone;
      }
  
      mapSection.prepend(mapContact);
    }
  }
  
const mql = window.matchMedia("(max-width: 768px)");
renderContact(mql.matches);
mql.addEventListener?.("change", e => renderContact(e.matches));