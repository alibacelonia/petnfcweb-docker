import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import PetTypeSelect from "../../../../../components/PetType";
import { Dialog, Listbox, Transition } from "@headlessui/react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { BiEditAlt } from "react-icons/bi";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const years = Array.from({ length: 50 }, (_, index) => 2023 - index);

const months = [
  { number: 1, name: "January" },
  { number: 2, name: "February" },
  { number: 3, name: "March" },
  { number: 4, name: "April" },
  { number: 5, name: "May" },
  { number: 6, name: "June" },
  { number: 7, name: "July" },
  { number: 8, name: "August" },
  { number: 9, name: "September" },
  { number: 10, name: "October" },
  { number: 11, name: "November" },
  { number: 12, name: "December" },
];

const genders = ["Male", "Female", "Desexed Male", "Desexed Female"];

export default function EditPetDetails({
  onPageChange,
  data,
}) {
  
  const userDetails = data
  console.info("Edit Pet - Pet Details: ",data);

  // get the current year
  const currentYear = new Date().getFullYear();

  // set formdata
  const [formData, setFormData] = useState({
    guid: data.unique_id,
    ownerId: data.owner_id,
    petBehaviour: data.behavior,
    petDescription: data.description,
    petWeight: data.weight,
    petType: data.pet_type_id,
    petGender: data.gender,
    petName: data.name,
    petMicrochipNo: data.microchip_id,
    petBreed: data.breed,
    petColor: data.color,
    petBirthMonth: data.date_of_birth_month,
    petBirthYear: data.date_of_birth_year,
  });

  const [previewURL, setPreviewURL] = useState(null);
  const [file, setFile] = useState(null);

  const [passwordError, setPasswordError] = useState("");
  const [petProfileError, setPetProfileError] = useState("");
  const [isEnabledSubmit, setSubmitButtonState] = useState(true);

  // Add a state to control the modal visibility
  const [isOpenImagePreview, setIsModalOpen] = useState(false);
  const [isOpenModalAlert, setAlertModalOpen] = useState(false);

  // Event handler to open the modal when the image is clicked
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Event handler to close the modal
  const closePreviewModal = () => {
    setIsModalOpen(false);
  };

  const selectedMonth = months.find(
    (state) => state["number"] === formData.petBirthMonth
  );

  const handleOnChangePetType = (value) => {
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      ["petType"]: value,
    }));
  };

  const handleOnChangeGender = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ["petGender"]: value,
    }));
  };

  const handleOnChangeBirthMonth = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ["petBirthMonth"]: value,
    }));
  };

  const handleOnChangeBirthYear = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      ["petBirthYear"]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setPetProfileError("");
    } else {
      setPreviewURL(null);
      setPetProfileError("No image selected");
    }
  };

  const handleSubmit = async (e) => {
    // setSubmitButtonState(false);
    e.preventDefault();
    formData["file"] = file;

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/pet/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.info(response.data.data);
        alert("Successfully updated");
        onPageChange("pets_details", response.data.data)
      })
      .catch((err) => {
        alert("Failed to update");
        console.error(err);
      });
  };

  return (
    <>
      <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12 ">
        <div className="flex items-end min-w-full justify-between ">
          <h1 className="text-2xl lg:text-2xl tracking-normal font-bold text-gray-700 py-3">
            Edit Pet Details
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
                {/* Pet Image */}
                <div className="col-span-full">
                  <div className="mt-2 flex flex-col items-center gap-4 gap-x-3">
                    {/* Image Preview */}
                    {previewURL ? (
                      <div className="p-1 border-4 border-amber-400 rounded-full">
                        <img
                          className="inline-block h-48 w-48 rounded-full ring-2 ring-white object-cover "
                          src={previewURL}
                          alt=""
                          onClick={handleImageClick}
                        />
                      </div>
                    ) : (
                      <div className="p-1 border-4 border-amber-400 rounded-full">
                        <img
                          className="inline-block h-48 w-48 rounded-full ring-2 ring-white object-cover "
                          src={`http://localhost:8000/userdata/${data.owner_id}/${data.unique_id}/profile/${data.main_picture}`}
                          alt="Pet Image"
                        />
                      </div>
                    )}

                    <p className="font-bold text-red-500 text-sm">
                      {petProfileError}
                    </p>

                    <label
                      htmlFor="file"
                      className="rounded-md text-white bg-blue-500 px-8 py-3 text-sm shadow-sm cursor-pointer"
                    >
                      {" "}
                      Change Pet Photo{" "}
                    </label>
                    <span className="text-sm leading-6 text-gray-600 text-center">
                      The image selected will be the display picture of your pet
                      in the website.{" "}
                    </span>
                    <input
                      className="hidden"
                      type="file"
                      id="file"
                      name="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Pet Description */}
                <div className="col-span-full">
                  <label
                    htmlFor="petDescription"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pet Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      value={formData.petDescription}
                      onChange={handleChange}
                      name="petDescription"
                      id="petDescription"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                      cols={2}
                      rows={4}
                    ></textarea>
                  </div>
                </div>

                {/* Pet Behaviour */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="petBehaviour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {" "}
                    Pet Behaviour
                  </label>
                  <div className="mt-1">
                    <input
                      maxLength={100}
                      value={formData.petBehaviour}
                      onChange={handleChange}
                      id="petBehaviour"
                      name="petBehaviour"
                      type="text"
                      autoComplete="petName"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Weight */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="petWeight"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pet Weight (lbs){" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      min={1}
                      max={1000}
                      maxLength={4}
                      value={formData.petWeight}
                      onChange={handleChange}
                      id="petWeight"
                      name="petWeight"
                      type="number"
                      autoComplete="petWeight"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Type */}
                <div className="col-span-full md:col-span-6 z-50">
                  <PetTypeSelect
                    selectedPetType={formData.petType}
                    handleChange={handleOnChangePetType}
                  />
                </div>

                {/* Pet Gender */}
                <div className="col-span-full md:col-span-6 z-40">
                  <label
                    htmlFor="petGender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <Listbox
                      value={formData.petGender}
                      onChange={handleOnChangeGender}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3.5 pl-3 pr-10 text-left ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-sm">
                            {formData.petGender}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {genders.map((gender, idx) => (
                              <Listbox.Option
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={gender}
                              >
                                {({ active, selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        active ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {gender}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                {/* Pet Name */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="petName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pet Name <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={100}
                      value={formData.petName}
                      onChange={handleChange}
                      id="petName"
                      name="petName"
                      type="text"
                      autoComplete="petName"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Microchip ID */}
                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="petMicrochipNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Microchip Number{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={15}
                      value={formData.petMicrochipNo}
                      onChange={handleChange}
                      id="petMicrochipNo"
                      name="petMicrochipNo"
                      type="text"
                      autoComplete="petMicrochipNo"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Breed */}
                <div className="col-span-full md:col-span-6 sm:col-start-1">
                  <label
                    htmlFor="petBreed"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Breed <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={30}
                      value={formData.petBreed}
                      onChange={handleChange}
                      type="text"
                      name="petBreed"
                      id="petBreed"
                      autoComplete="petBreed"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full md:col-span-6">
                  <label
                    htmlFor="petColor"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {" "}
                    Color <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      maxLength={30}
                      value={formData.petColor}
                      onChange={handleChange}
                      type="text"
                      name="petColor"
                      id="petColor"
                      autoComplete="petColor"
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Pet Color */}
                <div className="col-span-full md:col-span-6  z-10">
                  <label
                    htmlFor="petBirthYear"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth - Month{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <Listbox
                      value={formData.petBirthMonth}
                      onChange={handleOnChangeBirthMonth}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg ring-1 ring-inset ring-gray-300  bg-white py-3.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-sm">
                            {selectedMonth.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {months.map((month, monthIdx) => (
                              <Listbox.Option
                                key={monthIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={month.number}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {month.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                {/* Pet Breed */}
                <div className="col-span-full md:col-span-6  z-0">
                  <label
                    htmlFor="petBirthYear"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth - Year{" "}
                    <span className="text-red-500 text-base">*</span>
                  </label>
                  <div className="mt-1">
                    <Listbox
                      value={formData.petBirthYear}
                      onChange={handleOnChangeBirthYear}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3.5 pl-3 pr-10 text-left ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-sm">
                            {formData.petBirthYear}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {years.map((year, yearIdx) => (
                              <Listbox.Option
                                key={yearIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={year}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {year}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel and Submit Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => onPageChange("pets_details", data)}
                className="text-xs lg:text-sm text-gray-700  bg-gray-200 px-8 py-3 rounded-md shadow-md  hover:bg-gray-300 transition duration-150 ease-out"
              >
                Cancel
              </button>
              <button
                disabled={!isEnabledSubmit}
                type="submit"
                className="text-xs lg:text-sm text-white bg-blue-500 px-8 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-150 ease-out"
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
