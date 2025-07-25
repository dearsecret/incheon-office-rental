document.addEventListener("DOMContentLoaded", () => {
  const fabBtn = document.getElementById("fab-signup");
  const modal = document.getElementById("privacyModal");
  const agreeCheck = document.getElementById("agreeCheck");
  const kakaoBtn = document.getElementById("kakaoJoinBtn");

  const userName = document.getElementById("userName");
  const userBirth = document.getElementById("userBirth");
  const userEmail = document.getElementById("userEmail");

  function isGenderSelected() {
    return document.querySelector('input[name="gender"]:checked') !== null;
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    return (
      agreeCheck.checked &&
      userName.value.trim() !== "" &&
      userBirth.value !== "" &&
      isEmailValid(userEmail.value.trim()) &&
      isGenderSelected()
    );
  }

  function updateJoinBtnState() {
    if (validateForm()) {
      kakaoBtn.disabled = false;
      kakaoBtn.classList.add("enabled");
    } else {
      kakaoBtn.disabled = true;
      kakaoBtn.classList.remove("enabled");
    }
  }

  fabBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      agreeCheck.checked = false;
      kakaoBtn.disabled = true;
      kakaoBtn.classList.remove("enabled");
    }
  });

  // 입력값이 바뀔 때마다 유효성 검사
  [agreeCheck, userName, userBirth, userEmail].forEach(el => {
    el.addEventListener("input", updateJoinBtnState);
  });
  document.querySelectorAll('input[name="gender"]').forEach(el => {
    el.addEventListener("change", updateJoinBtnState);
  });

  // 가입 버튼 클릭 시
  kakaoBtn.addEventListener("click", () => {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const payload = {
      name: userName.value.trim(),
      birth: userBirth.value,
      email: userEmail.value.trim(),
      gender,
    };
    console.log("가입 정보:", payload);
    window.location.href = "https://song-do.com/subscript/";
  });
});