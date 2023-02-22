let burger = document.querySelector(".header__burger");
let html = document.querySelector(".html");

burger.onclick = function () {
  burger.classList.toggle("open");

  html.classList.toggle("scroll-hidden");
};

LottieScrollTrigger({
  target: "#animationWindow",
  path: "https://lottie.host/4acc2fee-e4c9-4ef1-bb0c-14b3b3e6b51b/7jVqkAD5kn.json",
  speed: "slow",
  scrub: 2, // seconds it takes for the playhead to "catch up"
  // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
});

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
    st = {
      trigger: target,
      pin: true,
      start: "top top",
      end: speeds[vars.speed] || "+=1000",
      scrub: 1,
    },
    ctx = gsap.context && gsap.context(),
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  for (let p in vars) {
    // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function () {
    let createTween = function () {
      animation.frameTween = gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st,
      });
      return () => animation.destroy && animation.destroy();
    };
    ctx && ctx.add ? ctx.add(createTween) : createTween();
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
  return animation;
}



// let mm = gsap.matchMedia();

// mm.add("(min-width: 800px)", () => {
//   gsap.to(".lottie", {
//     scale: 1,

//     duration: 100,

//     scrollTrigger: {
//       trigger: ".lottie",
//       start: "center 50%",
//       // end: "center 20%",
//       end: "+=200",
//       scrub: 0.5,
//       pin: true,
//       toggleActions: "restart none none none",
//       markers: false,
//     },
//   });
// });

// let player = document.getElementById("lottiesvg");

// player.addEventListener("ready", () => {
//   LottieInteractivity.create({
//     player: "#lottiesvg",
//     mode: "scroll",
//     // container: ".home__btn",
//     actions: [
//       {
//         visibility: [0.2, 1.0],
//         type: "seek",
//         frames: [0, 240],
//       },
//     ],
//   });
// });
