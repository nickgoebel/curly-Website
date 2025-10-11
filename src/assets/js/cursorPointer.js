/**
 * Custom Cursor Implementation - FINAL AND DEBOUNCED FIX (V5)
 * Adds a 500ms debounce/delay check for color contrast when the mouse stops moving.
 * MODIFIED to hide/show the cursor when the mouse leaves/enters the window.
 */
(function () {
  // 1. Configuration
  const DEFAULT_SIZE = "14px";
  const HOVER_SIZE = "20px";
  const DEFAULT_COLOR = "#C8FF00"; // The cursor's default color
  const CONTRAST_COLOR = "#FFFFFF"; // White for contrast
  const DEBOUNCE_DELAY = 350; // Check delay after mouse stops (in milliseconds)

  // Selectors for elements that trigger the HOVER SIZE change (Interactive)
  const HOVER_SIZE_SELECTORS = 'a, button, [role="button"], [onclick], [href]';

  // Selectors for ALL elements/containers that should trigger the COLOR CHECK
  const COLOR_CHECK_SELECTORS =
    'a, button, [role="button"], [onclick], [href], h1, h2, h3, h4, h5, h6, p, span, div, li, ul, section, header, footer, article, main, body, *';

  // 2. Utility Constants
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )})`
      : null;
  };

  const DEFAULT_RGB = hexToRgb(DEFAULT_COLOR).replace(/\s/g, "").toUpperCase();
  const TRANSPARENT_RGB = "RGBA(0,0,0,0)";
  let debounceTimer = null; // Variable to hold the timeout ID

  // 3. Create and Inject the Cursor Element
  const cursor = document.createElement("div");
  cursor.id = "customCursor";
  // MODIFICATION START: Removed '!hidden' and added a new class for opacity control
  cursor.className = "cursor cursor--hidden !hidden md:!block";
  // MODIFICATION END
  document.body.appendChild(cursor);

  // 4. Inject Necessary CSS
  const style = document.createElement("style");
  style.innerHTML = `
      body, ${COLOR_CHECK_SELECTORS} { cursor: none !important; }
      #customCursor {
          position: fixed; pointer-events: none; z-index: 9999; top: 0; left: 0;
          width: ${DEFAULT_SIZE}; height: ${DEFAULT_SIZE}; background-color: ${DEFAULT_COLOR};
          border-radius: 50%; transform: translate(-50%, -50%);
          /* MODIFICATION START: Added 'opacity' to the transition for smooth hiding/showing */
          transition: width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, opacity 0.2s ease-out;
          opacity: 1; /* Start with full opacity (will be overridden by .cursor--hidden) */
          /* MODIFICATION END */
      }
      /* MODIFICATION START: Added a new class to control visibility with opacity */
      .cursor--hidden {
          opacity: 0 !important;
      }
      /* MODIFICATION END */
      .cursor-hover { width: ${HOVER_SIZE} !important; height: ${HOVER_SIZE} !important; }
      .cursor-contrast { background-color: ${CONTRAST_COLOR} !important; }
    `;
  document.head.appendChild(style);

  // 5. Dynamic Color Check Logic
  const checkAncestorColor = (element) => {
    let currentElement = element;
    while (currentElement && currentElement.tagName !== "BODY") {
      const computedStyle = window.getComputedStyle(currentElement);

      const bgColor = computedStyle.backgroundColor
        .replace(/\s/g, "")
        .toUpperCase();
      const textColor = computedStyle.color.replace(/\s/g, "").toUpperCase();

      // Check Background Color
      if (bgColor !== TRANSPARENT_RGB && bgColor === DEFAULT_RGB) {
        return true;
      }

      // Check Text Color
      if (textColor === DEFAULT_RGB) {
        return true;
      }

      // Move up to the parent element
      currentElement = currentElement.parentElement;
    }

    // Final check on the body element
    if (currentElement && currentElement.tagName === "BODY") {
      if (
        window
          .getComputedStyle(currentElement)
          .backgroundColor.replace(/\s/g, "")
          .toUpperCase() === DEFAULT_RGB
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * Executes the size and color contrast checks.
   * This function is run on every mouse move AND after the debounce delay.
   */
  const runChecks = (clientX, clientY) => {
    // Hide/Show trick for accurate elementFromPoint
    cursor.style.display = "none";
    const targetElement = document.elementFromPoint(clientX, clientY);
    cursor.style.display = "block";

    if (!targetElement) return;

    // --- A. SIZE CHECK (Run instantly on move) ---
    const interactiveTarget = targetElement.closest(HOVER_SIZE_SELECTORS);
    if (interactiveTarget) {
      cursor.classList.add("cursor-hover");
    } else {
      cursor.classList.remove("cursor-hover");
    }

    // --- B. COLOR CONTRAST CHECK (Run instantly on move AND debounced) ---
    const colorTarget = targetElement; // Start check from the immediate element

    if (checkAncestorColor(colorTarget)) {
      cursor.classList.add("cursor-contrast");
    } else {
      cursor.classList.remove("cursor-contrast");
    }
  };

  // 6. Main Cursor Logic (Single mousemove listener with Debounce)
  document.addEventListener("mousemove", (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    // A. Update Cursor Position (Always instant)
    // MODIFICATION START: Adjusted transform to work correctly with initial state
    cursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
    // MODIFICATION END

    // B. Run Size and Initial Color Check (Always instant for responsiveness)
    runChecks(clientX, clientY);

    // C. Debounced Check (Run after 500ms pause)
    // 1. Clear previous timer
    clearTimeout(debounceTimer);

    // 2. Set a new timer to re-run the check after a pause
    debounceTimer = setTimeout(() => {
      // Re-run the checks to capture any slow-loading or delayed color changes
      runChecks(clientX, clientY);
    }, DEBOUNCE_DELAY);
  });

  // MODIFICATION START: Added event listeners for mouse entering and leaving the window
  // 7. Window Enter/Leave Logic
  document.addEventListener("mousemove", () => {
    cursor.classList.remove("cursor--hidden");
  });
  document.addEventListener("mouseenter", () => {
    cursor.classList.remove("cursor--hidden");
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.add("cursor--hidden");
  });
  // MODIFICATION END
})();
