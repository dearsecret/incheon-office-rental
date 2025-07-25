let lastScroll = 0;
const footer = document.getElementById("page-footer");
const tab = document.querySelector(".tab-bar");
const fab = document.getElementById("fab-signup");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const hide = currentScroll > lastScroll + 5;
  const show = currentScroll < lastScroll - 5;

  if (hide) {
    footer.classList.add("hide");
    tab.classList.add("hide");
    fab.style.top = "10px"; 
  } else if (show) {
    footer.classList.remove("hide");
    tab.classList.remove("hide");
    fab.style.top = "60px"; 
  }

  lastScroll = currentScroll;
});