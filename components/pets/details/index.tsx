import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  BiEditAlt,
  BiPlus,
  BiSolidVirus,
  BiSolidInjection,
  BiTrash,
} from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";

export default function MyPetDetailsPage({ userID, onPageChange, data }) {
  const { push } = useRouter();
  console.info("PetData: ", data);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const calculateAge = (
    birthMonth: number = data.date_of_birth_month,
    birthYear: number = data.date_of_birth_year
  ) => {
    const today = new Date();
    const birthdate = new Date(birthYear, birthMonth - 1);

    let ageYears = today.getFullYear() - birthdate.getFullYear();
    let ageMonths = today.getMonth() - birthdate.getMonth();

    if (today.getDate() < birthdate.getDate()) {
      ageMonths--;
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageYears === 0) {
      return `${ageMonths} ${ageMonths === 1 ? "month" : "months"} old`;
    } else {
      return `${ageYears} ${ageYears === 1 ? "year" : "years"} old`;
    }
  };

  const formatString = (input: string): string => {
    const groups = input.match(/.{1,3}/g);
    if (groups) {
      return groups.join("-");
    }
    return input;
  };

  const onGoing = () => {
    alert("Ongoing development...");
  };

  return (
    <>
      <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12">
        <div className="flex items-end min-w-full justify-between ">
          <h1 className="text-xl lg:text-2xl tracking-normal font-bold text-gray-700 py-3">
            My Pet Details
          </h1>
          <button
            onClick={() => onPageChange("pets_edit_details", data)}
            className="text-xs lg:text-sm text-white bg-gradient-to-r from-blue-400 to-blue-500 px-5 py-3 rounded-full shadow-md  "
          >
            <BiEditAlt size={18} className="inline" /> Edit Details
          </button>
        </div>

        <div className="relative bg-white mt-5 rounded-2xl shadow-md p-4 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 mt-2 relative">
            <div className="col-span-full md:col-span-3 relative ">
              <div className="flex bg-red-1000 items-center justify-center relative">
                <div className="p-1 border-4 border-amber-400 rounded-full">
                  <img
                    className="inline-block h-40 w-40 rounded-full ring-2 ring-white object-cover "
                    src={`http://localhost:8000/userdata/${userID}/${data.unique_id}/profile/${data.main_picture}`}
                    alt="Pet Image"
                  />
                </div>
              </div>

              <div className="bg-green-1000 mt-2 flex flex-col items-center">
                <h1 className="font-semibold tracking-wide text-center text-gray-600 text-2xl">
                  {data.name}
                </h1>
              </div>
            </div>
            <div className="col-span-full md:col-span-5 mt-4 md:mt-0 relative">
              <div className="grid gap-2 grid-cols-12 bg-gray-50">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Microchip ID:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{formatString(data.microchip_id)}</h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12 ">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Species:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{data.pet_type_id == 1 ? "Dog" : "Cat"}</h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12 bg-gray-50">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Breed:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{data.breed}</h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Age:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{calculateAge()}</h1>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-4 relative">
              <div className="grid gap-2 grid-cols-12 bg-gray-50">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Gender:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>
                    {data.gender.split(" ").length > 1
                      ? data.gender.split(" ")[1]
                      : data.gender}
                  </h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Desexed:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{data.gender.split(" ").length > 1 ? "Yes" : "No"}</h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12 bg-gray-50">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Color:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{data.color}</h1>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-12">
                <div className="col-start-2 col-span-4 text-gray-700 py-4">
                  <h1>Weight:</h1>
                </div>
                <div className="col-span-6 font-bold text-gray-700 py-4">
                  <h1>{data.weight} lbs</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center min-w-full justify-between mt-10">
          <h1 className="text-xl sm:text-2xl tracking-normal font-bold text-gray-700">
            Medical History
          </h1>
          {/* <button onClick={() => onGoing()} className='text-xs lg:text-sm text-white bg-gradient-to-r from-blue-400 to-blue-500 px-5 py-3 rounded-full shadow-md  '>
                    <BiPlus size={18} className='inline'/> Add Record
                </button> */}
        </div>

        <div className="grid grid-cols-12 gap-2 bg-white mt-5 rounded-2xl shadow-md divide-y md:divide-y-0 divide-x-0 md:divide-x ">
          <div className="col-span-full md:col-span-4 p-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <BiSolidVirus size={20} className=" text-gray-700" />
                <h1 className="text-base font-bold text-gray-700">Allergies</h1>
              </div>
              <button
                onClick={() => onGoing()}
                className="text-xs text-white bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 rounded-full shadow-md  "
              >
                Add Record
              </button>
            </div>

            <div className="mt-4">
              {/* <div className='flex flex-row items-center justify-between py-2 mt-1'>
                            <div className='flex flex-col'>
                                <h1 className='text-sm font-bold text-gray-700'>Pollen</h1>
                                <h1 className='text-xs text-gray-400'>Itchy nose and watery eyes</h1>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <button className='rounded-full text-xs text-white bg-red-400 px-1.5 py-1.5 shadow-lg  '>
                                    <BiTrash size={18} className=''/>
                                </button>
                                <button className='rounded-full text-xs text-white bg-slate-500 px-1.5 py-1.5 shadow-lg  '>
                                    <BiEditAlt size={18} className=''/>
                                </button>
                            </div>
                        </div> */}

              <div className="flex items-center justify-center h-16 w-full">
                <h1 className="text-sm font-semibold text-gray-400">
                  No allergies
                </h1>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-4 p-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <GiMedicines size={22} className=" text-gray-700" />
                <h1 className="text-base font-bold text-gray-700">
                  Medications
                </h1>
              </div>
              <button
                onClick={() => onGoing()}
                className="text-xs text-white bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 rounded-full shadow-md  "
              >
                Add Record
              </button>
            </div>
            <div className="mt-4">
              {/* <div className='flex flex-row items-center justify-between py-2 mt-1'>
                            <div className='flex flex-col'>
                                <h1 className='text-sm font-bold text-gray-700'>Ridocane</h1>
                                <h1 className='text-xs text-gray-400'>250 mg</h1>
                                <h1 className='text-xs text-gray-400'>3 times a day</h1>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <button className='rounded-full text-xs text-white bg-red-400 px-1.5 py-1.5 shadow-lg  '>
                                    <BiTrash size={18} className=''/>
                                </button>
                                <button className='rounded-full text-xs text-white bg-slate-500 px-1.5 py-1.5 shadow-lg  '>
                                    <BiEditAlt size={18} className=''/>
                                </button>
                            </div>
                        </div> */}

              <div className="flex items-center justify-center h-16 w-full">
                <h1 className="text-sm font-semibold text-gray-400">
                  No medications
                </h1>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-4 p-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <BiSolidInjection
                  size={20}
                  className=" text-gray-700 rotate-180"
                />
                <h1 className="text-base font-bold text-gray-700">Vaccines</h1>
              </div>
              <button
                onClick={() => onGoing()}
                className="text-xs text-white bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 rounded-full shadow-md  "
              >
                Add Record
              </button>
            </div>
            <div className="mt-4">
              {/* <div className='flex flex-row items-center justify-between py-2 mt-1'>
                            <div className='flex flex-col'>
                                <h1 className='text-sm font-bold text-gray-700'>Rabbies</h1>
                                <h1 className='text-xs text-gray-400'>Montana General Hospital</h1>
                                <h1 className='text-xs text-gray-400'>March 12, 2022</h1>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <button className='rounded-full text-xs text-white bg-red-400 px-1.5 py-1.5 shadow-lg  '>
                                    <BiTrash size={18} className=''/>
                                </button>
                                <button className='rounded-full text-xs text-white bg-slate-500 px-1.5 py-1.5 shadow-lg  '>
                                    <BiEditAlt size={18} className=''/>
                                </button>
                            </div>
                        </div> */}

              <div className="flex items-center justify-center h-16 w-full">
                <h1 className="text-sm font-semibold text-gray-400">
                  No vaccinations yet
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
