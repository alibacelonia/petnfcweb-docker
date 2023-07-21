"use client" // this is a client component
import React from "react"
import { HiArrowDown, HiChevronDown, HiOutlineArrowSmRight, HiOutlinePhoneOutgoing, HiOutlineChat } from "react-icons/hi"
import { Link } from "react-scroll/modules"
import Accordion from "./Accordion"
const { Fragment, useState } = React


const FAQSection = () => {

  return (
    <section id="faqs" className="overflow-hidden pt-5">
    
      <div className="flex flex-col animate-fadeIn animation-delay-2 pt-14 sm:pt-10 md:flex-row">
        <div className="w-full md:w-5/12">
          <h1 className="text-2xl font-semibold mt-6 md:mt-0 md:text-4xl text-center sm:text-left">Any questions?</h1>
          <h1 className="text-2xl font-semibold mt-2 sm:mt-6 md:mt-0 md:text-4xl text-center sm:text-left">Check out the FAQs</h1>
          <p className="text-lg mt-6 mb-16 mb-6 md:text-lg text-center sm:text-left">
          Still have unanswered questions and need to get in touch?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-start gap-2">
                  <div className="grow sm:shrink-0 bg-slate-100 rounded-lg p-3">
                    <HiOutlinePhoneOutgoing size={30} className="text-indigo-500 "></HiOutlinePhoneOutgoing>
                    <p className="my-4 text-sm  text-slate-700">Still have questions?</p>
                    <div className="flex gap-1">
                      <span className="text-sm text-indigo-500 font-semibold">Call us </span><HiOutlineArrowSmRight size={20} className="text-indigo-500 "></HiOutlineArrowSmRight>
                    </div>
                  </div>
                  <div className="grow sm:shrink-0 bg-slate-100 rounded-lg p-3">
                    <HiOutlineChat size={30} className="text-green-500 "></HiOutlineChat>
                    <p className="my-4 text-sm  text-slate-700">Still have questions?</p>
                    <div className="flex gap-1">
                      <span className="text-sm text-green-500 font-semibold">Chat with us </span><HiOutlineArrowSmRight size={20} className="text-green-500 "></HiOutlineArrowSmRight>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="w-full md:w-7/12">
          <div className="relative overflow-hidden mx-auto me-md-0 min-h-screen">
            <div className="flex flex-col ">
              <Accordion />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
