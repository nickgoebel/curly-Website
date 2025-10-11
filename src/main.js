import "./assets/css/main.css";
import marquee from "https://cdn.jsdelivr.net/npm/vanilla-marquee/dist/vanilla-marquee.js";
import SuperMarquee from "sp-supermarquee";
import Alpine from "alpinejs";
import "./assets/js/cursorPointer";
import "./assets/js/breakText";
import "./assets/js/heroGsap";
import "./assets/js/clientGsap";
import "./assets/js/aboutGsap";
import "./assets/js/gallaryGsap";
import "./assets/js/ctaGsap";
import "./assets/js/footerGsap";
// import "./assets/js/marquee";
// import videojs from "video.js";
// window.videojs = videojs;

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

// window.addEventListener("load", () => {
//   const marquee2 = new marquee(document.getElementById("marquee2"), {
//     direction: "right",
//     duplicated: true,
//     gap: 24,
//     speed: 50,
//     startVisible: true,
//     delayBeforeStart: 1000,
//     // Keep this false so GSAP controls the recalculation
//     recalcResize: true,
//     css3easing: "linear",
//   });
// });

// ------------
// Marquee Start
// ------------
(function () {
  let item = `<img src="./assets/images/gallary/Dennis-WM-Sieg.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/DS17-Fahnenträger.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Final-8.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Frimpong.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/IconLeague-Season2.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Kawhi.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Lewis.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Reus.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Streamingwoche.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Toni Kroos.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">
                            <img src="./assets/images/gallary/Schalke_200K 3.png" alt=""
                                class="w-[362px] object-contain mx-3 gallaryItem">`;
  let elm = document.getElementById("marquee2");
  setTimeout(() => {
    const mySuperMarquee = new SuperMarquee(elm, {
      content: item,
    });
  }, 20);
})();

(function () {
  let item = `  <img src="./assets/images/clients/AVIS1on.png" alt="" class="w-[206px] md:w-[236px] mx-10 self-center">
                            <img src="./assets/images/clients/DS17.png" alt="" class="w-[131px] md:w-[161px] mx-10 self-center">
                            <img src="./assets/images/clients/Logo_SEABOB_W.png" alt="" class="w-[275px] md:w-[305px] mx-10 self-center">
                            <img src="./assets/images/clients/Ultimate_Dropz_Logo_WS (2).png" alt=""
                                class="w-[100px] md:w-[130px] mx-10 self-center">
                            <img src="./assets/images/clients/fanatics-licensing-management-schalke-logo.png" alt=""
                                class="w-[47px] md:w-[77px] mx-10 self-center">
                            <img src="./assets/images/clients/TIL-logo-composite-1c-standard-RGB.png" alt=""
                                class="w-[148px] md:w-[178px] mx-10 self-center">
                            <img src="./assets/images/clients/Lewis-Hamilton-Logo-WHITE.png" alt=""
                                class="w-[114px] md:w-[144px] mx-10 self-center">
                            <img src="./assets/images/clients/Logo-White.png" alt="" class="w-[60px] md:w-[90px] mx-10 self-center">

                            <!-- Duplicate -->
                            <img src="./assets/images/clients/AVIS1on.png" alt="" class="w-[206px] md:w-[236px] mx-10 self-center">
                            <img src="./assets/images/clients/DS17.png" alt="" class="w-[131px] md:w-[161px] mx-10 self-center">
                            <img src="./assets/images/clients/Logo_SEABOB_W.png" alt="" class="w-[275px] md:w-[305px] mx-10 self-center">
                            <img src="./assets/images/clients/Ultimate_Dropz_Logo_WS (2).png" alt=""
                                class="w-[100px] md:w-[130px] mx-10 self-center">
                            <img src="./assets/images/clients/fanatics-licensing-management-schalke-logo.png" alt=""
                                class="w-[47px] md:w-[77px] mx-10 self-center">
                            <img src="./assets/images/clients/TIL-logo-composite-1c-standard-RGB.png" alt=""
                                class="w-[148px] md:w-[178px] mx-10 self-center">
                            <img src="./assets/images/clients/Lewis-Hamilton-Logo-WHITE.png" alt=""
                                class="w-[114px] md:w-[144px] mx-10 self-center">
                            <img src="./assets/images/clients/Logo-White.png" alt="" class="w-[60px] md:w-[90px] mx-10 self-center">`;
  let elm = document.getElementById("marquee");
  setTimeout(() => {
    const mySuperMarquee = new SuperMarquee(elm, {
      content: item,
    });
  }, 20);
})();
// Marquee End
// ------------

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

// // Autoplay all video elements on the page when DOM is ready
// // Import video.js if available via global script tag (skip here, but assume it's loaded)
// // Autoplay all video elements using video.js (if available), with buffering behavior

// document.addEventListener("DOMContentLoaded", () => {
//   // Find all video elements (with/without video.js initialized)
//   const videos = document.querySelectorAll("video");

//   videos.forEach((video) => {
//     video.oncanplay = function () {
//       video.play();
//     };
//     // If video.js is available, initialize player
//     if (window.videojs) {
//       // If not already initialized
//       let player;
//       if (!video.player) {
//         player = window.videojs(video, {
//           autoplay: true,
//           controls: true,
//           preload: "auto",
//         });
//         video.player = player;
//       } else {
//         player = video.player;
//       }
//       // Try play via video.js API
//       player.ready(function () {
//         try {
//           player.play();
//         } catch (err) {
//           // Autoplay might be blocked by browser
//         }
//       });
//     } else {
//       // Native video fallback: try autoplay and preload
//       video.autoplay = true;
//       video.preload = "auto";
//       const playPromise = video.play();
//       if (playPromise && typeof playPromise.then === "function") {
//         playPromise.catch(() => {}); // Ignore if blocked
//       }
//     }
//   });
// });
// Find all video elements on the page
const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  // IMPORTANT: For autoplay to work reliably in most modern browsers (Chrome, Firefox, Safari),
  // the video must be muted.
  video.muted = true;

  // This tells the browser it can start downloading video data as soon as possible.
  // This is key for "buffer play".
  video.preload = "auto";

  // Set up an event listener to play the video as soon as it can be played
  video.oncanplay = function () {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Video playback started successfully.");
        })
        .catch((err) => {
          // Autoplay was prevented. This is common if the video isn't muted or the user
          // hasn't interacted with the page yet.
          console.error("Video autoplay was blocked by the browser:", err);
          // You could optionally show a custom play button here to let the user start it manually.
        });
    }
  };
});
