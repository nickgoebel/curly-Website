import "./assets/css/main.css";
import marquee from "https://cdn.jsdelivr.net/npm/vanilla-marquee/dist/vanilla-marquee.js";
import Alpine from "alpinejs";
import "./assets/js/cursorPointer";
import "./assets/js/breakText";
import "./assets/js/heroGsap";
import "./assets/js/clientGsap";
import "./assets/js/aboutGsap";
import "./assets/js/gallaryGsap";
import "./assets/js/ctaGsap";
import "./assets/js/footerGsap";

window.Alpine = Alpine;
Alpine.start();

// Inlude files
(() => {
  const includes = document.getElementsByTagName("include");
  [].forEach.call(includes, (i) => {
    let filePath = i.getAttribute("src");
    fetch(filePath).then((file) => {
      file.text().then((content) => {
        i.insertAdjacentHTML("afterend", content);
        i.remove();
      });
    });
  });
})();

new marquee(document.getElementById("marquee"), {
  direction: "right",
  duplicated: true,
  gap: 80,
  speed: 40,
  startVisible: true,
  delayBeforeStart: 1000,
  recalcResize: true,
  css3easing: "linear",
});

window.addEventListener("load", () => {
  const marquee2 = new marquee(document.getElementById("marquee2"), {
    direction: "right",
    duplicated: true,
    gap: 24,
    speed: 50,
    startVisible: true,
    delayBeforeStart: 1000,
    // Keep this false so GSAP controls the recalculation
    recalcResize: true,
    css3easing: "linear",
  });
});

// Ensure GSAP and plugins are registered first!
// gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// ----------------------------------------------------
// 1. CORE UTILITY FUNCTION (for extracting hash)
// ----------------------------------------------------
function getHashFromHref(href) {
  if (!href) return null;
  const hashIndex = href.indexOf("#");
  // Returns the hash including the '#', or null
  return hashIndex >= 0 ? href.substring(hashIndex) : null;
}

// ----------------------------------------------------
// 2. CORE LOGIC FUNCTION (Named 'goToAnchor' for consistency)
// ----------------------------------------------------
function goToAnchor(hash) {
  // 1. Get the current hash (or the hash passed from the click handler)
  const currentHash = hash || window.location.hash;

  // 2. Check the two conditions: Hash exists AND Element exists
  if (currentHash && document.querySelector(currentHash)) {
    // Target element found
    const targetElement = document.querySelector(currentHash);

    console.log(`Hash found: ${currentHash}. Attempting smooth scroll...`);

    // 3. CRITICAL STEP: Refresh ScrollTrigger
    ScrollTrigger.refresh(true);

    // 4. Trigger the smooth scroll
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: targetElement, // Use the element directly
        offsetY: 0, // Adjust this to your fixed header height
      },
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => {
        console.log(`Smooth scroll to ${currentHash} complete.`);
      },
    });
  } else if (currentHash) {
    console.warn(
      `Hash present: ${currentHash}, but target element not found in the document.`
    );
  }
}

// ----------------------------------------------------
// 3. INTERNAL CLICK HANDLER (On-page navigation)
// ----------------------------------------------------

// Keeps the internal navigation working smoothly when a link is clicked
const scrollLinks = gsap.utils.toArray(".contact");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = link.getAttribute("href") || link.getAttribute("data-href");
    const targetHash = getHashFromHref(target); // Use the utility function

    if (targetHash && document.querySelector(targetHash)) {
      e.preventDefault();

      // 🐛 FIX: Only update URL if we are on the same page, otherwise let the link do its job
      // For links like /#contact, this correctly updates the hash on the homepage
      if (target.startsWith("/") || target.startsWith("#")) {
        window.history.pushState({}, "", targetHash);
      }

      // Call the correct, defined function
      goToAnchor(targetHash);
    }
  });
});

// ----------------------------------------------------
// 4. EXTERNAL PAGE LOAD HANDLER (Arriving from another page)
// ----------------------------------------------------

// Execute on 'load' event
window.addEventListener("load", () => {
  // Check if a hash is present in the URL on load
  if (window.location.hash) {
    // Use a small delay and call the correct function
    gsap.delayedCall(0.3, goToAnchor, [window.location.hash]);
  }
});
