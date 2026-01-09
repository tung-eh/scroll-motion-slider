import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

import SlideMarker from './SlideMarker'

const slides = [
  {
    title:
      'Under the soft hum of streetlights she watches the world ripple through glass, her calm expression mirrored in the fragments of drifting light.',
    image: '/slider_img_01.jpg',
  },
  {
    title:
      'A car slices through the desert, shadow chasing the wind as clouds of dust rise behind, blurring the horizon into gold and thunder.',
    image: '/slider_img_02.jpg',
  },
  {
    title:
      'Reflection ripple across mirrored faces, each one of a fragment of identity, caught between defiance, doubt, and the silence of thought.',
    image: '/slider_img_03.jpg',
  },
  {
    title:
      'Soft light spills through the café window as morning settles into wood and metal, capturing the rhythm of quite human routine.',
    image: '/slider_img_04.jpg',
  },
  {
    title:
      'Every serve becomes a battle between focus and instinct, movement flowing like rhythm as the court blurs beneath the sunlight.',
    image: '/slider_img_05.jpg',
  },
  {
    title:
      'Amber light spills over the stage as guitars cry into smoke and shadow, where music and motion merge into pure energy.',
    image: '/slider_img_06.jpg',
  },
  {
    title:
      'Dust erupts beneath his stride as sweat glints under floodlights, every steps pushing closer to victory, grit, and pure determination.',
    image: '/slider_img_07.jpg',
  },
]

const Slider = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const slideContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const imageOverlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const currIndexRef = useRef<number>(0)

  const [slideIndex, setSlideIndex] = useState(0)

  const currentSlide = slides[slideIndex]

  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const animateNewSlide = (index: number) => {
      if (!slideContainerRef.current || !imageOverlayRef.current) return
      const image = images[index]

      slideContainerRef.current.insertBefore(image, imageOverlayRef.current)
      gsap.set(image, {
        opacity: 0,
        scale: 1.1,
      })
      gsap.to(image, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(image, {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
    }

    const setupScrollTrigger = () => {
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

          const nextSlideIndex = Math.floor(self.progress * slides.length)
          if (
            currIndexRef.current !== nextSlideIndex &&
            nextSlideIndex < slides.length
          ) {
            currIndexRef.current = nextSlideIndex
            animateNewSlide(nextSlideIndex)
            setSlideIndex(nextSlideIndex)
          }
        },
      })
    }

    for (let i = 0; i < slides.length; i++) {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === slides.length) {
          setupScrollTrigger()
        }
      }
      img.src = slides[i].image
      img.className = 'absolute inset-0 w-full h-full object-cover opacity-0'
      images.push(img)
    }
  }, [])

  useGSAP(() => {
    const split = new SplitText(titleRef.current, {
      type: 'lines',
    })
    gsap.set(split.lines, {
      yPercent: 100,
      opacity: 0,
    })
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [slideIndex])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div ref={slideContainerRef} className="absolute inset-0">
        <img
          ref={imageRef}
          src={slides[0].image}
          className="w-full h-full object-cover"
        />
        <div ref={imageOverlayRef} className="absolute inset-0 bg-black/35" />
      </div>

      <div className="absolute left-0 lg:left-8 top-20 lg:top-1/2 translate-0 lg:-translate-y-1/2 lg:w-1/2 text-white z-5 p-8 lg:p-0">
        <h1
          key={slideIndex}
          ref={titleRef}
          className="text-[2rem] lg:text-[3rem] tracking-[-0.1rem] leading-[1.2]"
        >
          {currentSlide.title}
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
