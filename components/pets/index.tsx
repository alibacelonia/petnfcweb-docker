import { AiOutlinePlus } from "react-icons/ai";
import PetCards from "./cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import cookieCutter from "@boiseitguru/cookie-cutter";

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

    const auth_token = cookieCutter.get("auth_token");
    const auth_token_type = cookieCutter.get("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    if (auth_token == undefined || auth_token == null) {
      push("/signin");
    } else {
      const cookieUserDetails = cookieCutter.get("pets");
      if (cookieUserDetails === null || cookieUserDetails === undefined) {
        axios
          .get(`http://localhost:8000/api/v1/user/${userID}/pets`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            setPets(response.data);
            cookieCutter.set("pets", JSON.stringify(response.data));

            // setUser(response.data.status_code);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.status_code === 403) {
              cookieCutter.set("auth_token", "", { expires: new Date(0) });
              cookieCutter.set("auth_token_type", "", { expires: new Date(0) });
              cookieCutter.set("active_page", "", { expires: new Date(0) });
              cookieCutter.set("active_page_data", "", {
                expires: new Date(0),
              });
              cookieCutter.set("user_details", "", { expires: new Date(0) });
              cookieCutter.set("pets", "", { expires: new Date(0) });

              push("/signin");
            }
          });
      } else {
        setPets(JSON.parse(cookieUserDetails));
      }
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
            onClick={() => onPageChange("pets_add")}
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
