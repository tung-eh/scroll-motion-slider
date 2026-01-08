import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Lenis from 'lenis'

import Navbar from './Navbar'
import Intro from './Intro'
import Slider from './Slider'
import Outro from './Outro'

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }, [])

  return (
    <main>
      <Navbar />
      <Intro />
      <Slider />
      <Outro />
    </main>
  )
}

export default App
