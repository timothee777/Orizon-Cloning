// custom cursor codes

const cursor = document.querySelector('.cursor');


document.addEventListener('mousemove', e => {
    // console.log(e);
    cursor.setAttribute("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;");
});


// sticky hover animation codes

class HoverButton {
constructor(el) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
}

attachEventsListener() {
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("resize", (e) => this.calculatePosition(e));
}

calculatePosition() {
    gsap.set(this.el, {
        x: 0,
        y: 0,
        scale: 1
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
}

onMouseMove(e) {
    let hover = false;
    let hoverArea = this.hover ? 0.7 : 0.5;
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
        hover = true;
        if (!this.hover) {
            this.hover = true;
        }
        this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
        this.onLeave();
        this.hover = false;
    }
}

onHover(x, y) {
    gsap.to(this.el, {
        x: (x - this.x) * 0.4,
        y: (y - this.y) * 0.4,
        scale: 1.15,
        ease: "power2.out",
        duration: 0.4
    });
    this.el.style.zIndex = 10;
}
onLeave() {
    gsap.to(this.el, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "elastic.out(1.2, 0.4)",
        duration: 0.7
    });
    this.el.style.zIndex = 1;
}
}

const stickyButton = document.querySelector('#anchor-contact');
new HoverButton(stickyButton); 

const stickyButton2 = document.querySelector('.lets-talk');
new HoverButton(stickyButton2); 

const stickyButton3 = document.querySelector('.contact-us-btn');
new HoverButton(stickyButton3); 

// const stickyButton4 = document.querySelector('.view-more-button');
// new HoverButton(stickyButton4); 

// End of sticky hover animation codes





// sidenav animation completed
const holderMenu = document.querySelector('.holder-menu');
const topMenuLine = document.querySelector('.menu-line1');
const bottomMenuLine = document.querySelector('.menu-line2');
const menuBackground = document.querySelector('.menu-bg');
const menuContainer = document.querySelector('.menu-container');

let menuOpen = false;
holderMenu.addEventListener('click',() => {
    if(!menuOpen) {
        topMenuLine.classList.add('open');
        bottomMenuLine.classList.add('open');
        holderMenu.classList.add('open');
        menuBackground.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
        menuBackground.style.visibility = "visible";
        menuContainer.style.transform = "translateX(100%)";
        menuOpen = true;
    } else {
        topMenuLine.classList.remove('open');
        bottomMenuLine.classList.remove('open');
        holderMenu.classList.remove('open');
        menuBackground.style.backgroundColor = "rgba(255, 255, 255, 0)";
        menuBackground.style.visibility = "hidden";
        menuContainer.style.transform = "translateX(200%)";
        menuOpen = false;
    }
})


// element reveal on scroll :

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    console.log(reveals);

    for (var i=0; i < reveals.length; i++) {

        var windowHeight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        console.log(revealtop);
        var revealpoint = 50;

        if (revealtop < windowHeight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}


// Change holder-menu style on scroll:

window.addEventListener('scroll', changeHolderMenu);

function changeHolderMenu() {
    if (window.scrollY > 0) {
        holderMenu.style.backgroundColor = "black";
        topMenuLine.style.backgroundColor = "white";
        bottomMenuLine.style.backgroundColor = "white";
        // holderMenu.classList.add('scrolled-menu');
        // topMenuLine.classList.add('scrolled-menuLine');
    } 
    else {
        holderMenu.style.backgroundColor = "white";
        topMenuLine.style.backgroundColor = "#2b00d4";
        bottomMenuLine.style.backgroundColor = "#2b00d4";
        // holderMenu.classList.remove('scrolled-menu');
        // topMenuLine.classList.remove('scrolled-menuLine');
    }
}

// Change cursor style on hover

const anchorPoints = document.querySelectorAll('a');

console.log(anchorPoints);

for (var i = 0; i < anchorPoints.length; i++) {
    anchorPoints[i].addEventListener('mouseenter', changeCursorStyle);
    anchorPoints[i].addEventListener('mouseleave', resetCursorStyle);
}

function changeCursorStyle() {
    cursor.classList.add('cursor-hovering');
}

function resetCursorStyle() {
    cursor.classList.remove('cursor-hovering');

}


// Hover Tilting effect

const settings = {
    max: 5,
    perspective: 1000,
    scale: 1,
    speed: 500,
    easing: 'cubic-bezier(.03, .98, .52, .99)'
}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mousemove", cardMouseMove);
    card.addEventListener("mouseleave", cardMouseLeave);
});


function cardMouseEnter(event) {
    setTransition(event);
}

function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth / 2;
    const centerY = card.offsetTop + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = ((+1) * settings.max * mouseY / (cardHeight / 2)).toFixed(2);
    const rotateYUncapped = ((-1) * settings.max * mouseX / (cardWidth / 2)).toFixed(2);
    const rotateX = rotateXUncapped < -settings.max ? -settings.max : (rotateXUncapped > settings.max ? settings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -settings.max ? -settings.max : (rotateYUncapped > settings.max ? settings.max : rotateYUncapped);

    card.style.transform = `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`;
}

function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
}

function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId)
    card.style.transition = `transform ${settings.speed}ms ${settings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = "";
    }, settings.speed);
}


// Switch visibility of shadow mask

const newCardHolders = document.querySelectorAll(".new-card-holder");
const shadowMasks = document.querySelectorAll(".shadow-mask");

newCardHolders.forEach(newCardHolder => {
    newCardHolder.addEventListener('mouseenter', shadowMaskOn);
    newCardHolder.addEventListener('mouseleave', shadowMaskOff);
});

function shadowMaskOn() {
    for (let i=0; i < shadowMasks.length; i++) {
        shadowMasks[i].style.visibility = 'visible';
    }
}

function shadowMaskOff() {
    for (let i = 0; i < shadowMasks.length; i++) {
        shadowMasks[i].style.visibility = 'hidden';
    }
}









