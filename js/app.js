const API_URL = "PUT_YOUR_GOOGLE_SCRIPT_URL_HERE";

// Mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// Dark mode
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  const theme = document.body.dataset.theme === "dark" ? "" : "dark";
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

document.body.dataset.theme = localStorage.getItem("theme") || "";

// Forms
async function submitForm(e, type) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.innerText = "Submitting...";

  const payload = [...form.querySelectorAll("input,select")]
    .map(el => el.value.trim());

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload })
    });
    const data = await res.json();
    alert(data.message);
    form.reset();
  } catch {
    alert("Submission failed");
  } finally {
    btn.disabled = false;
    btn.innerText = "Submit";
  }
}
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    current === "dark" ? "light" : "dark"
  );
});
