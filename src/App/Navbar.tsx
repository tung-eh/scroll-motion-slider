const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full hidden lg:flex justify-between items-center p-8 z-10">
      <div className="bg-black/50 backdrop-blur-[20px] rounded border border-white/10 py-2 px-4">
        <p className="font-geist uppercase text-[0.75rem] text-white">
          Codegrid / Experiment 501
        </p>
      </div>
      <div>
        <p className="font-geist uppercase text-[0.75rem] text-white">
          [ Scroll Motion Slider ]
        </p>
      </div>
    </nav>
  )
}

export default Navbar
