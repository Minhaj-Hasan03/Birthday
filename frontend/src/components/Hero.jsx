function Hero() {
  return (
    <section
      className="
        hero
        relative
        flex
        h-[100svh]
        w-full
        items-center
        justify-center
        p-8
        text-center
      "
    >
      <h1
        className="
          flex
          w-full
          max-w-[75%]
          flex-col
          gap-2
          text-[4rem]
          font-medium
          leading-[1]
          tracking-[-0.075rem]
          max-[1000px]:max-w-full
          max-[1000px]:text-[2.25rem]
          max-[1000px]:tracking-[0.05rem]
        "
      >
        <p>Hey, you...</p>

        <p>
          Before you scroll any further, I just want you to know that this
          little website is made especially for you.
        </p>

        <p>
          Today isn't just another day. It's the day someone truly special
          came into this world.
        </p>

        <p>
          So, take a moment, turn the music up, and enjoy this little surprise...
        </p>

        <p>Because today, it's all about you.</p>
      </h1>
    </section>
  );
}

export default Hero;