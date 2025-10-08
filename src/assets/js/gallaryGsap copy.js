// Function to calculate the max scale factor and setup the GSAP animation
function setupGallaryAnimation() {
  // 1. Select the elements
  const gallary = document.querySelector("#marquee2");
  const gallaryBox = document.querySelector("#gallaryBox");

  if (!gallary || !gallaryBox) {
    console.error("Required elements #gallary or #gallaryBox not found.");
    return;
  }

  // 2. Clear any existing ScrollTrigger animation before re-creating it
  // This is crucial for cleanup during window resize/refresh
  //   if (window.gsap && window.gsap.getTweensOf(gallary).length) {
  //     gsap.killTweensOf(gallary);
  //   }
  //   if (window.gsap && window.gsap.ScrollTrigger) {
  //     const trigger = ScrollTrigger.getById("gallary-scale");
  //     if (trigger) {
  //       trigger.kill();
  //     }
  //   }

  // --- MANUAL SCALE CALCULATION ---

  // a. Get the initial unscaled height of the element
  // We use getBoundingClientRect().height for the most accurate height
  const initialHeight = gallary.getBoundingClientRect().height;

  // b. Get the target height (100vh)
  const targetHeight = window.innerHeight;

  // c. Calculate the maximum scale factor
  // Add a small buffer (e.g., 0.999) to ensure it never visibly exceeds the edge
  const maxScale = (targetHeight / initialHeight) * 1;

  // ---------------------------------

  // 3. Setup the GSAP Animation with the calculated scale
  gsap.to(gallary, {
    scale: maxScale, // Use the calculated scale here!
    ease: "none",
    yoyo: true,
    repeat: 1,
    transformOrigin: "center center",
    scrollTrigger: {
      id: "gallary-scale", // Give the trigger an ID for easy killing/cleanup
      trigger: "#gallaryBox",
      scroller: "body",
      pin: "#gallaryBox",
      start: "top top",
      end: "+=300%",
      scrub: 2,
      markers: false,
      // invalidateOnRefresh is now handled by re-running this function on resize
      invalidateOnRefresh: false,
      refreshPriority: 0,
    },
  });
}

// Initial setup after a small delay to ensure all elements are rendered
setTimeout(setupGallaryAnimation, 50);

// Setup the window resize listener
window.addEventListener("resize", () => {
  // Re-run the setup function on resize.
  // This recalculates 'maxScale' and re-initializes the GSAP animation.
  //   setupGallaryAnimation();
  // Also refresh ScrollTrigger
  //   if (window.gsap && window.gsap.ScrollTrigger) {
  //     window.gsap.ScrollTrigger.refresh(false);
  //   }
});
