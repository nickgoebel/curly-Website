// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// window.gsap = gsap;

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
  if (window.gsap && window.gsap.getTweensOf(gallary).length) {
    gsap.killTweensOf(gallary);
  }
  if (window.gsap && window.gsap.ScrollTrigger) {
    const trigger = ScrollTrigger.getById("gallary-scale");
    if (trigger) {
      trigger.kill();
    }
  }

  // --- MANUAL SCALE CALCULATION ---

  // a. Get the initial unscaled height of the element
  // We use getBoundingClientRect().height for the most accurate height
  const initialHeight = gallary.getBoundingClientRect().height;

  // b. Get the target height (100vh)
  const targetHeight = window.innerHeight;

  // c. Calculate the maximum scale factor
  // Add a small buffer (e.g., 0.999) to ensure it never visibly exceeds the edge
  const maxScale = (targetHeight / initialHeight) * 0.999;

  // Log the calculated value for debugging
  console.log(
    `Initial Height: ${initialHeight.toFixed(
      2
    )}px, Target Height (100vh): ${targetHeight}px`
  );
  console.log(`Calculated Max Scale: ${maxScale.toFixed(4)}`);
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
      invalidateOnRefresh: true,
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
  if (window.gsap && window.gsap.ScrollTrigger) {
    window.gsap.ScrollTrigger.refresh();
  }
});

// setTimeout(() => {
//   const gallary = document.querySelectorAll("#marquee2");
//   if (!document.querySelector("#gallaryBox")) return;

//   gsap.to(gallary, {
//     scale: 2.8,
//     ease: "none", // A linear ease is best for scrub animations
//     yoyo: true, // This makes the animation reverse when it's done
//     repeat: 1, // Play it once forward, and repeat once (in reverse)
//     transformOrigin: "center center",
//     scrollTrigger: {
//       trigger: "#gallaryBox",
//       scroller: "body",
//       pin: "#gallaryBox",
//       start: "top top", // A more standard starting point
//       end: "+=300%", // Makes the scroll duration equal to 100% of the viewport height
//       scrub: 2, // A direct 1-to-1 scrub is often smoother
//       markers: false,
//       invalidateOnRefresh: true,
//     },
//   });
// }, 50);

// Gallary Animation Start
// setTimeout(() => {
//   // Select all the items you want to animate
//   const gallaryItem = document.querySelectorAll(".gallaryItem");
//   if (!document.querySelector("#gallaryBox")) return;

//   // Animate the items
//   gsap.to(gallaryItem, {
//     height: "100vh", // The peak value of the animation
//     ease: "none", // A linear ease is best for scrub animations
//     yoyo: true, // This makes the animation reverse when it's done
//     repeat: 1, // Play it once forward, and repeat once (in reverse)
//     scrollTrigger: {
//       trigger: "#gallaryBox",
//       scroller: "body",
//       pin: "#gallaryBox",
//       start: "top top", // A more standard starting point
//       end: "+=300%", // Makes the scroll duration equal to 100% of the viewport height
//       scrub: 2, // A direct 1-to-1 scrub is often smoother
//       markers: false,
//       invalidateOnRefresh: true,
//     },
//   });

//   window.addEventListener("resize", () => {
//     if (window.gsap && window.gsap.ScrollTrigger) {
//       window.gsap.ScrollTrigger.refresh();
//     }
//   });
// }, 50);
