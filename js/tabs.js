document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
  
      const selected = tab.dataset.tab;
      document.getElementById("main-section").style.display = selected === "main" ? "block" : "none";
      document.getElementById("map-section").style.display = selected === "map" ? "block" : "none";
    });
  });