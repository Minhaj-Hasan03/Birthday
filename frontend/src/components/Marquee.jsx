function Marquee() {
  return (
    <section
      className="
        marquee
        relative
        h-[50svh]
        w-full
        overflow-hidden
      "
    >
      <div
        className="
          marquee-wrapper
          absolute
          left-1/2
          top-1/2
          h-full
          w-[150%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-5deg]
          max-[1000px]:w-[300%]
        "
      >
        <div
          className="
            marquee-images
            absolute
            left-1/2
            top-1/2
            flex
            h-full
            w-[200%]
            -translate-x-[75%]
            -translate-y-1/2
            items-center
            justify-between
            gap-4
            will-change-transform
          "
        >
          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara1.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara3.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara5.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara6.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara7.jpg"
              alt=""
              className="h-full w-full flex-1 object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara8.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img pin aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara15.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara9.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara10.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara11.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara12.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara13.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="marquee-img aspect-[5/3] w-full flex-1 overflow-hidden">
            <img
              src="/images/rara14.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marquee;