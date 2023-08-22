const current_services = 80;
const target_services = 80;

// -------- source --------
const wave = document.getElementById("wave");

// The higher the number, the lower the liquid
var current_amount = 100 - Math.round(current_services / target_services * 100);
wave.style.top = current_amount.toString() + "%";
