// --- Global Constants and State ---
const MARQUEE_ID = "marquee2";
const MARQUEE_SPEED = 0.6; // pixels per frame (adjust for desired speed)

let animationFrameId = null;
let initialPosition = 0; // State variable for current X position, starts at 0 on page load
let originalContentWidth = 0;

// --- Utility Function to fix CSS layout ---

/**
 * Ensures marquee children are displayed inline and don't shrink, fixing overlap.
 * This is a common requirement when calculating true width for a horizontal marquee.
 * @param {HTMLElement[]} children - The array of original marquee items.
 */
function applyMarqueeStyles(children) {
  children.forEach((child) => {
    // Essential styles to make items sit side-by-side horizontally and not wrap
    child.style.display = "inline-flex";
    child.style.whiteSpace = "nowrap"; // Prevents text inside from wrapping
    child.style.flexShrink = "0"; // Prevents flex container from shrinking item width
  });
}

// --- Marquee Core Logic ---

/**
 * Initializes the DOM by calculating width, duplicating content, and setting initial position.
 * This function loads the position from the data attribute if it exists,
 * allowing for state retention across soft DOM updates (like re-running the script).
 */
function initMarqueeDOM() {
  const marquee = document.getElementById(MARQUEE_ID);
  if (!marquee) return;

  // 1. Load initial position from data attribute
  // This allows the marquee to resume from its current position if initMarqueeDOM is called again
  const storedX = parseFloat(marquee.getAttribute("data-translate-x"));
  initialPosition = isNaN(storedX) ? 0 : storedX;

  // Get the previously stored count of original items, or use the current count if first run.
  const originalCountAttribute = marquee.getAttribute("data-original-count");
  let originalChildrenCount = marquee.children.length;

  if (originalCountAttribute) {
    originalChildrenCount = parseInt(originalCountAttribute, 10);
  } else {
    marquee.setAttribute("data-original-count", originalChildrenCount);
  }

  // Remove any existing duplicates (items past the original count)
  while (marquee.children.length > originalChildrenCount) {
    marquee.removeChild(marquee.lastChild);
  }

  // Create an array of only the original children for accurate measurement
  const originalChildren = Array.from(marquee.children);

  // Apply necessary layout styles to the children to prevent overlapping/stacking
  applyMarqueeStyles(originalChildren);

  // 2. Calculate original content width
  // Reset position temporarily to 0 to get accurate width before cloning
  marquee.style.transform = "translateX(0px)";

  // Ensure the marquee container itself is set up for horizontal content
  marquee.style.display = "flex";
  marquee.style.flexDirection = "row";

  // Get the width of all children combined, accounting for margins
  let totalWidth = 0;
  originalChildren.forEach((child) => {
    const style = getComputedStyle(child);
    // Calculate margin for accurate item width
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    // Use offsetWidth which includes padding and border
    totalWidth += child.offsetWidth + margin;
  });

  // Set the width of the inner content wrapper to the full width of the original content
  marquee.style.width = `${totalWidth}px`;
  originalContentWidth = totalWidth;

  // 3. Duplicate content for seamless looping (no gap)
  const fragment = document.createDocumentFragment();
  originalChildren.forEach((child) => {
    const clone = child.cloneNode(true);
    // Apply styles to the clone as well, although the parent flex container should handle it.
    applyMarqueeStyles([clone]);
    fragment.appendChild(clone);
  });
  marquee.appendChild(fragment);

  // 4. Apply the loaded position
  marquee.style.transform = `translateX(${initialPosition}px)`;
  marquee.setAttribute("data-translate-x", initialPosition);

  console.log(
    `Marquee initialized. Original width: ${originalContentWidth}px. Starting X: ${initialPosition}px`
  );
}

/**
 * Main animation loop using requestAnimationFrame.
 */
function animateMarquee() {
  const marquee = document.getElementById(MARQUEE_ID);

  if (!marquee || originalContentWidth === 0) {
    // Continue trying to animate if the marquee isn't ready yet
    animationFrameId = requestAnimationFrame(animateMarquee);
    return;
  }

  // Get current position from the data attribute (for consistency and external update resilience)
  let x = parseFloat(marquee.getAttribute("data-translate-x")) || 0;

  // 1. Update position
  x -= MARQUEE_SPEED;

  // 2. Check for seamless looping reset
  // Reset when the content has scrolled past the width of the original content.
  if (x <= -originalContentWidth) {
    x = 0;
  }

  // 3. Apply and store the new position
  marquee.style.transform = `translateX(${x}px)`;
  marquee.setAttribute("data-translate-x", x);

  // Continue the loop
  animationFrameId = requestAnimationFrame(animateMarquee);
}

/**
 * Stops any existing animation and starts the initialization and animation process.
 */
function startMarquee() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  initMarqueeDOM();
  animateMarquee();
}

// --- Main Execution ---
// Starts the marquee when the window content is fully loaded.
window.onload = startMarquee;
