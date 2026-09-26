function HorizontalSlide({ text, image }) {
  return (
    <div
      className="
        horizontal-slide
        flex
        h-full
        flex-1
        gap-4
        bg-[#101010]
        p-4
        text-[#edf1e8]
        max-[1000px]:flex-col-reverse
        max-[1000px]:gap-8
        max-[1000px]:p-16
      "
    >
      <div
        className="
          col
          flex
          flex-[3]
          items-center
          justify-center
          max-[1000px]:items-start
        "
      >
        <h3
          className="
            w-[85%]
            text-center
            text-[2.25rem]
            font-medium
            leading-[1.125]
            tracking-[-0.025rem]
            max-[1000px]:w-full
            max-[1000px]:text-[1.5rem]
          "
        >
          {text}
        </h3>
      </div>

      <div
        className="
          col
          flex
          flex-[5]
          items-center
          justify-center
        "
      >
        <img
          src={image}
          alt=""
          className="
            h-[75%]
            w-[85%]
            object-cover
            max-[1000px]:h-full
            max-[1000px]:w-full
          "
        />
      </div>
    </div>
  );
}

function HorizontalScroll() {
  return (
    <section
      className="
        horizontal-scroll
        relative
        h-[100svh]
        w-full
        overflow-hidden
      "
    >
      <div
        className="
          horizontal-scroll-wrapper
          relative
          flex
          h-[100svh]
          w-[300%]
          will-change-transform
        "
      >
        {/* Spacer */}
        <div className="horizontal-slide flex-1 p-4" />

        <HorizontalSlide
          text="
            In a world full of beautiful moments, somehow you became my favorite one.
            I hope your birthday brings you the same warmth and happiness you bring into my life.
          "
          image="/images/rara2.jpg"
        />

        <HorizontalSlide
          text="
            Some people make a moment beautiful, but you somehow make every moment feel special.
            On your birthday, I just hope you always have reasons to smile the way you make me smile.
          "
          image="/images/rara4.jpg"
        />
      </div>
    </section>
  );
}

export default HorizontalScroll;