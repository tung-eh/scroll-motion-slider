const Slider = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        <img src="/slider_img_01.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="absolute left-0 lg:left-8 top-20 lg:top-1/2 translate-0 lg:-translate-y-1/2 lg:w-1/2 text-white z-5 p-8 lg:p-0">
        <h1 className="text-[2rem] lg:text-[3rem] tracking-[-0.1rem] leading-[1.2]">
          Under the soft hum of streetlights she watches the world ripple
          through glass, her calm expression mirrored in the fragments of
          drifting light.
        </h1>
      </div>

      <div className="absolute bottom-8 lg:bottom-auto right-8 lg:top-1/2 translate-0 lg:-translate-y-1/2"></div>
    </section>
  )
}

export default Slider
