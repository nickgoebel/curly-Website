// Configurable constants
const GALLARY_CONFIG = {
  baseScale: 1.0,
  minHeight: 824,
  maxHeight: 1648,
  minScale: 1.5,
  maxScale: 3.2,
  minPercent: 83,
  maxPercent: 67,
  pinEnd: "bottom -200%",
  markers: true, // Set to false in production
};

let gallaryScrollTrigger = null;

// Utility
function lerp(min, max, t) {
  return min + (max - min) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getResponsiveScale() {
  const h = window.innerHeight;
  const { baseScale, minHeight, maxHeight, minScale, maxScale } =
    GALLARY_CONFIG;
  if (h <= minHeight) return { baseScale, maxScale: minScale };
  if (h >= maxHeight) return { baseScale, maxScale };
  const t = (h - minHeight) / (maxHeight - minHeight);
  const scale = lerp(minScale, maxScale, t);
  return { baseScale, maxScale: clamp(scale, minScale, maxScale) };
}

function getResponsiveStart() {
  const h = window.innerHeight;
  const { minHeight, maxHeight, minPercent, maxPercent } = GALLARY_CONFIG;
  if (h <= minHeight) return `bottom ${minPercent}%`;
  if (h >= maxHeight) return `bottom ${maxPercent}%`;
  const t = (h - minHeight) / (maxHeight - minHeight);
  const percent = lerp(minPercent, maxPercent, t);
  return `bottom ${clamp(percent, maxPercent, minPercent)}%`;
}

// Create the ScrollTrigger once; only refresh on resize
function initGallary() {
  const { baseScale, maxScale } = getResponsiveScale();
  const gallaryBox = document.querySelector("#gallaryBox");
  if (!gallaryBox) return;

  // If already initialized, just refresh (no re-create, avoids extra wrappers)
  if (gallaryScrollTrigger) {
    if (window.gsap && window.gsap.ScrollTrigger) {
      window.gsap.ScrollTrigger.refresh();
    }
    return;
  }

  // Initial state
  gsap.set(gallaryBox, { scale: baseScale, transformOrigin: "center center" });

  gallaryScrollTrigger = gsap.fromTo(
    gallaryBox,
    { scale: baseScale, transformOrigin: "center center" },
    {
      scale: maxScale,
      duration: 0.5,
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: "#gallary",
        scroller: "body",
        pin: "#gallaryBox",
        start: getResponsiveStart(),
        end: GALLARY_CONFIG.pinEnd,
        scrub: true,
        markers: GALLARY_CONFIG.markers,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const { baseScale, maxScale } = getResponsiveScale();
          const up = baseScale + (maxScale - baseScale) * (progress * 2);
          const down =
            maxScale - (maxScale - baseScale) * ((progress - 0.5) * 2);
          const scaleValue = progress < 0.5 ? up : down;
          gsap.set(gallaryBox, {
            scale: scaleValue,
            transformOrigin: "center center",
          });
        },
        onRefresh: () => {
          const { baseScale } = getResponsiveScale();
          gsap.set(gallaryBox, {
            scale: baseScale,
            transformOrigin: "center center",
          });
        },
      },
    }
  );
}

// Init once
initGallary();

// Debounced resize: only refresh, don't recreate
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.gsap && window.gsap.ScrollTrigger) {
      window.gsap.ScrollTrigger.refresh();
    }
  }, 120);
});
