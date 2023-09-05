"use client" // this is a client component
import React from "react"
import Image from "next/image"
import { Link } from "react-scroll/modules"
import { 
            HiOutlineIdentification, 
            HiOutlineQrcode,
            HiOutlinePencilAlt,
            HiOutlineInformationCircle,
            HiOutlineUserGroup,
            HiOutlineSearchCircle
        } from "react-icons/hi"

const FeaturesSection = () => {
    return (
        <section id="features" className="overflow-hidden pt-5">
        
          <div className="flex flex-col animate-fadeIn animation-delay-2 pt-6 sm:pt-20 md:flex-row md:text-left">
            <div className="hidden lg:block lg:w-5/12 ">
              <div className="relative overflow-hidden pt-4 mx-auto me-md-0 max-w-xl min-h-screen">
                <div className="flex flex-col sm:flex-row items-center sm:items-left justify-center sm:justify-start">
                    <img src="/img/phone.png" 
                    className="max-w-sm" alt="Phone" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12">
              <h1 className="text-2xl font-semibold mt-6 md:mt-6 md:text-4xl text-center sm:text-left text-slate-700">App Features</h1>
              <p className="text-lg mt-6 mb-16 md:text-lg text-center sm:text-left text-slate-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse consequat fringilla dolor, vel ornare est feugiat aliquam.
              </p>
              <div className="flex flex-row sm:flex-col flex-wrap gap-4 sm:gap-12">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlineIdentification size={35} className="text-slate-600"></HiOutlineIdentification>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">Quick Identification</h1>
                            <p className="text-slate-600">Id mollis consectetur congue egestas egestas suspendisse blandit justo.</p>
                        </div>
                    </div>
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlineSearchCircle size={35} className="text-slate-600"></HiOutlineSearchCircle>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">Accessible Medical Information</h1>
                            <p className="text-slate-600">Augue pulvinar justo, fermentum fames aliquam accumsan vestibulum non.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlineQrcode size={35} className="text-slate-600"></HiOutlineQrcode>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">QR and NFC Tagging</h1>
                            <p className="text-slate-600">Mattis urna ultricies non amet, purus in auctor non. Odio vulputate ac nibh.</p>
                        </div>
                    </div>
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlinePencilAlt size={35} className="text-slate-600"></HiOutlinePencilAlt>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">Customizable Information</h1>
                            <p className="text-slate-600">A elementum, imperdiet enim, pretium etiam facilisi in aenean quam mauris.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlineInformationCircle size={35} className="text-slate-600"></HiOutlineInformationCircle>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">Easy Information Updates</h1>
                            <p className="text-slate-600">Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet eleifend.</p>
                        </div>
                    </div>
                    <div className="flex items-start w-full sm:w-1/2">
                        <div className="shrink-0 bg-slate-100 rounded-lg p-3">
                            <HiOutlineUserGroup size={35} className="text-slate-600"></HiOutlineUserGroup>
                        </div>
                        <div className="pl-4">
                            <h1 className="font-semibold text-lg pb-1 mb-1 text-slate-700">Community Building</h1>
                            <p className="text-slate-600">Faucibus cursus maecenas lorem cursus nibh. Sociis sit risus id. Sit facilisis dolor arcu.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        </section>
      )
}

export default FeaturesSection
