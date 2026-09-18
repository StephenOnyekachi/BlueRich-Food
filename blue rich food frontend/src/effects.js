
// TYPING ANIMATION
// export function createTypingEffect(selector, words, speed = 100, deleteSpeed = 50, delay = 1500) {
//   const element = document.querySelector(selector);

//   let wordIndex = 0;
//   let charIndex = 0;
//   let isDeleting = false;

//   function type() {
//     const current = words[wordIndex];
//     const text = current.text;
//     const color = current.color;

//     if (element) {
//         if (!isDeleting) {
//         element.innerHTML = `<span style="color:${color}">${text.substring(0, charIndex + 1)}</span>`;
//         charIndex++;

//         if (charIndex === text.length) {
//             isDeleting = true;
//             setTimeout(type, delay);
//             return;
//         }
//         } else {
//         element.innerHTML = `<span style="color:${color}">${text.substring(0, charIndex - 1)}</span>`;
//         charIndex--;

//         if (charIndex === 0) {
//             isDeleting = false;
//             wordIndex = (wordIndex + 1) % words.length;
//         }
//         }
//     }
//     setTimeout(type, isDeleting ? deleteSpeed : speed);
//   }

//   type();
// }
// createTypingEffect(".typing", [
//   { text: "Delicious Meals 🍔", color: "#ff5733" },
//   { text: "Fresh & Hot Food 🍕", color: "#28a745" },
//   { text: "Order Anytime 🍽️", color: "#ffc107" }
// ]);


// PRELOADER
export function initPreloader() {
    // window.addEventListener("load", () => {
    // const loader = document.getElementById("preloader");

    // loader.style.opacity = "0";

    // setTimeout(() => {
    //     loader.style.display = "none";
    // }, 500);
    // });
    window.addEventListener("load", () => {
        const loader = document.getElementById("preloader");
        if (!loader) return; // Exit if loader is not found
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    });
}

// SMOOTH SCROLL
export function initSmoothScroll() {
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener("click", function(e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute("href"))
    //         .scrollIntoView({ behavior: "smooth" });
    //     });
    // });
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors) return; // Exit if no anchors are found
    anchors.forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

/* TOP MENU SCROW EFFECT */
export function initNavScroll(){
    // window.addEventListener('scroll', function() {
    //     const nav = document.querySelector('.top-menu');
    //     if (window.scrollY > 50) {
    //         nav.classList.add('active');
    //     } else {
    //         nav.classList.remove('active');
    //     }
    // });
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.top-menu');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

// SLIDE TOP EFFECT
export function initSlideTop() {
    window.addEventListener('scroll', slidetop);
    function slidetop(){
        var reavels = document.querySelectorAll('.slidetop');
        
        for(var i = 0; i < reavels.length; i++){

            const windowheight = window.innerHeight;
            const reaveltop = reavels[i].getBoundingClientRect().top;
            const reavelpoint = 60;

            if(reaveltop < windowheight - reavelpoint){
                reavels[i].classList.add('active');
            }
            else{
                reavels[i].classList.remove('active');
            }
        }
    }
}

// SLIDE left EFFECT
export function initSlideLeft() {
    window.addEventListener('scroll', leftslide);
    function leftslide(){
        var reavels = document.querySelectorAll('.slideleft');
        
        for(var i = 0; i < reavels.length; i++){

            var windowheight = window.innerHeight;
            var reaveltop = reavels[i].getBoundingClientRect().top;
            var reavelpoint = 10;

            if(reaveltop < windowheight - reavelpoint){
                reavels[i].classList.add('active');
            }
            else{
                reavels[i].classList.remove('active');
            }
        }
    }
}

// ZOOM IN EFFECT
export function initZoomIn() {
    window.addEventListener('scroll', zoomIn);
    function zoomIn(){
        var reavels = document.querySelectorAll('.zoom-in');
        
        for(var i = 0; i < reavels.length; i++){
            var windowheight = window.innerHeight;
            var reaveltop = reavels[i].getBoundingClientRect().top;
            var reavelpoint = 0;

            if(reaveltop < windowheight - reavelpoint){
                reavels[i].classList.add('active');
            }
            else{
                reavels[i].classList.remove('active');
            }
        }
    }
}

// For Showing and Hidding Password
export function setupPasswordToggles() {
    const toggles = document.querySelectorAll('.passwordtoggle')
    toggles.forEach(toggle => {
        const passInput = toggle.previousElementSibling // the <input> before the icon

        toggle.addEventListener('click', () => {
            if (passInput.type === 'password') {
                passInput.type = 'text'
                toggle.classList.remove('fa-eye')
                toggle.classList.add('fa-eye-slash')
                console.log('password showing')
            } else {
                passInput.type = 'password'
                toggle.classList.remove('fa-eye-slash')
                toggle.classList.add('fa-eye')
                console.log('password hidden')
            }
        })
    })
}
// document.addEventListener('DOMContentLoaded', setupPasswordToggles);

// For Showing and Hiding Menu on Small Screens
// this 
export function initMobileNav() {
    // // const menu = document.querySelector('.one-quater');
    // const bar = document.querySelector('.nav-bar');
    // const mediaMenu = document.querySelector('.media-menu');
    // bar.addEventListener('click', () => { 
    //     // menu.classList.toggle('active');
    //     mediaMenu.classList.toggle('active');
    //     console.log(mediaMenu.classList.contains('active') ? "menu opened" : "menu closed"); 
    //     // console.log('click')
    // });
    const btn = document.querySelector('.mobile-nav-btn');
    const menu = document.querySelector('.mobile-nav');
    if (!btn || !nav) return; // Exit if elements are not found
    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
        console.log(menu.classList.contains('active') ? "menu opened" : "menu closed");
    });
}
// nav();
