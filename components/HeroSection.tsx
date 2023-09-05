"use client" // this is a client component
import React from "react"
import { HiArrowDown, HiChevronDown } from "react-icons/hi"
import { Link } from "react-scroll/modules"

const HeroSection = () => {
  return (
    <section id="home" className="overflow-hidden pt-5">
    
      <div className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 pt-14 sm:pt-32 md:flex-row md:text-left">
        <div className="w-full md:w-1/2 pr-6">
          <h1 className="text-2xl font-semibold mt-6 md:mt-0 md:text-5xl text-slate-700">Find Your Lost Companion with Ease!</h1>
          <p className="text-lg mt-10 mb-6 sm:mb-16 md:text-lg text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse consequat fringilla dolor, vel ornare est feugiat aliquam.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-left justify-center sm:justify-start gap-2">
            <a href="#" className="w-full sm:w-auto flex items-center justify-center rounded-md bg-slate-700 px-3.5 py-2.5 hover:bg-slate-900 focus-visibility:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <img src="appstore-light.svg" alt="appstore" width={120}/>
            </a>
            <a href="#" className="w-full sm:w-auto flex items-center justify-center rounded-md bg-slate-700 px-3.5 py-2.5 hover:bg-slate-900 focus-visibility:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <img src="googleplay-light.svg" alt="appstore" width={130}/>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-left justify-center sm:justify-start  gap-1 mb-10 mt-12 sm:mt-48 ">
            <Link
            to="features"
            className="flex items-center sm:items-left justify-center sm:justify-start gap-2"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            <span className="rounded-full bg-slate-100 p-3">
                <HiChevronDown  color="black"></HiChevronDown>
            </span>
            <span className="text-slate-700">Discover More</span>
          </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="relative overflow-hidden pt-4 mx-auto me-md-0 max-w-xl min-h-screen">
            <div className="flex flex-col sm:flex-row items-center sm:items-left justify-center sm:justify-start">
                <img src="/img/hero-phone-2.png" 
                className="rellax absolute top-0 start-10" 
                data-rellax-speed="2.8" data-disable-parallax-down="md" alt="Phone" />
                <img src="/img/hero-phone-1.png" alt=""
                className="rellax absolute top-12 start-0 z-index-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
