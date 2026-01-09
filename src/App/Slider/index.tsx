import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import SlideMarker from './SlideMarker'

const slides = [
  {
    title:
      'Under the soft hum of streetlights she watches the world ripple through glass, her calm expression mirrored in the fragments of drifting light.',
    image: 'slider_img_01',
  },
  {
    title:
      'A car slices through the desert, shadow chasing the wind as clouds of dust rise behind, blurring the horizon into gold and thunder.',
    image: 'slider_img_02',
  },
  {
    title:
      'Reflection ripple across mirrored faces, each one of a fragment of identity, caught between defiance, doubt, and the silence of thought.',
    image: 'slider_img_03',
  },
  {
    title:
      'Soft light spills through the café window as morning settles into wood and metal, capturing the rhythm of quite human routine.',
    image: 'slider_img_04',
  },
  {
    title:
      'Every serve becomes a battle between focus and instinct, movement flowing like rhythm as the court blurs beneath the sunlight.',
    image: 'slider_img_05',
  },
  {
    title:
      'Amber light spills over the stage as guitars cry into smoke and shadow, where music and motion merge into pure energy.',
    image: 'slider_img_06',
  },
  {
    title:
      'Dust erupts beneath his stride as sweat glints under floodlights, every steps pushing closer to victory, grit, and pure determination.',
    image: 'slider_img_07',
  },
]

const Slider = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * slides.length}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        gsap.to(progressRef.current, {
          scaleY: self.progress,
        })

        setSlideIndex(Math.floor(self.progress * slides.length))
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full">
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

      <div className="absolute bottom-8 lg:bottom-auto right-8 lg:top-1/2 translate-0 lg:-translate-y-1/2">
        <div className="flex flex-col gap-4 py-4 px-5">
          {slides.map((_, index) => (
            <p
              key={index}
              className="font-geist text-white flex items-center gap-4"
            >
              <SlideMarker hidden={index !== slideIndex} />
              <span className="w-5 flex justify-end">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </p>
          ))}
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-black/35">
          <div
            ref={progressRef}
            className="absolute top-0 left-1/2 -transform-x-1/2 w-[3px] h-full bg-white origin-top scale-y-0"
          />
        </div>
      </div>
    </section>
  )
}

export default Slider
