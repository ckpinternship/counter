const current_services = 3;
const target_services = 80;

// -------- source --------
const cup = document.getElementById("cup");
const wave = document.getElementById("wave");
const number = document.getElementById("number");

// The higher the number, the lower the liquid
// update liquid amound and number
var current_amount = 100 - Math.round(current_services / target_services * 100);
wave.style.top = current_amount.toString() + "%";
number.innerText = current_services.toString();

number.innerText = current_services.toString();

// Cup click
var space_down = false;
cup.addEventListener("mousedown", (event) => {
    cup.classList.add("cup-animation");
    play_click_sound();
});

cup.addEventListener("mouseup", (event) => {
    setTimeout(() => {cup.classList.remove("cup-animation")}, 25);
});

cup.addEventListener("mouseleave", (event) => {
    if (!space_down)
        cup.classList.remove("cup-animation");
});

//spacebar
document.addEventListener('keydown', event => {
    if (event.code == "Space" && !space_down) 
    {
        cup.classList.add("cup-animation");
        play_click_sound();
        space_down = true;
    }
});

document.addEventListener('keyup', event => {
    if (event.code == "Space") 
    {
        setTimeout(() => {cup.classList.remove("cup-animation")}, 25);
        space_down = false;
    }
});

// update liquid wave height
var current_coffee = 1;
if (100 - current_amount <= 4)
    current_coffee = 6;
 else if (100 - current_amount <= 10)
    current_coffee = Math.floor(Math.random() * 3) + 4;
 else if (100 - current_amount <= 80)
    current_coffee = 3;
 else
    current_coffee = 4;
 wave.style.backgroundImage = `url(assets/coffee${current_coffee}.png)`


function play_click_sound() {
    var audio = new Audio("./assets/mixkit-gate-latch-click-1924.wav");
    audio.play();
}
