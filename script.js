let burger = document.querySelector(".header__burger");
let html = document.querySelector(".html");

burger.onclick = function () {
  burger.classList.toggle("open");

  html.classList.toggle("scroll-hidden");
};

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".home__svg", {
    scale: 1.5,

    duration: 100,

    scrollTrigger: {
      trigger: ".home__svg",
      start: "center 50%",
      // end: "center 20%",
      end: "+=200",
      scrub: 0.5,
      pin: true,
      toggleActions: "restart none none none",
      markers: false,
    },
  });
});
