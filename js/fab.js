document.addEventListener("DOMContentLoaded", () => {
  const fabBtn = document.getElementById("fab-signup");
  const modal = document.getElementById("privacyModal");
  const agreeCheck = document.getElementById("agreeCheck");
  const kakaoBtn = document.getElementById("kakaoJoinBtn");

  fabBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  agreeCheck.addEventListener("change", () => {
    if (agreeCheck.checked) {
      kakaoBtn.disabled = false;
      kakaoBtn.classList.add("enabled");
    } else {
      kakaoBtn.disabled = true;
      kakaoBtn.classList.remove("enabled");
    }
  });


  kakaoBtn.addEventListener("click", () => {
    window.location.href = "https://song-do.com/subscript/";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      agreeCheck.checked = false;
      kakaoBtn.disabled = true;
      kakaoBtn.classList.remove("enabled");
    }
  });
});