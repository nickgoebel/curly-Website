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
