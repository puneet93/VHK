$(document).ready(function () {

  var swiperLeg = new Swiper(".legendy-swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-legendy-right",
      prevEl: ".swiper-legendy-left",
    }
  });

  var swiperFanou = new Swiper(".fanou-swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-fanou-right",
      prevEl: ".swiper-fanou-left",
    }
  });
  
});


// animation
gsap.registerPlugin(ScrollTrigger);

// 1. HLADKÝ SCROLL (Lenis)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


let sections = gsap.utils.toArray(".proc-panel"); 
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".proc-preview",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".proc-preview").offsetWidth
  }
});


// 3. LOGOTYP (Animace podle videa - Zoom a odhalení)
// const tlLogotyp = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".logotyp",
//     start: "top top",
//     end: "+=2000", // Délka trvání animace při scrollování
//     pin: true,
//     scrub: 1,
//   }
// });

// tlLogotyp
//   .from(".logotyp-brand img", { scale: 0.5, opacity: 0, duration: 1 })
//   .from(".logotyp-tabs", { x: -100, opacity: 0, duration: 0.5 }, "-=0.2")
//   .from(".logotyp-brand-zoom", { x: -100, opacity: 0, duration: 0.5 }, "-=0.2")
//   .from(".logotyp-content p", { y: 50, stagger: 0.2, opacity: 0 });
const tlLogotyp = gsap.timeline({
  scrollTrigger: {
    trigger: ".logotyp",
    start: "center center",
    end: "+=3000", 
    pin: true,
    scrub: 1,
  }
});

tlLogotyp
  .from(".logotyp-brand img", { 
    scale: 0.5, 
    opacity: 0, 
    duration: 1 
  })

  .from(".logotyp-content p", { 
    y: 50, 
    stagger: 0.2, 
    opacity: 0, 
    duration: 0.8 
  })

  // 3. TRANSITION: Hide tabs, Show Zoom, and Change Background
  .to(".logotyp-tabs", { 
    opacity: 0, 
    y: -20, 
    pointerEvents: "none",
    duration: 0.5 
  }, "+=0.5") 
  
  .to(".logotyp", { 
    backgroundColor: "#fff",
    duration: 0.8 
  }, "<")
  
  .from(".logotyp-brand-zoom", { 
    scale: 0.8,
    x: -50, 
    opacity: 0, 
    duration: 0.8 
  }, "<");

// --- SECTION: HISTORIE LOG ---
let historySection = document.querySelector(".logos-historie");
let historyItems = gsap.utils.toArray(".historie-logo");

gsap.to(historyItems, {
  x: () => -((historySection.scrollWidth - window.innerWidth) + (window.innerWidth > 1100 ? 500 : 100)), 
  ease: "none",
  scrollTrigger: {
    trigger: ".section-overlay-image",
    start: "top top",
    end: () => "+=" + historySection.scrollWidth,
    // pin: ".section-historie .container", // Pin the container inside
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  }
});

// --- SECTION: DRESSING (With Sticky BG) ---
let dressSection = document.querySelector(".dress-images");
let dressItems = gsap.utils.toArray(".dress");

gsap.to(dressItems, {
  x: () => -((dressSection.scrollWidth - window.innerWidth) + (window.innerWidth > 1100 ? 150 : 30)),
  ease: "none",
  scrollTrigger: {
    trigger: ".section-dressing",
    start: "center center",
    end: () => "+=" + (dressSection.scrollWidth + 500),
    pin: true, // Pins the entire overlay section including the BG
    scrub: 1,
    invalidateOnRefresh: true,
  }
});

// 5. JEDNOTLIVÉ PRVKY (Fade-in a slide-up)
gsap.utils.toArray('p').forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});


gsap.utils.toArray("[data-fade]").forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    }
  });
});
