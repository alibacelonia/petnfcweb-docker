import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import PetTypeSelect from "../../components/PetType";

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};


export default function Example() {
  const router = useRouter();
  const { guid } = router.query;
  const currentYear = new Date().getFullYear();
  // set formdata
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
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

  const [passwordError, setPasswordError] = useState('');
  const [isEnabledSubmit, setSubmitButtonState] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'confirmPassword') {
      setPasswordError('');
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

    try {
      const requestBody = {
        guid: guid,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        address: formData.address,
        postalCode: formData.postalCode,
        phoneNo: formData.phoneNo,
        contactPerson: formData.contactPerson,
        contactPersonNo: formData.contactPersonNo,
    
        petType: formData.petType,
        petGender: formData.petGender,
        petName: formData.petName,
        petMicrochipNo: formData.petMicrochipNo,
        petBreed:formData.petBreed,
        petColor: formData.petColor,
        petBirthMonth: formData.petBirthMonth,
        petBirthYear: formData.petBirthYear,
    
        username: formData.username,
        password: formData.password
      }

      const response = await fetch('http://127.0.0.1:8000/api/v1/pet/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {

        setSubmitButtonState(true);
        throw new Error('Network response was not ok.');
      }

      // Do something with the successful response, if needed
      const data = await response.json();
      if (data.status_code === 200) {
        alert("Pet successfully registered");
        router.push("/")
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
      <div className='grid place-items-center'>
      <div className="container w-4/5 sm:w-3/5 mt-32 mb-32">
      <form onSubmit={handleSubmit}>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-5 sm:col-start-1">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        <a href="http://localhost:3000" className="text-sm font-semibold leading-6 text-gray-900">
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
    </>
  )
}
