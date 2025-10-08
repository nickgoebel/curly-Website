import "./assets/css/main.css";
import Alpine from "alpinejs";
import "./assets/js/gallaryGsap";
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

// split Text into span:
document.addEventListener("DOMContentLoaded", function () {
  const breakTextElements = document.querySelectorAll(".breakText");
  breakTextElements.forEach((el) => {
    // Get the text content, trim it, and split into words
    const words = el.textContent.trim().split(/\s+/);
    // Map each word to a <mark> tag, and each character in a <span>
    const marked = words
      .map((word) => {
        const chars = word
          .split("")
          .map(
            (char) =>
              `<span class="inline-block overflow-hidden">${char}</span>`
          )
          .join("");
        return `<mark class="inline-block">${chars}</mark>`;
      })
      .join(" ");
    el.innerHTML = marked;
  });
});

// Heros
// Hero height Calculate Start
function updateHeroSpacer() {
  const hero = document.querySelector("#heroBox");
  const spacer = document.querySelector("#heroSpacer");
  if (hero && spacer) {
    spacer.style.height = `${hero.offsetHeight}px`;
  }
}

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
    trigger: "#heroBox",
    scroller: "body",
    start: "bottom 100%",
    end: "bottom 45%",
    scrub: 3,
    markers: false,
  },
});
//  heroBox GSAP End

//  client GSAP Start
gsap.to(".shadowClient", {
  opacity: 1,
  duration: 0.01,
  scrollTrigger: {
    trigger: "#client",
    scroller: "body",
    start: "bottom 100%",
    end: "bottom 65%",
    scrub: 3,
    markers: false,
  },
});
//  client GSAP End

// about box gsap start
setTimeout(() => {
  let tl = gsap.timeline();
  tl.from("#aboutBox .rotateText span", {
    y: 20,
    transform: "translate3d(10px,10px,10px) rotate(12deg)",
    opacity: 0,
    duration: 8,
    delay: 0.2,
    stagger: 1,
    scrollTrigger: {
      trigger: "#aboutBox .rotateText",
      scroller: "body",
      start: "bottom 100%",
      end: "bottom 60%",
      scrub: 1,
      markers: false,
    },
  }).from("#aboutBox .opacityText span", {
    opacity: 0,
    duration: 0,
    delay: 0,
    stagger: 1.5,
    scrollTrigger: {
      trigger: "#aboutBox .opacityText",
      scroller: "body",
      start: "bottom 100%",
      end: "bottom 60%",
      scrub: 1,
      markers: false,
    },
  });
}, 50);
// about box gsap End

// Gallary Animation Start
// gsap.to("#gallaryBox", {
//   scale: 1.5,
//   duration: 0.1,
//   transformOrigin: "center center",
//   scrollTrigger: {
//     trigger: "#gallary",
//     scroller: "body",
//     pin: "#gallaryBox", // Pin in place, centered
//     start: "bottom 80%",
//     end: "bottom -200%",
//     scrub: 2,
//     markers: false,
//     invalidateOnRefresh: true, // Recalculates values on refresh (including resize)
//   },
// });

// CTA Animation Start
setTimeout(() => {
  gsap.from("#ctaBox .rotateText span", {
    y: 20,
    // transform: "translate3d(10px,10px,10px) rotate(5deg)",
    opacity: 0,
    duration: 5,
    delay: 0.2,
    stagger: 1,
    scrollTrigger: {
      trigger: "#ctaBox .rotateText",
      scroller: "body",
      start: "bottom 100%",
      end: "bottom 60%",
      scrub: 2,
      markers: false,
    },
  });
}, 50);
// CTA Animation End

// Footer height Calculate Start
function updateFooterSpacer() {
  const footer = document.querySelector("#footer");
  const spacer = document.querySelector(".footer-spacer");
  if (footer && spacer) {
    spacer.style.height = `${footer.offsetHeight}px`;
  }
}

// Initial call to set the spacer height
updateFooterSpacer();

// Update spacer height on window resize
window.addEventListener("resize", updateFooterSpacer);
// Footer height Calculate End

// Cursor Desig Start
// English:
// When the mouse is over an element with a #C8FF00 background, the cursor color should change to #fff (white).
// Bangla:
// যখন মাউস #C8FF00 ব্যাকগ্রাউন্ডের উপরে যাবে, তখন কার্সরের রঙ #fff (সাদা) হয়ে যাবে।

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  // Default cursor color
  let defaultCursorColor = "#C8FF00";
  let hoverCursorColor = "#fff";

  // Style the cursor element
  Object.assign(cursor.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: defaultCursorColor,
    pointerEvents: "none",
    zIndex: "9999",
    transform: "translate(-50%, -50%) scale(1)",
    transition:
      "transform 0.2s cubic-bezier(.4,2,.6,1), width 0.2s, height 0.2s, opacity 0.2s, background 0.2s",
    display: "block",
    userSelect: "none",
    willChange: "transform,width,height,background",
  });

  // Hide the default cursor
  document.body.style.cursor = "none";

  // Track mouse movement
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Detect element under cursor
    const el = document.elementFromPoint(e.clientX, e.clientY);

    // Helper to get computed background color
    function getBgColor(element) {
      if (!element) return null;
      const bg = window.getComputedStyle(element).backgroundColor;
      return bg;
    }

    // Helper to get computed text color
    function getTextColor(element) {
      if (!element) return null;
      const color = window.getComputedStyle(element).color;
      return color;
    }

    // Convert rgb/rgba to hex
    function rgbToHex(rgb) {
      if (!rgb) return "";
      const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(rgb);
      if (!result) return "";
      return (
        "#" +
        (
          (1 << 24) +
          (parseInt(result[1]) << 16) +
          (parseInt(result[2]) << 8) +
          parseInt(result[3])
        )
          .toString(16)
          .slice(1)
          .toUpperCase()
      );
    }

    // Check if the element or its parents have #C8FF00 background or text color
    let foundC8FF00 = false;
    let current = el;
    while (current && current !== document.body) {
      const bg = getBgColor(current);
      const color = getTextColor(current);
      let bgHex = bg ? rgbToHex(bg) : "";
      let colorHex = color ? rgbToHex(color) : "";
      // English: If background or text color is #C8FF00, set foundC8FF00 true
      // Bangla: যদি ব্যাকগ্রাউন্ড বা টেক্সট কালার #C8FF00 হয়, তাহলে foundC8FF00 true হবে
      if (bgHex === "#C8FF00" || colorHex === "#C8FF00") {
        foundC8FF00 = true;
        break;
      }
      current = current.parentElement;
    }

    if (foundC8FF00) {
      cursor.style.background = hoverCursorColor;
    } else {
      cursor.style.background = defaultCursorColor;
    }
  });

  // Hide cursor when mouse leaves window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  // Helper functions for hover effect
  function growCursor() {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursor.style.width = "14px";
    cursor.style.height = "14px";
  }
  function shrinkCursor() {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.width = "12px";
    cursor.style.height = "12px";
  }

  // Attach listeners to all buttons and links
  function attachListeners() {
    const elements = [
      ...document.querySelectorAll("button, a, [role='button']"),
    ];
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        growCursor();
        // Remove pointer cursor on hover
        el.style.cursor = "none";
      });
      el.addEventListener("mouseleave", () => {
        shrinkCursor();
        // Restore pointer cursor after hover
        el.style.cursor = "";
      });
    });
  }
  attachListeners();

  // If buttons/links are dynamically added, re-attach
  const observer = new MutationObserver(attachListeners);
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor on touch devices
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  if (isTouchDevice()) {
    cursor.style.display = "none";
    document.body.style.cursor = "";
  }
});

// Cursor Design End

// gsap.to("#marquee2", {
//   scale: 3,
//   duration: 0.5,
//   transformOrigin: "center center",
//   scrollTrigger: {
//     trigger: "#marquee2",
//     scroller: "body",
//     pin: "#gallaryBox",
//     pinSpacing: false,
//     start: "top 50%",
//     end: "top -150%",
//     scrub: 2,
//     markers: true,

//     // Recommended solution for resize issues:
//     invalidateOnRefresh: true, // Recalculates values on refresh (including resize)
//     onRefresh: () => {
//       ScrollTrigger.refresh(true); // Forces a safe refresh after browser layout finishes
//     },
//   },
// });

// gsap.to("#gallaryBox #marquee2", {
//   scale: 3,
//   duration: 0.5,
//   transformOrigin: "center center",
//   scrollTrigger: {
//     trigger: "#gallaryBox",
//     scroller: "body",
//     pin: "#gallaryBox",
//     pinSpacing: false,
//     start: "top 10%",
//     end: "top -100%",
//     scrub: 2,
//     markers: true,
//   },
// });
