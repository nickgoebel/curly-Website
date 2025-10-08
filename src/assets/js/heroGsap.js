// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// window.gsap = gsap;

// English:
// Only proceed if there is an element with id "heroBox" in the DOM.
const heroBoxElement = document.getElementById("heroBox");
if (heroBoxElement) {
  // Heros
  // Hero height Calculate Start
  function updateHeroSpacer() {
    const hero = document.querySelector("#heroBox");
    const spacer = document.querySelector("#heroSpacer");
    if (hero && spacer) {
      spacer.style.height = `${hero.offsetHeight}px`;
    }
  }

  // This function updates the height of the #heroSpacer element to match the height of the #heroBox element.
  function handleHeroZIndex() {
    const heroBox = document.querySelector("#heroBox");
    if (!heroBox) return;
    // Check if the scroll position matches the heroBox's height
    if (window.scrollY > heroBox.offsetHeight) {
      // Add -z-10, remove z-10, add pointer-events-none, remove pointer-events-auto
      heroBox.classList.add("-z-100", "pointer-events-none");
      heroBox.classList.remove("z-10", "pointer-events-auto");
    } else {
      // Add z-10, remove -z-10, add pointer-events-auto, remove pointer-events-none
      heroBox.classList.remove("-z-100", "pointer-events-none");
      heroBox.classList.add("z-10", "pointer-events-auto");
    }
  }

  // Listen to scroll event
  window.addEventListener("scroll", handleHeroZIndex);

  // Initial call to set the spacer height
  updateHeroSpacer();

  // Update spacer height on window resize
  window.addEventListener("resize", updateHeroSpacer);
  // Footer height Calculate End

  //  heroBox GSAP Start
  gsap.to("#heroBox", {
    opacity: 0,
    scale: 1.02,
    duration: 0.01,
    scrollTrigger: {
      trigger: "#heroSpacer",
      scroller: "body",
      start: "bottom 85%",
      end: "bottom 60%",
      scrub: 1.2,
      markers: false,
    },
  });
  //  heroBox GSAP End
}
