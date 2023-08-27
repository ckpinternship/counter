const current_services = 7;
const target_services = 80;

// -------- source --------
const cup_elem = document.getElementById("cup");
const wave_elem = document.getElementById("wave");
const number_elem = document.getElementById("number");
const counter_elem = document.getElementById("counter");

// Preventing dragging of elements
document.addEventListener("dragstart", (evebt) => {event.preventDefault()});

var counter = 0;
var multiplier = 1;

// The higher the number, the lower the liquid
// update liquid amount and number
var current_amount = 100 - Math.round(current_services / target_services * 100);
wave_elem.style.top = current_amount.toString() + "%";
number_elem.innerText = current_services.toString();

// Cup click
var space_down = false;
cup_elem.addEventListener("mousedown", (event) => {
    cup_elem.classList.add("cup-animation");
    play_click_sound();
    increment_counter();
});

cup_elem.addEventListener("mouseup", (event) => {
    setTimeout(() => {
        cup_elem.classList.remove("cup-animation")
    }, 25);
});

cup_elem.addEventListener("mouseleave", (event) => {
    if (!space_down) cup_elem.classList.remove("cup-animation");
});

//spacebar
document.addEventListener('keydown', event => {
    if (event.code === "Space" && !space_down) {
        cup_elem.classList.add("cup-animation");
        play_click_sound();
        space_down = true;
        increment_counter();
    }
});

document.addEventListener('keyup', event => {
    if (event.code === "Space") {
        setTimeout(() => {
            cup_elem.classList.remove("cup-animation")
        }, 25);
        space_down = false;
    }
});

// update liquid wave height
var current_coffee = 1;
if (100 - current_amount <= 10) current_coffee = 6;
else if (100 - current_amount <= 80) current_coffee = 3;
else current_coffee = 4;
wave_elem.style.backgroundImage = `url(assets/coffee${current_coffee}.png)`


function play_click_sound() {
    const audio = new Audio("./assets/mixkit-gate-latch-click-1924.wav");
    audio.play();
}

function increment_counter() {
    counter += 1 * multiplier;
    view_counter = BigInt(counter)
    document.title = `${view_counter} | Internship Counter`;
    counter_elem.innerText = view_counter;
}
