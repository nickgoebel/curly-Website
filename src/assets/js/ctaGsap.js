// CTA Animation Start
setTimeout(() => {
  let tl = gsap.timeline();
  tl.from("#ctaBox .rotateText span", {
    y: 15,
    opacity: 0,
    duration: 5,
    delay: 0.5,
    stagger: 3,
    scrollTrigger: {
      trigger: "#ctaBox .rotateText",
      scroller: "body",
      start: "bottom 100%",
      end: "bottom 75%",
      scrub: 3,
      markers: false,
    },
  }).from("#ctaButton", {
    opacity: 0,
    duration: 0.1,
    delay: 8,
    stagger: 1,
    scrollTrigger: {
      trigger: "#ctaBox",
      scroller: "body",
      start: "bottom 100%",
      end: "bottom 60%",
      scrub: 1,
      markers: false,
    },
  });
}, 50);
// CTA Animation End
