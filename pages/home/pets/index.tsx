import { AiOutlinePlus } from "react-icons/ai";
import PetCards from "./cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import cookieCutter from '@boiseitguru/cookie-cutter'

export default function MyPetsPage({ userID, onPageChange }) {
  const { push } = useRouter();

  const handleAddingPets = () => {
    alert("Ongoing development...");
  };

  const [pets, setPets] = useState([]);

  const noPets = () => {
    return (
      <>
        <div className="absolute min-h-screen min-w-full top-0 left-0 z-auto flex items-center justify-center">
          <h1>No registered pets yet.</h1>
        </div>
      </>
    );
  };

  useEffect(() => {
    // // get token from local storage
    // const auth_token = localStorage.getItem("auth_token");
    // const auth_token_type = localStorage.getItem("auth_token_type");

    const auth_token = cookieCutter.get('auth_token');
    const auth_token_type = cookieCutter.get('auth_token_type');
    const token = auth_token_type + " " + auth_token;


    const localStorageUserDetails = localStorage.getItem("pets")
    if(localStorageUserDetails === null){
      axios
      .get(`http://localhost:8000/api/v1/user/${userID}/pets`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setPets(response.data);
  
        localStorage.setItem("pets", JSON.stringify(response.data));
        // setUser(response.data.status_code);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.status_code === 403) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_token_type");
  
          localStorage.removeItem("active_page");
          localStorage.removeItem("active_page_data")
          
          localStorage.removeItem("user_details")
  
          localStorage.removeItem("pets")
          push("/signin");
        }
      });
    }
    else{
      setPets(JSON.parse(localStorageUserDetails));
    }

    

  }, [userID]);

  return (
    <>
      <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12">
        <div className="flex items-end min-w-full justify-between ">
          <h1 className="text-2xl tracking-normal font-bold text-gray-700">
            My Pets
          </h1>
          <button
            onClick={() => onPageChange('pets_add')}
            className="text-sm text-white bg-gradient-to-r from-blue-400 to-blue-500 px-5 py-3 rounded-full shadow-md  "
          >
            <AiOutlinePlus size={18} className="inline" /> Register Pet
          </button>
        </div>
        {pets.length > 0 ? (
          <PetCards
            user_id={userID}
            petData={pets}
            onPageChange={onPageChange}
          />
        ) : (
          noPets()
        )}
      </div>
    </>
  );
}
