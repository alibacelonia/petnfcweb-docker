import { BiEditAlt, BiSolidVirus } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
export default function MyProfilePage({ onPageChange, data }) {
  return (
    <>
      <>
        <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12">
          <div className="flex items-end min-w-full justify-between ">
            <h1 className="text-xl lg:text-2xl tracking-normal font-bold text-gray-700">
              My Profile
            </h1>
            <button
              onClick={() => onPageChange("profile_edit_details", data)}
              className="text-xs lg:text-sm text-white bg-gradient-to-r from-blue-400 to-blue-500 px-5 py-3 rounded-full shadow-md  "
            >
              <BiEditAlt size={18} className="inline" /> Edit Profile
            </button>
          </div>

          <div className="relative bg-white mt-5 rounded-2xl shadow-md p-4 overflow-hidden">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-full md:col-span-3">
                <div className="flex justify-center items-center">
                  <div className="p-1 border-4 border-gray-300 rounded-full">
                    <UserCircleIcon
                      className="h-40 w-40 rounded-full text-gray-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="0 mt-2 flex flex-col items-center">
                  <h1 className="font-semibold tracking-wide text-center text-gray-600 text-lg">
                    {data.username}
                  </h1>
                </div>
              </div>
              <div className="col-span-full md:col-span-9">
                <div className="grid grid-cols-12 gap-1 mt-2 relative">
                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            First Name:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.first_name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Last Name:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.last_name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Email:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.email}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Phone:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.phone_number}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-span-full">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 md:col-span-2 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Address:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 md:col-span-10 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.address}, {data.city}, {data.state}, {data.post_code}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Contact Person:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.secondary_contact}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full md:col-span-6">
                    <div className="grid grid-cols-12 bg-gray-100">
                      <div className="col-span-4 ">
                        <div className="flex flex-row items-center">
                          <h1 className="text-gray-700 py-4 text-sm lg:text-base pl-4">
                            Phone Number:
                          </h1>
                        </div>
                      </div>
                      <div className="col-span-8 ">
                        <div className="flex flex-row items-center h-full">
                          <h1 className="text-gray-700 text-sm lg:text-base pl-4 text-clip font-bold">
                            {data.secondary_contact_number}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
