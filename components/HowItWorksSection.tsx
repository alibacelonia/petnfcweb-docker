"use client" // this is a client component
import React, { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'; 

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

const HowItWorksSection = () => {

  const steps = [
    {
      title: "Scan your QR",
      description:"Consequat ut cras nisl, enim purus in facilisi. Ipsum amet, lectus malesuada risus sollicitudin accumsan. Id sem elit vel vel lectus risus senectus."
    },
    {
      title: "Register",
      description:"Enim, et amet praesent pharetra. Mi non ante hendrerit amet sed. Arcu sociis tristique quisque hac in consectetur condimentum."
    },
    {
      title: "Update Details",
      description:"Proin volutpat mollis egestas. Nam luctus facilisis ultrices. Pellentesque volutpat ligula est. Mattis fermentum, at nec lacus."
    },
    {
      title: "Login",
      description:"A sed lorem felis, pulvinar pharetra. At tempus, vel sed faucibus amet sit elementum sed erat. Id nunc blandit pharetra facilisis."
    },
    {
      title: "Enjoy using our app",
      description:"Phasellus maximus tempus purus, venenatis egestas ex eleifend a. Vestibulum scelerisque pharetra mollis. Etiam ut suscipit erat."
    },
  ]

  // const swiperRef = useRef<Swiper | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  // const slideTo = (index) => swiper.slideTo(index);

  return (
    <section id="howitworks" className="overflow-hidden pt-5">
      <div className="">
        <h1 className="font-semibold text-4xl text-center py-10">How Does It Work?</h1>
      </div>
      <div className="relative flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 md:flex-row md:text-left">
             
        {/* <button className="rounded-full bg-slate-100 shadow p-3.5 absolute top-50 start-0 ms-n5 translate-middle-y z-50" onClick={() => swiperRef.current?.slidePrev()}><HiOutlineChevronLeft></HiOutlineChevronLeft></button> */}
        <Swiper
        modules={[Pagination, Navigation]}
          // onBeforeInit={(swiper) => {
          //   swiperRef.current = swiper;
          // }}
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{
            el: "#swiperid",
            type: 'progressbar',
          }}

        navigation={true}
          loop={true}
          breakpoints={{
            "768": { "slidesPerView": 3 }
          }}
        >
          <SwiperSlide><img className="block mx-auto" src="https://silicon.createx.studio/assets/img/landing/app-showcase/screens/01.png" /></SwiperSlide>
          <SwiperSlide><img className="block mx-auto" src="https://silicon.createx.studio/assets/img/landing/app-showcase/screens/02.png" /></SwiperSlide>
          <SwiperSlide><img className="block mx-auto" src="https://silicon.createx.studio/assets/img/landing/app-showcase/screens/03.png" /></SwiperSlide>
          <SwiperSlide><img className="block mx-auto" src="https://silicon.createx.studio/assets/img/landing/app-showcase/screens/04.png" /></SwiperSlide>
          <SwiperSlide><img className="block mx-auto" src="https://silicon.createx.studio/assets/img/landing/app-showcase/screens/04.png" /></SwiperSlide>
        </Swiper>
        
        {/* Add navigation elements */}
        {/* <button className="rounded-full bg-slate-100 shadow p-3.5 absolute top-50 end-0 ms-n5 translate-middle-y z-50" onClick={() => swiperRef.current?.slideNext()}><HiOutlineChevronRight className="text-slate-700"></HiOutlineChevronRight></button> */}
        
      </div>
      <div className="flex justify-center items-center py-5">
        <div className="text-center max-w-xl">
        <h1 className="text-2xl font-semibold"> Step {realIndex + 1}. {steps[realIndex].title}</h1>
        <p className="text-sm mt-2">{steps[realIndex].description}</p>
          </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
