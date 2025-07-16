let lastScroll = 0;
const footer = document.getElementById("page-footer");
const tab = document.querySelector(".tab-bar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const hide = currentScroll > lastScroll + 5;
  const show = currentScroll < lastScroll - 5;

  if (hide) {
    footer.classList.add("hide");
    tab.classList.add("hide");
  } else if (show) {
    footer.classList.remove("hide");
    tab.classList.remove("hide");
  }

  lastScroll = currentScroll;
});