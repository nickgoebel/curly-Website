//  client GSAP Start

if (document.querySelector(".shadowClient")) {
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
}

//  client GSAP End
