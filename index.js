const current_services = 15;
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
var multiplier_level = 1;

var clicks = 0;
var last_clicked = last_updated = 0;

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

function play_powerup_sound() {
    const audio = new Audio("./assets/powerup.mp3");
    audio.volume = 0.25;
    audio.play();
}



function increment_counter() {
    counter += 1 * multiplier;
    clicks += 1;
    view_counter = BigInt(counter);
    document.title = `${view_counter} | Internship Counter`;
    counter_elem.innerText = view_counter;
}

function update_multiplier(amnt) 
{
    if (amnt == 0)
    {
        multiplier = 1;
        multiplier_level = 1;
        remove_multipliers();
        document.documentElement.style.setProperty('--base-filter-deg', `${0}`);
    }
    else
    {
        multiplier *= 2;
        multiplier_level += 1;
        create_multiplier_element(`x${2}`,getRandom(3, 4), getRandom(3, 4), getRandom(1, 2));
        document.documentElement.style.setProperty('--base-filter-deg', `${multiplier_level*22.5}deg`);
        play_powerup_sound();
    }
}

// Update Multiplier
setInterval(function () {
    if (clicks > 5)
    {
        last_clicked = 0;
        last_updated += 1;
        
        if (last_updated >= 5 + (1.5*multiplier_level / clicks) && last_updated != 0)
        {
            update_multiplier(clicks);
            last_updated = 0;
        }
    }
    else
    {
        last_clicked += 1;
        last_updated = 0;
    }
    
    if (last_clicked == 2)
        update_multiplier(0);
    
    clicks = 0;
}, 1000);

function create_multiplier_element(text, movex_speed, movey_speed, spin_speed)
{
    let newmultiplier = document.createElement("div");
    newmultiplier.classList.add("multiplier");
    newmultiplier.classList.add("no-select");
    newmultiplier.innerText = text;
    newmultiplier.style.animation = `moveX ${movex_speed}s linear -${getRandom(1, 4)}s infinite alternate,\
     moveY ${movey_speed}s linear -${getRandom(1, 4)}s infinite alternate,\
      spin-multiplier ${spin_speed}s linear infinite`;

    document.body.appendChild(newmultiplier);
}

function remove_multipliers()
{
    let elementsToRemove = document.querySelectorAll('.multiplier');

    elementsToRemove.forEach(element => {
        element.classList.add('fade-out');
        element.addEventListener('transitionend', () => {
          element.remove();
        });
    });
}

function getRandom(min, max) {
    return Math.random() * max + min;
  }