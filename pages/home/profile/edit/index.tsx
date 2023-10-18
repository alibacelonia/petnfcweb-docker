import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dialog, Listbox, Transition } from "@headlessui/react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { BiEditAlt } from "react-icons/bi";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import StateSelect from "../../../../components/State";
import CitySelect from "../../../../components/City";

export default function EditUserDetails({ onPageChange, data }) {
  // get the current year
  const currentYear = new Date().getFullYear();
  // set formdata
  const [formData, setFormData] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    street_address: data.address,
    post_code: data.post_code,
    state_code: data.state_code,
    state: data.state,
    city_id: data.city_id,
    city: data.city,
    secondary_contact: data.secondary_contact,
    secondary_contact_number: data.secondary_contact_number,
  });

  const [isEnabledSubmit, setSubmitButtonState] = useState(true);
  const [stateErrorText, setStateErrorText] = useState("");
  const [cityErrorText, setCityErrorText] = useState("");

  const handleStateChange = (value) => {
    setSubmitButtonState(true);
    setFormData((prevData) => ({
      ...prevData,
      ["state_code"]: value.state_code,
      ["state"]: value.name,
    }));
    handleCityChange("");
  };

  const handleCityChange = (value) => {
    setSubmitButtonState(true);
    if (value) {
      setFormData((prevData) => ({
        ...prevData,
        ["city_id"]: value.id,
        ["city"]: value.name,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, ["city_id"]: "", city: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // get token from local storage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    setSubmitButtonState(false);
    e.preventDefault();

    if (formData.city_id == "" || formData.state_code == "") {
    } else {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update/profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setSubmitButtonState(true);
          onPageChange("profile", response.data.data);
        })
        .catch((err) => {
          setSubmitButtonState(true);
          console.error(err);
        });
    }
  };
  return (
    <>
      <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12 ">
        <div className="flex items-end min-w-full justify-between ">
          <h1 className="text-xl lg:text-2xl tracking-normal font-bold text-gray-700">
            Edit Profile
          </h1>
        </div>

        <div className="relative bg-white mt-5 rounded-2xl shadow-md p-6 overflow-hidden">
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div className="border-b border-gray-900/10 pb-12">
              <div className="grid grid-cols-12 gap-3">
                {/* First Name */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={100}
                      value={formData.first_name}
                      onChange={handleChange}
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="first_name"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={100}
                      value={formData.last_name}
                      onChange={handleChange}
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="last_name"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Name */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={true}
                      maxLength={100}
                      value={data.email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="cursor-not-allowed block w-full rounded-md border-0 py-3 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Microchip ID */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={15}
                      value={formData.phone_number}
                      onChange={handleChange}
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      autoComplete="phone_number"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Type */}
                <div className="col-span-full md:col-span-6 z-50">
                  <StateSelect
                    selectedState={formData.state_code}
                    handleChange={handleStateChange}
                  />
                  <span className="text-red-400 text-sm font-semibold">
                    {stateErrorText}
                  </span>
                </div>
                {/* Pet Type */}

                <div className="col-span-full md:col-span-6 z-40">
                  <CitySelect
                    selectedCity={formData.city_id}
                    selectedState={formData.state_code}
                    handleChange={handleCityChange}
                  />
                  <span className="text-red-400 text-sm font-semibold">
                    {cityErrorText}
                  </span>
                </div>

                {/* Pet Breed */}
                <div className="col-span-full md:col-span-8 sm:col-start-1">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street Address{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      value={formData.street_address}
                      onChange={handleChange}
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street_address"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full md:col-span-4">
                  <label
                    htmlFor="post_code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {" "}
                    Zip / Postal Code{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={30}
                      value={formData.post_code}
                      onChange={handleChange}
                      type="text"
                      name="post_code"
                      id="post_code"
                      autoComplete="post_code"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="secondary_contact"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Secondary Contact{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={100}
                      value={formData.secondary_contact}
                      onChange={handleChange}
                      type="text"
                      name="secondary_contact"
                      id="secondary_contact"
                      autoComplete="secondary_contact"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="secondary_contact_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                  Secondary Contact Number{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={30}
                      value={formData.secondary_contact_number}
                      onChange={handleChange}
                      type="text"
                      name="secondary_contact_number"
                      id="secondary_contact_number"
                      autoComplete="secondary_contact_number"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel and Submit Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => onPageChange("profile", data)}
                className="text-xs lg:text-sm text-gray-700  bg-gray-200 px-8 py-3 rounded-md shadow-md  hover:bg-gray-300 transition duration-150 ease-out"
              >
                Cancel
              </button>
              <button
                disabled={!isEnabledSubmit}
                type="submit"
                className={`text-xs lg:text-sm ${
                  isEnabledSubmit
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-gray-700 bg-gray-100 cursor-not-allowed"
                } px-8 py-3 rounded-md shadow-md transition duration-150 ease-out`}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
