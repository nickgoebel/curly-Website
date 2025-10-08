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
