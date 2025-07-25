let lastScroll = 0;
const footer = document.getElementById("page-footer");
const tab = document.querySelector(".tab-bar");
const fab = document.getElementById("fab-signup");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const hide = currentScroll > lastScroll + 5;
  const show = currentScroll < lastScroll - 5;
  const footerHeight = footer.offsetHeight || 0;


  if (hide) {
    footer.classList.add("hide");
    tab.classList.add("hide");
    fab.style.bottom = "10px"; 
  } else if (show) {
    footer.classList.remove("hide");
    tab.classList.remove("hide");
    fab.style.bottom = `${footerHeight + 20}px`;
  }

  lastScroll = currentScroll;
});