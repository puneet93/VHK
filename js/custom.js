$(document).ready(function () {
  var $mainVideoModal = $('#mainVideo');
  var $mainVideoIframe = $mainVideoModal.find('iframe');
  var mainVideoDefaultSrc = $mainVideoIframe.attr('src');
  var mainVideoAutoplaySrc = mainVideoDefaultSrc;

  if (mainVideoDefaultSrc && mainVideoDefaultSrc.indexOf('autoplay=1') === -1) {
    mainVideoAutoplaySrc += (mainVideoDefaultSrc.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1&mute=1';
  }

  $mainVideoModal.on('shown.bs.modal', function () {
    $mainVideoIframe.attr('src', mainVideoAutoplaySrc);
  });

  $mainVideoModal.on('hidden.bs.modal', function () {
    $mainVideoIframe.attr('src', mainVideoDefaultSrc);
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

  $('.proc-video-poster, .video-preview').each(function () {
    var $videoPoster = $(this);
    var $iframe = $videoPoster.find('iframe');
    var $button = $videoPoster.find('[data-play-video]');
    var defaultSrc = $iframe.attr('src');
    var autoplaySrc = defaultSrc;

    if (defaultSrc && defaultSrc.indexOf('autoplay=1') === -1) {
      autoplaySrc += (defaultSrc.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1&mute=1';
    }

    $button.on('click', function (event) {
      event.preventDefault();
      $iframe.attr('src', autoplaySrc);
      $videoPoster.addClass('is-playing');
    });
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


// --- SMOOTH ANCHOR LINKS (LENIS) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    
    // Ignore empty anchors like just "#"
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      // Tell Lenis to scroll smoothly to the target element
      lenis.scrollTo(targetElement, {
        offset: 0, // Adjust this if you have a sticky header (e.g., -80)
        duration: 1.2 // Optional scroll duration in seconds
      });
    }
  });
});




// --- RESPONSIVE GSAP: Desktop-only animations (768px and wider) ---
let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {

  // Horizontal Scroll Panel (.proc-preview)
  let sections = gsap.utils.toArray(".proc-panel"); 
  if(sections.length > 0) {
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
  }

  // Paragraph Fade-in animations
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

}); 
// --- END GSAP MATCHMEDIA ---

// --- SECTION: HISTORIE LOG (Runs on ALL screens: Mobile & Desktop) ---
let historySection = document.querySelector(".logos-historie");
let historyItems = gsap.utils.toArray(".historie-logo");

if (historySection) {
  gsap.to(historyItems, {
    x: () => -((historySection.scrollWidth - window.innerWidth) + (window.innerWidth > 1100 ? 500 : 100)), 
    ease: "none",
    scrollTrigger: {
      trigger: ".section-overlay-image",
      start: "top top",
      end: () => "+=" + historySection.scrollWidth,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });
}


// image compare
$(() => {
    var imagesCompareElement = $('.js-img-compare').imagesCompare();
    var imagesCompare = imagesCompareElement.data('imagesCompare');
    var events = imagesCompare.events();

    imagesCompare.on(events.changed, (event) => {
        if (event.ratio < 0.4) {
            console.log('We see more than half of the back image');
        }
        if (event.ratio > 0.6) {
            console.log('We see more than half of the front image');
        }

        if (event.ratio <= 0) {
            console.log('We see completely back image');
        }

        if (event.ratio >= 1) {
            console.log('We see completely front image');
        }
    });
    window.imagesCompareBindControls(imagesCompare);
});


// Tab System (Click-based, runs on all screens)
const tabs = document.querySelectorAll('.logotyp-tabs a');
const steps = document.querySelectorAll('.logotyp-step');

if(tabs.length > 0 && steps.length > 0) {
  let currentIndex = 0;
  let isAnimating = false; 

  gsap.set(steps[0], { display: 'block', autoAlpha: 1 });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      if (currentIndex === index || isAnimating) return;
      isAnimating = true;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false; 
        }
      });

      tl.to(steps[currentIndex], {
        duration: 0.3,
        autoAlpha: 0, 
        display: 'none', 
        ease: "power2.inOut"
      })
      .to(steps[index], {
        duration: 0.3,
        display: 'block', 
        autoAlpha: 1, 
        ease: "power2.inOut"
      });

      currentIndex = index;
    });
  });
}