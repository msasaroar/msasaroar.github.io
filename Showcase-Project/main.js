// Tooltip-এ বর্তমান পেইজ path বসানো
const path = window.location.pathname;
const homeBtn = document.querySelector(".home-button");

if (homeBtn) {
  homeBtn.title = "বর্তমান পেইজ পাথ: " + path;
}