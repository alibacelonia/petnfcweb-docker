import React, { Fragment, useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import PetTypeSelect from "../../components/PetType";
import StateSelect from "../../components/State";
import { Dialog, Transition } from '@headlessui/react'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';

import bg from '../../public/bg/2.png'
import CitySelect from '../../components/City';

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};


export default function Example() {
  
  const router = useRouter();
  const { guid } = router.query;

  // get the current year
  const currentYear = new Date().getFullYear();

  // set formdata
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    state: '',
    state_code: '',
    city: '',
    city_id: '',
    postalCode: '',
    phoneNo: '',
    contactPerson: '',
    contactPersonNo: '',

    petType: '',
    petGender: '',
    petName: '',
    petMicrochipNo: '',
    petBreed:'',
    petColor: '',
    petBirthMonth: null,
    petBirthYear: null,

    username: '',
    password: '',
    confirmPassword: ''
  });
  const closeAlertModal = () => {
    setAlertModalOpen(false);
  }

  const openAlertModal = () => {
    setAlertModalOpen(true)
  }
  const [previewURL, setPreviewURL] = useState(null);
  const [file, setFile] = useState(null);
  
  const [passwordError, setPasswordError] = useState('');
  const [petProfileError, setPetProfileError] = useState('');
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

  const handleCityChange = (value) => {
    if (value){
      setFormData((prevData) => ({ ...prevData, ["city_id"]: value.id , "city": value.name}));
    }
    else{
      setFormData((prevData) => ({ ...prevData, ["city_id"]: "", "city": "" }));
    }
  };

  const handleStateChange = (value) => {
    setFormData((prevData) => ({ ...prevData, ["state_code"]: value.state_code, ["state"]: value.name}));
    handleCityChange("");
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'confirmPassword') {
      setPasswordError('');
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
      setPetProfileError('');
    } else {
      setPreviewURL(null);
      setPetProfileError('No image selected')
    }
  };

  const handleSubmit = async (e) => {
    setSubmitButtonState(false);
    e.preventDefault();
    // Check if the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match.");

      setSubmitButtonState(true);
      return;
    }

    if(file === null) {
      setPetProfileError('No image selected')
    }

    try {

      const formDataWithFile = new FormData();
      formDataWithFile.append("guid", String(guid));
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      formDataWithFile.append("file", file);


      const response = await fetch('https://petnfc.com.au/api/v1/pet/register', {
        method: 'POST',
        body: formDataWithFile
      });

      if (!response.ok) {

        setSubmitButtonState(true);
        throw new Error('Network response was not ok.');
      }

      // Do something with the successful response, if needed
      const data = await response.json();
      if (data.status_code === 200) {
        openAlertModal();
      }
      else{
        alert(data.detail);
      }
      console.log(data);

      setSubmitButtonState(true);
    } catch (error) {

      setSubmitButtonState(true);
      console.error('Error submitting form data:', error);
    }

  };

  return (
    <>
      <div className='bg-fixed grid place-items-center px-2' style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100%',
      }}>
      <div className="container w-full sm:w-3/5 my-2 sm:my-24 bg-white opacity-95 px-6 py-8 sm:px-12 sm:py-16 rounded-lg " >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Owner Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.firstname} onChange={handleChange} 
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="firstname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.lastname} onChange={handleChange} 
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="lastname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.email} onChange={handleChange} 
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={30}
                  value={formData.phoneNo} onChange={handleChange} 
                  id="phoneNo"
                  name="phoneNo"
                  type="text"
                  autoComplete="phoneNo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <StateSelect
            selectedState={formData.state_code}
            handleChange={handleStateChange}
          />

          <CitySelect
            selectedCity={formData.city_id}
            selectedState={formData.state_code}
            handleChange={handleCityChange}
          />

            <div className="sm:col-span-4 sm:col-start-1">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Street Address
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.address} onChange={handleChange} 
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={10}
                  value={formData.postalCode} onChange={handleChange} 
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  autoComplete="postalCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="contactPerson" className="block text-sm font-medium leading-6 text-gray-900">
                Secondary Contact Person
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={30}
                  value={formData.contactPerson} onChange={handleChange} 
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  autoComplete="contactPerson"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={30}
                  value={formData.contactPersonNo} onChange={handleChange} 
                  id="contactPersonNo"
                  name="contactPersonNo"
                  type="text"
                  autoComplete="contactPersonNo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">Pet Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Kindly enter your pet details accurately.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="col-span-full">
              {/* <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Pet Photo
              </label> */}
              <div className="mt-2 flex flex-col items-start gap-4 gap-x-3">
              
              {/* Image Preview */}
              {previewURL ? (
                <img
                  className="object-cover h-32 w-32 rounded-full ring-2 ring-offset-2 ring-slate-300"
                  src={previewURL} 
                  alt=""


            onClick={handleImageClick}
                />
              ) : (
                <UserCircleIcon className="h-32 w-32 rounded-full text-gray-300 ring-2 ring-offset-2 ring-slate-300" aria-hidden="true" />
              )}

              <p className='font-bold text-red-500 text-sm'>{petProfileError}</p>

              

              <label
              htmlFor="file"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Select Pet Photo
                </label>
                <span className="text-sm leading-6 text-gray-600">The image selected will be the display picture of your pet in the website. </span>
                <input
                className='hidden'
                type="file"
                id='file'
                name='file'
                accept="image/png, image/gif, image/jpeg"
                onChange={handleFileChange}
              />
              </div>
            </div>

          <PetTypeSelect
            selectedPetType={formData.petType}
            handleChange={handleChange}
          />


            <div className="sm:col-span-3">
              <label htmlFor="petGender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  required
                  value={formData.petGender} onChange={handleChange} 
                  id="petGender"
                  name="petGender"
                  autoComplete="petGender"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Pet's Gender</option>
                  <option value="Male">Male</option>
                  <option value="Desexed Male">Desexed Male</option>
                  <option value="Female">Female</option>
                  <option value="Desexed Female">Desexed Female</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="petName" className="block text-sm font-medium leading-6 text-gray-900">
                Pet Name
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.petName} onChange={handleChange} 
                  id="petName"
                  name="petName"
                  type="text"
                  autoComplete="petName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="petMicrochipNo" className="block text-sm font-medium leading-6 text-gray-900">
                Microchip Number
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={15}
                  value={formData.petMicrochipNo} onChange={handleChange} 
                  id="petMicrochipNo"
                  name="petMicrochipNo"
                  type="text"
                  autoComplete="petMicrochipNo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="petBreed" className="block text-sm font-medium leading-6 text-gray-900">
                Breed
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={30}
                  value={formData.petBreed} onChange={handleChange} 
                  type="text"
                  name="petBreed"
                  id="petBreed"
                  autoComplete="petBreed"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="petColor" className="block text-sm font-medium leading-6 text-gray-900">
                Color
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={30}
                  value={formData.petColor} onChange={handleChange} 
                  type="text"
                  name="petColor"
                  id="petColor"
                  autoComplete="petColor"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="petBirthMonth" className="block text-sm font-medium leading-6 text-gray-900">
                Date of Birth - Month
              </label>
              <div className="mt-2">
                <input
                  required
                  min={1}
                  max={12}
                  value={formData.petBirthMonth} onChange={handleChange} 
                  id="petBirthMonth"
                  name="petBirthMonth"
                  type="number"
                  autoComplete="petBirthMonth"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="petBirthYear" className="block text-sm font-medium leading-6 text-gray-900">
              Date of Birth - Year
              </label>
              <div className="mt-2">
                <input
                  required 
                  min={1900}
                  max={currentYear}
                  value={formData.petBirthYear} onChange={handleChange} 
                  id="petBirthYear"
                  name="petBirthYear"
                  type="number"
                  autoComplete="petBirthYear"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">Login Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Set your username and password to your account.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.username} onChange={handleChange} 
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  required
                  minLength={8}
                  maxLength={100}
                  value={formData.password} onChange={handleChange} 
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="petColor" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  required
                  maxLength={100}
                  value={formData.confirmPassword} onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm sm:leading-6"
                />

                {passwordError && 
                <p className='text-sm font-semibold mt-2 text-red-500'>{passwordError}</p>}
                {/* <p className='hidden text-sm font-semibold mt-2 text-red-500'>Password doesn't match</p> */}
              </div>
            </div>

          

          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </a>
        <button
          disabled={!isEnabledSubmit}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
      </form>
    </div>
      </div>


    {/* Modal overlay */}
    {isOpenImagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg">
            {/* Image inside the modal */}
            <img
              className="object-contain rounded-lg max-h-screen"
              src={previewURL}
              alt=""
              
            />

            
          {/* Close button */}
          <button
              className="absolute top-1 right-1 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={closePreviewModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}


      <Transition appear show={isOpenModalAlert} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAlertModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Pet Recorded!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You and your pet information successfully recorded.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>router.push(`/pet/${guid}`)}
                    >
                      Okay
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
