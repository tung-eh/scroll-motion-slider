import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const SlideMarker = ({ hidden }: { hidden: boolean }) => {
  const markerRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    gsap.to(markerRef.current, {
      scaleX: hidden ? 0 : 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [hidden])

  return (
    <span
      ref={markerRef}
      className="w-3 h-px bg-white origin-right scale-x-0"
    ></span>
  )
}

export default SlideMarker
