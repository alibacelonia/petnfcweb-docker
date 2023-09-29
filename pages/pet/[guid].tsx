import React from 'react';
import { useRouter } from 'next/router';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import { ThemeProvider } from "next-themes";
import Lottie from "lottie-react";
import animationData from "../../public/lottie/record_found.json";

import bg from '../../public/bg/2.png'
import { 
  HiOutlineMail,
  HiOutlineDeviceMobile,
  HiOutlineLocationMarker,
  HiOutlinePhoneOutgoing
} from "react-icons/hi"

 import { 
  MdOutlineWhatsapp,
  
  } from "react-icons/md";

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const petFound = (response) => {
  return (
    <>
    {/* <ThemeProvider enableSystem={true} attribute="class">
      <Navbar2 />   */}
      <div className='bg-fixed grid place-items-center px-2' style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100%',
      }}>
        <div className='mt-12 mb-4'>
          <img
                      className="object-cover h-44 w-44 sm:h-60 sm:w-60 rounded-full ring-2 ring-offset-2 mb-8 ring-slate-300"
                      src={`https://petnfc.com.au/userdata/${response["data"]["pet"]["owner_id"]}/${response["data"]["pet"]["unique_id"]}/profile/${response["data"]["pet"]["main_picture"]}`} 
                      alt={response["data"]["pet"]["unique_id"]}


                // onClick={handleImageClick}
                    />
                    <h1 className='text-3xl font-bold tracking-wider text-center text-sky-700'>{(response["data"]["pet"]["name"]).toUpperCase()}</h1>
                    <h1 className='text-base  text-gray-700 tracking-wider text-center'>{response["data"]["pet"]["breed"]}</h1>
        </div>
        <div className='flex flex-row gap-5 mb-5'>
          <a href={`mailto:${response["data"]["owner"]["email"]}`}>
            <div className='bg-white p-3 shadow-md rounded-full' >
              <HiOutlineMail size={32} className="text-slate-600"></HiOutlineMail>
            </div>
          </a>

          <a href={`tel:${response["data"]["owner"]["phone_number"]}`}>
            <div className='bg-white p-3 shadow-md rounded-full' >
              <HiOutlineDeviceMobile size={32} className="text-slate-600"></HiOutlineDeviceMobile>
            </div>
          </a>

          <a href={`http://maps.google.com/?q=${response["data"]["owner"]["address"]} ${response["data"]["owner"]["city"]} ${response["data"]["owner"]["state"]}`} target="_blank" rel="noopener noreferrer">
            <div className='bg-white p-3 shadow-md rounded-full' >
              <HiOutlineLocationMarker size={32} className="text-slate-600"></HiOutlineLocationMarker>
            </div>
          </a>

          <a href={`https://wa.me/${response["data"]["owner"]["phone_number"]}`}  target="_blank" rel="noopener noreferrer">
            <div className='bg-white p-3 shadow-md rounded-full' >
              <MdOutlineWhatsapp size={32} className="text-slate-600"></MdOutlineWhatsapp>
            </div>
          </a>

        </div>
      <div className="container w-full sm:w-3/5 my-2 bg-white opacity-95 px-6 py-8 sm:px-12 sm:py-16 rounded-xl " >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-7 text-slate-700 text-center">About Me</h2>
        <p className="mt-3 text-sm sm:text-base leading-6 text-slate-700 text-center">Friendly and Fluffiest pet ever.</p>
      </div>

      <div className="container w-full sm:w-3/5 my-2 bg-white opacity-95 px-6 py-8 sm:px-12 sm:py-16 rounded-xl " >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-7 text-slate-700 text-center">Owner Information</h2>
        <p className="mt-3 text-sm sm:text-base leading-6 text-slate-700 text-center">Here are the details of the pet owner.</p>
        
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Name</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-1 sm:mt-0">{response["data"]["owner"]["first_name"]} {response["data"]["owner"]["last_name"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Contact Number</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-1 sm:mt-0"><a href={`tel:${response["data"]["owner"]["phone_number"]}`}>{response["data"]["owner"]["phone_number"]}</a></dd>
                <dd className="mt-4 sm:mt-0 leading-6 light:text-gray-700 sm:col-span-1 flex items-start sm:justify-end">
                  <a href={`tel:${response["data"]["owner"]["phone_number"]}`} className='text-white text-sm'>
                    <div className='bg-blue-700 flex flex-row gap-1 items-center justify-center w-32 rounded-full py-1'>
                    <HiOutlinePhoneOutgoing size={16} className="text-gray-100"></HiOutlinePhoneOutgoing> <span>Call</span>
                    </div>
                  </a>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Email address</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-1 sm:mt-0">{response["data"]["owner"]["email"]}</dd>
                <dd className="mt-4 sm:mt-0 text-base leading-6 light:text-gray-700 sm:col-span-1 flex items-start sm:justify-end">
                  <a href={`mailto:${response["data"]["owner"]["email"]}`} className='text-white text-sm '>
                      <div className='bg-blue-700 flex flex-row gap-1 items-center justify-center w-32 rounded-full py-1'>
                        <HiOutlineMail size={16} className="text-gray-100"></HiOutlineMail> <span>Email</span>
                      </div>
                  </a>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Address</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-1 sm:mt-0">{response["data"]["owner"]["address"]}, {response["data"]["owner"]["city"]}, {response["data"]["owner"]["state"]}, {response["data"]["owner"]["post_code"]}, </dd>
                <dd className="mt-4 sm:mt-0 leading-6 light:text-gray-700 sm:col-span-1 flex items-start sm:justify-end">
                  <a href={`http://maps.google.com/?q=${response["data"]["owner"]["address"]} ${response["data"]["owner"]["city"]} ${response["data"]["owner"]["state"]}`} target="_blank" rel="noopener noreferrer" className='text-white text-sm'>
                    <div className='bg-blue-700 flex flex-row gap-1 items-center justify-center w-32 rounded-full py-1'>
                    <HiOutlineLocationMarker size={16} className="text-gray-100"></HiOutlineLocationMarker> <span>View</span>
                    </div>
                  </a>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Secondary Contact Person</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["owner"]["secondary_contact"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-semibold leading-6 light:text-gray-900">Contact Number</dt>
                <dd className="mt-1 text-base leading-6 light:text-gray-700 sm:col-span-1 sm:mt-0"><a href={`tel:${response["data"]["owner"]["secondary_contact_number"]}`}>{response["data"]["owner"]["secondary_contact_number"]}</a></dd>
                <dd className="mt-4 sm:mt-0 leading-6 light:text-gray-700 sm:col-span-1 flex items-start sm:justify-end">
                  <a href={`tel:${response["data"]["owner"]["secondary_contact_number"]}`} className='text-white text-sm'>
                    <div className='bg-blue-700 flex flex-row gap-1 items-center justify-center w-32 rounded-full py-1'>
                    <HiOutlinePhoneOutgoing size={16} className="text-gray-100"></HiOutlinePhoneOutgoing> <span>Call</span>
                    </div>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
      </div>

      <div className="container w-full sm:w-3/5 my-2 bg-white opacity-95 px-6 py-8 sm:px-12 sm:py-16 rounded-xl " >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-7 text-slate-700 text-center">Other Information</h2>
        <p className="mt-3 text-sm sm:text-base leading-6 text-slate-700 text-center">These are my other details.</p>
      


        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 light:text-gray-900">Pet Type</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet_type"]["type"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 light:text-gray-900">Microchip Number</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["microchip_id"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 light:text-gray-900">Gender</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["gender"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 light:text-gray-900">Breed</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["breed"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 light:text-gray-900">Color</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["color"]}</dd>
              </div>
            </dl>
          </div>
      </div>
      <a href="/" className='block bg-sky-600 text-white px-10 py-2 mb-10 rounded-sm'>Visit Website</a>
      </div>

      {/* <Footer /> 
      </ThemeProvider> */}
    </>
  );
}

const petNotFound = () => {
  return (
    <>
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar2 />  
      <div className="min-h-screen min-w-screen relative flex items-center justify-center">
          <div className="absolute top-50 end-50 translate-middle-y flex items-center justify-center">
              <span className="text-2xl font-medium">404</span>
              <div className=" border border-r-slate-900 py-6 mx-5"></div>
              <span className="text-sm font-medium">No record found.</span>
          </div>
      </div>

      <Footer /> 
      </ThemeProvider>
    </>
  )
}

const petToRegister = (guid) => {
  return (
      <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Navbar2 />  
        <main className=''>
          <div className="flex flex-1 flex-col items-center place-items-center justify-center px-6 pt-32 pb-24 lg:px-8">
            <div>
              <Lottie
                animationData={animationData}
                className="flex justify-center items-center w-72 sm:w-96"
                loop={true}
              />
            </div>

                  <div className=" min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className="text-center mt-5 text-3xl font-bold leading-9 tracking-wide light:text-gray-900">PET RECORD FOUND!</h2>
                      <p className="text-center  mb-10 mt-5 text-base">It appears that your pet is not registered yet.</p>
                  </div>

                  <div className="mt-5 min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm">
                      <div className="space-y-6" >
                          
                          <div>
                          <a href={`/signin/${guid}`}
                              type="submit"
                              className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                              REGISTER PET
                          </a>
                          </div>
                      </div>
                  </div>
          </div>
      </main>
        <Footer /> 
        </ThemeProvider>
      </>
  );
}

const responsePage = () => {
  const router = useRouter();
  const { guid } = router.query;

  const [response, setPetData] = React.useState<any>(null);
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(isValidUUID(guid));
    
    // Fetch data based on the 'guid' parameter on the client side
    async function fetchPetData() {
      try {
        const res = await fetch(`https://petnfc.com.au/api/v1/pet/${guid}/details`); // Replace with your API endpoint
        const data = await res.json();
        setPetData(data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    }

    if (guid) {
      fetchPetData();
    }
  }, [guid]);

  return (
    isValid ? 
    
      response?.status_code == 200 ? 
      
      response.data.owner ? 

        petFound(response):

        petToRegister(guid):

      petNotFound()
    
    : 
    <>
      <div className="min-h-screen min-w-screen relative flex items-center justify-center">
          <div className="absolute top-50 end-50 translate-middle-y flex items-center justify-center">
              <span className="text-2xl font-medium">404</span>
              <div className=" border border-r-slate-900 py-6 mx-5"></div>
              <span className="text-sm font-medium">This page could not be found.</span>
          </div>
      </div>
    </>
  );
};

export default responsePage;




// import { UUID } from "crypto";
// import { redirect } from "next/navigation"
// import { useEffect, useState } from "react";
// import { useRouter } from 'next/router';


// export default async function responsePage({ params }: {params: {guid: string}}) {
//     // const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

//     // const isValidUUID = (uuid: string) => {
//     //     return uuidRegex.test(uuid);
//     // };

//     // const fetchresponse = async (guid: string) => {
//     //   const res = await fetch(`https://petnfc.com.au/pet/${guid}/details`);

//     //     if (!res.ok) {
//     //         throw new Error('Failed to fetch data from server');
//     //     }

//     //     return res.json()
//     // };




//     return (
//       <>
//       HELLO 
//       </>
//     )
//     // if (isValidUUID(params.guid)){
//     //     const response = await getData(params.guid);
//     //     if(response.status_code == 200){
//     //         if (response["data"]["owner"]){
//     //             return (
//     //                 <>
//     //                   <main className=''>
//     //                     <div className="flex min-h-screen flex-1 flex-col items-center place-items-center justify-center px-6 py-12 lg:px-8">
//     //                       <div className=" min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm bg-blue-200">
//     //                           <h2 className="text-center mt-10 text-2xl font-bold leading-9 tracking-wide light:text-gray-900">PET INFO</h2>
//     //                           <p className="text-left ml-5 mt-5 text-base capitalize"><span className="font-bold">Name:</span> <span>{response["data"]["pet"]["name"]}</span></p>
//     //                           <p className="text-left ml-5 text-base capitalize"><span className="font-bold">Gender:</span> <span>{response["data"]["pet"]["gender"]}</span></p>
//     //                           <p className="text-left ml-5 text-base capitalize"><span className="font-bold">Breed:</span> <span>{response["data"]["pet"]["breed"]}</span></p>
//     //                           <p className="text-left ml-5 mb-5 text-base capitalize"><span className="font-bold">Colour:</span> <span>{response["data"]["pet"]["color"]}</span></p>
//     //                       </div>
//     //                       <br />
//     //                       <div className=" min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm bg-indigo-200">
//     //                           <h2 className="text-center mt-10 text-2xl font-bold leading-9 tracking-wide light:text-gray-900">OWNER INFO</h2>
//     //                           <p className="text-left ml-5 mt-5 text-base capitalize"><span className="font-bold">Name:</span> <span>{response["data"]["owner"]["first_name"]} {response["data"]["owner"]["last_name"]} </span></p>
//     //                           <p className="text-left ml-5 text-base capitalize"><span className="font-bold">Address:</span> <span>{response["data"]["owner"]["address"]}</span></p>
//     //                           <p className="text-left ml-5 mb-5 text-base"><span className="font-bold">Contact:</span> <span><a href={`tel:${response["data"]["owner"]["phone_number"]}`}>{response["data"]["owner"]["phone_number"]}</a></span></p>
//     //                       </div>
              
//     //                       <div className="mt-5 min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm">
//     //                         <div className="space-y-6" >
                                
//     //                           <div>
//     //                             <a href={`tel:${"09616398508"}`}
//     //                                 type="submit"
//     //                                 className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//     //                             >
//     //                                 CALL OWNER
//     //                             </a>
              
//     //                           </div>
//     //                         </div>
//     //                       </div>
//     //                     </div>
//     //                   </main>
//     //                 </>
//     //               );
//     //         }
//     //         else{
//     //             return (
//     //                 <>
//     //                 <main className=''>
//     //                     <div className="flex min-h-screen flex-1 flex-col items-center place-items-center justify-center px-6 py-12 lg:px-8">
//     //                         <div className=" min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm bg-indigo-100">
//     //                         {/* <img
//     //                             className="mx-auto h-10 w-auto"
//     //                             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//     //                             alt="Your Company"
//     //                         /> */}
//     //                                 <h2 className="text-center mt-10 text-2xl font-bold leading-9 tracking-wide light:text-gray-900">RECORD FOUND!</h2>
//     //                                 <p className="text-center  mb-10 mt-5 text-base">It appears that your pet is not registered yet.</p>
//     //                             </div>

//     //                             <div className="mt-5 min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm">
//     //                                 <div className="space-y-6" >
                                        
//     //                                     <div>
//     //                                     <a href={`/signin/${params.guid}`}
//     //                                         type="submit"
//     //                                         className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//     //                                     >
//     //                                         REGISTER PET
//     //                                     </a>

//     //                                     <a
//     //                                         href="/"
//     //                                         className="mt-1 flex w-full justify-center bg-red-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//     //                                     >
//     //                                         RETURN HOME
//     //                                     </a>
//     //                                     </div>
//     //                                 </div>
//     //                             </div>
//     //                     </div>
//     //                 </main>
//     //                 </>
//     //             );
//     //         }
//     //     }
//     //     else if(response.status_code == 404){
//     //         return <>
//     //             <div className="min-h-screen min-w-screen relative flex items-center justify-center">
//     //                 <div className="absolute top-50 end-50 translate-middle-y flex items-center justify-center">
//     //                     <span className="text-2xl font-medium">404</span>
//     //                     <div className=" border border-r-slate-900 py-6 mx-5"></div>
//     //                     <span className="text-sm font-medium">No record found.</span>
//     //                 </div>
//     //             </div>
//     //         </>
//     //     }
//     // }
//     // else {
//     //     return <>
//     //         <div className="min-h-screen min-w-screen relative flex items-center justify-center">
//     //             <div className="absolute top-50 end-50 translate-middle-y flex items-center justify-center">
//     //                 <span className="text-2xl font-medium">404</span>
//     //                 <div className=" border border-r-slate-900 py-6 mx-5"></div>
//     //                 <span className="text-sm font-medium">This page could not be found.</span>
//     //             </div>
//     //         </div>
//     //         </>
//     // }
//   }
