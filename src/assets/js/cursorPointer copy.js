// English:
// Custom cursor: default color is #C8FF00. If the background color under the mouse is #C8FF00, cursor turns white.

document.addEventListener("DOMContentLoaded", () => {
  const cursorDiv = document.createElement("div");
  cursorDiv.id = "cursor";
  cursorDiv.className = "z-9999999";
  document.body.appendChild(cursorDiv);

  const cursor = document.getElementById("cursor");

  // Default cursor color
  const defaultCursorColor = "#C8FF00";
  const hoverCursorColor = "#fff";

  // Style the cursor element
  Object.assign(cursor.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: defaultCursorColor,
    pointerEvents: "none",
    zIndex: "999999",
    transform: "translate(-50%, -50%) scale(1)",
    transition:
      "transform 0.2s cubic-bezier(.4,2,.6,1), width 0.2s, height 0.2s, opacity 0.2s, background 0.2s",
    display: "block",
    userSelect: "none",
    willChange: "transform,width,height,background",
    // mixBlendMode: "color-dodge",
  });

  // Hide the default cursor
  document.body.style.cursor = "none";

  // Helper: Convert rgb/rgba to hex
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

    // Check if the element or its parents have #C8FF00 background
    let foundC8FF00 = false;
    let current = el;
    while (current && current !== document.body) {
      const bg = getBgColor(current);
      let bgHex = bg ? rgbToHex(bg) : "";
      // If background color is #C8FF00, set foundC8FF00 true
      if (bgHex === "#C8FF00") {
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
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  }
  function shrinkCursor() {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.width = "14px";
    cursor.style.height = "14px";
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

// বাংলা:
// কাস্টম কার্সর: ডিফল্ট রঙ #C8FF00। যদি মাউসের নিচে ব্যাকগ্রাউন্ড রঙ #C8FF00 হয়, কার্সর সাদা হয়ে যাবে।
