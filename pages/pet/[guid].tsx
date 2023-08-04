import React from 'react';
import { useRouter } from 'next/router';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import { ThemeProvider } from "next-themes";
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const petFound = (response) => {
  return (
    <>
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar2 />  
      <div className='grid place-items-center mt-20 mb-20'>
        {/* <div className="flex -space-x-1 overflow-hidden">
          <img
            className="inline-block h-48 w-48 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div> */}
        <div className="container w-11/12 sm:w-1/2 mt-8 min-h-screen">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 light:text-slate-900">Pet Details</h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Pet Type</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet_type"]["type"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Microchip Number</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["microchip_id"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Gender</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["gender"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Breed</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["breed"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Color</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["pet"]["color"]}</dd>
              </div>
            </dl>
          </div>

          <div className="px-4 sm:px-0 mt-12">
            <h3 className="text-base font-semibold leading-7 light:text-gray-900">Pet Owner Details</h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Name</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["owner"]["first_name"]} {response["data"]["owner"]["last_name"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Contact Number</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0"><a href={`tel:${response["data"]["owner"]["phone_number"]}`}>{response["data"]["owner"]["phone_number"]}</a></dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["owner"]["email"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Address</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["owner"]["address"]}, {response["data"]["owner"]["post_code"]}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Secondary Contact Person</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0">{response["data"]["owner"]["secondary_contact"]} </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 light:text-gray-900">Contact Number</dt>
                <dd className="mt-1 text-sm leading-6 light:text-gray-700 sm:col-span-2 sm:mt-0"><a href={`tel:${response["data"]["owner"]["secondary_contact_number"]}`}>{response["data"]["owner"]["secondary_contact_number"]}</a></dd>
              </div>
            </dl>
          </div>


        </div>
      </div>
      <Footer /> 
      </ThemeProvider>
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
          <div className="flex flex-1 flex-col items-center place-items-center justify-center px-6 py-72 lg:px-8">
              <div className=" min-w-full sm:min-w-fit sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className="text-center mt-10 text-3xl font-bold leading-9 tracking-wide light:text-gray-900">PET RECORD FOUND!</h2>
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
        const res = await fetch(`http://127.0.0.1:8000/api/v1/pet/${guid}/details`); // Replace with your API endpoint
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
//     //   const res = await fetch(`http://127.0.0.1:8000/pet/${guid}/details`);

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
