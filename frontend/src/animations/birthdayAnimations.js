import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, Flip);

export function initBirthdayAnimations() {
  const container = document.querySelector("#birthday-container");

  if (!container) {
    return () => {};
  }

  /*
  ==========================================
  LENIS
  ==========================================
  */

  const lenis = new Lenis();

  const updateScrollTrigger = () => {
    ScrollTrigger.update();
  };

  lenis.on("scroll", updateScrollTrigger);

  const tickerFunction = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerFunction);

  gsap.ticker.lagSmoothing(0);

  /*
  ==========================================
  COLORS
  ==========================================
  */

  const lightColor = "#edf1e8";
  const darkColor = "#101010";

  function interpolateColor(color1, color2, factor) {
    return gsap.utils.interpolate(color1, color2, factor);
  }

  /*
  ==========================================
  HERO TEXT
  ==========================================
  */

  const heroParagraphs = gsap.utils.toArray(".hero h1 p");

  gsap.set(heroParagraphs, {
    opacity: 0,
  });

  gsap.to(heroParagraphs, {
    opacity: 1,
    duration: 1,
    delay: 0.3,
    y: -100,
    stagger: 0.2,

    scrollTrigger: {
      trigger: ".hero",
      start: "top center",
      end: "+=200%",
    },
  });

  /*
  ==========================================
  MARQUEE MOVEMENT
  ==========================================
  */

  gsap.to(".marquee-images", {
    scrollTrigger: {
      trigger: ".marquee",

      start: "top bottom",
      end: "top top",

      scrub: true,

      onUpdate: (self) => {
        const progress = self.progress;

        const xPosition = -75 + progress * 25;

        gsap.set(".marquee-images", {
          x: `${xPosition}%`,
        });
      },
    },
  });

  /*
  ==========================================
  PINNED MARQUEE IMAGE
  ==========================================
  */

  let pinnedMarqueeImgClone = null;
  let isImgCloneActive = false;

  function createPinnedMarqueeImgClone() {
    if (isImgCloneActive) return;

    const originalMarqueeImg = document.querySelector(
      ".marquee-img.pin img"
    );

    if (!originalMarqueeImg) return;

    const rect = originalMarqueeImg.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    pinnedMarqueeImgClone = originalMarqueeImg.cloneNode(true);

    gsap.set(pinnedMarqueeImgClone, {
      position: "fixed",

      left: centerX - originalMarqueeImg.offsetWidth / 2 + "px",

      top: centerY - originalMarqueeImg.offsetHeight / 2 + "px",

      width: originalMarqueeImg.offsetWidth + "px",

      height: originalMarqueeImg.offsetHeight + "px",

      transform: "rotate(-5deg)",

      transformOrigin: "center center",

      pointerEvents: "none",

      willChange: "transform",

      zIndex: 100,
    });

    document.body.appendChild(pinnedMarqueeImgClone);

    gsap.set(originalMarqueeImg, {
      opacity: 0,
    });

    isImgCloneActive = true;
  }

  function removePinnedMarqueeImgClone() {
    if (!isImgCloneActive) return;

    if (pinnedMarqueeImgClone) {
      pinnedMarqueeImgClone.remove();

      pinnedMarqueeImgClone = null;
    }

    const originalMarqueeImg = document.querySelector(
      ".marquee-img.pin img"
    );

    if (originalMarqueeImg) {
      gsap.set(originalMarqueeImg, {
        opacity: 1,
      });
    }

    isImgCloneActive = false;
  }

  /*
  ==========================================
  HORIZONTAL SCROLL PIN
  ==========================================
  */

  ScrollTrigger.create({
    trigger: ".horizontal-scroll",

    start: "top top",

    end: () => `${window.innerHeight * 5}`,

    pin: true,
  });

  /*
  ==========================================
  MARQUEE PIN TRIGGER
  ==========================================
  */

  ScrollTrigger.create({
    trigger: ".marquee",

    start: "top top",

    onEnter: createPinnedMarqueeImgClone,

    onEnterBack: createPinnedMarqueeImgClone,

    onLeaveBack: removePinnedMarqueeImgClone,
  });

  /*
  ==========================================
  FLIP ANIMATION
  ==========================================
  */

  let flipAnimation = null;

  ScrollTrigger.create({
    trigger: ".horizontal-scroll",

    start: "top 50%",

    end: () => `+=${window.innerHeight * 5.5}`,

    onEnter: () => {
      if (
        pinnedMarqueeImgClone &&
        isImgCloneActive &&
        !flipAnimation
      ) {
        const state = Flip.getState(pinnedMarqueeImgClone);

        gsap.set(pinnedMarqueeImgClone, {
          position: "fixed",

          left: "0px",

          top: "0px",

          width: "100%",

          height: "100svh",

          transform: "rotate(0deg)",

          transformOrigin: "center center",
        });

        flipAnimation = Flip.from(state, {
          duration: 1,

          ease: "none",

          paused: true,
        });
      }
    },

    onLeaveBack: () => {
      if (flipAnimation) {
        flipAnimation.kill();

        flipAnimation = null;
      }

      gsap.set(container, {
        backgroundColor: lightColor,
      });

      gsap.set(".horizontal-scroll-wrapper", {
        x: "0%",
      });
    },
  });

  /*
  ==========================================
  HORIZONTAL SCROLL ANIMATION
  ==========================================
  */

  const horizontalScrollTrigger = ScrollTrigger.create({
    trigger: ".horizontal-scroll",

    start: "top 50%",

    end: () => `+=${window.innerHeight * 5.5}`,

    onUpdate: (self) => {
      const progress = self.progress;

      /*
      -------------------------------
      BACKGROUND COLOR
      -------------------------------
      */

      if (progress <= 0.05) {
        const bgColorProgress = Math.min(
          progress / 0.05,
          1
        );

        const newBgColor = interpolateColor(
          lightColor,
          darkColor,
          bgColorProgress
        );

        gsap.set(container, {
          backgroundColor: newBgColor,
        });
      } else if (progress > 0.05) {
        gsap.set(container, {
          backgroundColor: darkColor,
        });
      }

      /*
      -------------------------------
      FLIP PROGRESS
      -------------------------------
      */

      if (progress <= 0.2) {
        const scaleProgress = progress / 0.2;

        if (flipAnimation) {
          flipAnimation.progress(scaleProgress);
        }
      }

      /*
      -------------------------------
      HORIZONTAL MOVEMENT
      -------------------------------
      */

      if (
        progress > 0.2 &&
        progress <= 0.95
      ) {
        if (flipAnimation) {
          flipAnimation.progress(1);
        }

        const horizontalProgress =
          (progress - 0.2) / 0.75;

        const wrapperTranslateX =
          -66.67 * horizontalProgress;

        gsap.set(
          ".horizontal-scroll-wrapper",
          {
            x: `${wrapperTranslateX}%`,
          }
        );

        /*
        -------------------------------
        PINNED IMAGE MOVEMENT
        -------------------------------
        */

        const slideMovement =
          (66.67 / 100) *
          3 *
          horizontalProgress;

        const imageTranslateX =
          -slideMovement * 100;

        if (pinnedMarqueeImgClone) {
          gsap.set(
            pinnedMarqueeImgClone,
            {
              x: `${imageTranslateX}%`,
            }
          );
        }
      }

      /*
      -------------------------------
      FINAL POSITION
      -------------------------------
      */

      else if (progress > 0.95) {
        if (flipAnimation) {
          flipAnimation.progress(1);
        }

        if (pinnedMarqueeImgClone) {
          gsap.set(
            pinnedMarqueeImgClone,
            {
              x: "-200%",
            }
          );
        }

        gsap.set(
          ".horizontal-scroll-wrapper",
          {
            x: "-85.67%",
          }
        );
      }
    },
  });

  /*
  ==========================================
  OUTRO
  ==========================================
  */

  const outroParagraphs = gsap.utils.toArray(
    ".outro h1 p"
  );

  gsap.set(outroParagraphs, {
    opacity: 0,
  });

  gsap.to(outroParagraphs, {
    opacity: 1,

    duration: 1,

    delay: 0.3,

    y: -50,

    stagger: 0.2,

    scrollTrigger: {
      trigger: ".outro",

      start: "top center",

      end: "+=200%",

      toggleActions:
        "play pause pause reverse",
    },
  });




  /*
  ==========================================
  REFRESH
  ==========================================
  */

  ScrollTrigger.refresh();


  /*
  ==========================================
  BIRTHDAY MESSAGE SECTION
  ==========================================
*/

const birthdayMessageSection =
  document.querySelector(".birthday-message");

const birthdayMessageContent =
  document.querySelector(".birthday-message-content");

const birthdayMessageLeft =
  document.querySelector(".birthday-message-left");

const birthdayMessageMiddle =
  document.querySelector(".birthday-message-middle");

const birthdayMessageRight =
  document.querySelector(".birthday-message-right");

const birthdayMessageSuccess =
  document.querySelector(".birthday-message-success");

const birthdayMessageSuccessText =
  document.querySelector(".birthday-message-success h2");


/*
  ------------------------------------------
  CHECK ELEMENTS
  ------------------------------------------
*/

if (
  birthdayMessageSection &&
  birthdayMessageContent &&
  birthdayMessageLeft &&
  birthdayMessageMiddle &&
  birthdayMessageRight &&
  birthdayMessageSuccess &&
  birthdayMessageSuccessText
) {

  /*
    ------------------------------------------
    STATE
    ------------------------------------------
  */

  let messageSent = false;

  let birthdayMessageScrollTrigger = null;


  /*
    ------------------------------------------
    INITIAL STATE
    ------------------------------------------
  */

  gsap.set(birthdayMessageLeft, {
    x: -200,
    opacity: 0,
  });

  gsap.set(birthdayMessageMiddle, {
    opacity: 0,
  });

  gsap.set(birthdayMessageRight, {
    x: 200,
    opacity: 0,
  });

  gsap.set(birthdayMessageSuccess, {
    opacity: 0,
  });

  gsap.set(birthdayMessageSuccessText, {
    opacity: 0,
    y: 50,
    scale: 0.9,
  });


  /*
    ------------------------------------------
    SCROLL ANIMATION
    ------------------------------------------
  */

  birthdayMessageScrollTrigger = ScrollTrigger.create({

    trigger: birthdayMessageSection,

    start: "top 70%",

    end: "top 20%",

    scrub: true,

    onUpdate: (self) => {

      /*
        IMPORTANT:

        Once message is sent,
        scroll must NOT control
        this section anymore.
      */

      if (messageSent) {
        return;
      }


      const progress = self.progress;


      /*
        LEFT IMAGE
      */

      gsap.set(birthdayMessageLeft, {
        x: -200 + 200 * progress,
        opacity: progress,
      });


      /*
        MIDDLE TEXTAREA
      */

      gsap.set(birthdayMessageMiddle, {
        opacity: progress,
        y: 0,
      });


      /*
        RIGHT IMAGE
      */

      gsap.set(birthdayMessageRight, {
        x: 200 - 200 * progress,
        opacity: progress,
      });

    },

  });


  /*
    ------------------------------------------
    SEND BUTTON
    ------------------------------------------
  */

  const messageForm =
    birthdayMessageMiddle.querySelector("form");


  if (messageForm) {

    messageForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        /*
          Don't allow sending twice
        */

        if (messageSent) {
          return;
        }


        /*
          Get textarea
        */

        const textarea =
          messageForm.querySelector("textarea");


        /*
          Empty message
        */

        if (
          !textarea ||
          !textarea.value.trim()
        ) {
          return;
        }


        /*
          ------------------------------------
          LOCK THE STATE
          ------------------------------------

          From this point ScrollTrigger
          will no longer control the section.
        */

        messageSent = true;


        /*
          Disable ScrollTrigger
        */

        if (birthdayMessageScrollTrigger) {

          birthdayMessageScrollTrigger.disable();

        }


        /*
          Kill any current scroll tweens
        */

        gsap.killTweensOf(
          birthdayMessageLeft
        );

        gsap.killTweensOf(
          birthdayMessageMiddle
        );

        gsap.killTweensOf(
          birthdayMessageRight
        );


        /*
          ------------------------------------
          FINAL ANIMATION
          ------------------------------------
        */

        const disappearTimeline =
          gsap.timeline();


        disappearTimeline

          /*
            LEFT IMAGE
          */

          .to(
            birthdayMessageLeft,
            {
              x: -300,
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut",
            },
            0
          )


          /*
            MIDDLE FORM
          */

          .to(
            birthdayMessageMiddle,
            {
              y: 50,
              opacity: 0,
              duration: 0.7,
              ease: "power3.inOut",
            },
            0
          )


          /*
            RIGHT IMAGE
          */

          .to(
            birthdayMessageRight,
            {
              x: 300,
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut",
            },
            0
          )


          /*
            WHOLE CONTENT SHRINK
          */

          .to(
            birthdayMessageContent,
            {
              scale: 0.95,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          )


          /*
            --------------------------------
            SHOW HAPPY BIRTHDAY
            --------------------------------
          */

          .to(
            birthdayMessageSuccess,
            {
              opacity: 1,
              duration: 0.2,
            }
          )


          .to(
            birthdayMessageSuccessText,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            }
          );

      }
    );

  }

}

  /*
  ==========================================
  CLEANUP
  ==========================================
  */

  return () => {
    lenis.off(
      "scroll",
      updateScrollTrigger
    );

    gsap.ticker.remove(
      tickerFunction
    );

    if (pinnedMarqueeImgClone) {
      pinnedMarqueeImgClone.remove();

      pinnedMarqueeImgClone = null;
    }

    ScrollTrigger.getAll().forEach(
      (trigger) => trigger.kill()
    );

    gsap.killTweensOf(
      ".hero h1 p"
    );

    gsap.killTweensOf(
      ".marquee-images"
    );

    gsap.killTweensOf(
      ".outro h1 p"
    );

    lenis.destroy();
  };



}