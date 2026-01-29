$(document).ready(function () {
  var swiper = new Swiper(".swiper-historie", {
    slidesPerView: "auto",
    spaceBetween: 24
  });

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


// 2. PROC-PREVIEW (Pin a Horizontální scroll)
// Obalte obsah .proc-preview do divu .horizontal-wrapper, pokud chcete více panelů
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
    end: "+=3000", // Increased duration to make the transition feel smooth
    pin: true,
    scrub: 1,
  }
});

tlLogotyp
  // 1. Initial appearance of the logo
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
  
  // 2. Show the tabs initially
  // .from(".logotyp-tabs", { 
  //   y: 20, 
  //   opacity: 0, 
  //   duration: 0.5 
  // })

  // 3. TRANSITION: Hide tabs, Show Zoom, and Change Background
  // We use the same label or offset ("reveal") to make them happen at once
  .to(".logotyp-tabs", { 
    opacity: 0, 
    y: -20, 
    pointerEvents: "none", // Prevent clicking while hidden
    duration: 0.5 
  }, "+=0.5") // Small pause before transition
  
  .to(".logotyp", { 
    backgroundColor: "#fff", // Your brand dark green or any color
    duration: 0.8 
  }, "<") // Start at the same time as the tabs hiding
  
  .from(".logotyp-brand-zoom", { 
    scale: 0.8,
    x: -50, 
    opacity: 0, 
    duration: 0.8 
  }, "<"); // Start at the same time as the background change

// 4. DRESSING (Pin a Horizontální scroll)
let dresses = gsap.utils.toArray(".dress");

gsap.to(dresses, {
  xPercent: -100 * (dresses.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".section-dressing",
    pin: true,
    scrub: 1,
    start: "center center",
    end: () => "+=" + document.querySelector(".dress-images").scrollWidth
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
