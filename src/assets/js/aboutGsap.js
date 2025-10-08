setTimeout(() => {
  // If #aboutBox does not exist, return
  if (!document.querySelector("#aboutBox")) return;
  let tl = gsap.timeline();
  tl.from("#aboutBox .rotateText span", {
    y: 15,
    // transform: "translate3d(10px,10px,10px) rotate(12deg)",
    opacity: 0,
    duration: 10,
    delay: 0.5,
    stagger: 3,
    scrollTrigger: {
      trigger: "#aboutBox .rotateText",
      scroller: "body",
      start: "bottom 95%",
      end: "bottom 75%",
      scrub: 3,
      markers: false,
    },
  }).from("#aboutBox .opacityText span", {
    opacity: 0.2,
    duration: 0.1,
    delay: 0.2,
    stagger: 1,
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
