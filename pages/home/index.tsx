import { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../../components/Sidebar";
import MyProfilePage from "./profile";
import MyFeedbackPage from "./feedback";
import MyPetsPage from "./pets";
import React from "react";
import MySettingsPage from "./settings";
import { useRouter } from "next/navigation";
import MyPetDetailsPage from "./pets/details";
import EditPetDetails from "./pets/details/edit";
import EditUserDetails from "./profile/edit";
import AddPet from "./pets/add";
import cookieCutter from '@boiseitguru/cookie-cutter'

export default function MyHomePage() {
  const { push } = useRouter();
  const [user, setUser] = useState({});
  const [selectedPet, setSelectedPet] = useState({});
  const [currentPage, setCurrentPage] = useState("");

  const handlePageChange = (page: string, data: object = {}) => {
    localStorage.setItem("active_page", page);
    localStorage.setItem("active_page_data", JSON.stringify(data));

    setCurrentPage(page);
    
    if(page.split("_")[0] === "pets"){
      if(Object.keys(data).length > 0){
        setSelectedPet(data);
      }
    }
    if(page.split("_")[0] === "profile"){
      if(Object.keys(data).length > 0){
        setUser(data);
      }
    }
  };

  const renderPage = (page: string) => {
    switch (page) {
      case "pets":
        return <MyPetsPage userID={user["user_id"]} onPageChange={handlePageChange} />

      case "pets_add":
        return <AddPet userID={user["user_id"]} onPageChange={handlePageChange} />

      case "pets_details":
        return <MyPetDetailsPage userID={user["user_id"]} onPageChange={handlePageChange} data={selectedPet} />

      case "pets_edit_details":
        return  <EditPetDetails onPageChange={handlePageChange} data={selectedPet} />;

      case "profile":
        return <MyProfilePage onPageChange={handlePageChange} data={user} />;

      case "profile_edit_details":
        return  <EditUserDetails onPageChange={handlePageChange} data={user} />;

      case "feedback":
        return <MyFeedbackPage />;

      case "settings":
        return <MySettingsPage />;

      default:
        setCurrentPage("pets");
        return (
          <MyPetsPage
            userID={user["user_id"]}
            onPageChange={handlePageChange}
          />
        );
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      // remove token form local storage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_token_type");

      push("/signin");
    }
  };

  useEffect(() => {
    // get token from local storage
    // const auth_token = localStorage.getItem("auth_token");
    // const auth_token_type = localStorage.getItem("auth_token_type");
    // const token = auth_token_type + " " + auth_token;
    const auth_token = cookieCutter.get('auth_token');
    const auth_token_type = cookieCutter.get('auth_token_type');
    const token = auth_token_type + " " + auth_token;

    
    const active_page = localStorage.getItem("active_page");
    const active_page_data = JSON.parse(localStorage.getItem("active_page_data"));
    if(active_page==null){
      setCurrentPage("pets");
    }
    else{
      setCurrentPage(active_page);
      if(active_page.split("_")[0] === "pets"){
        if(active_page_data){
          setSelectedPet(active_page_data);
        }
      }
      if(active_page.split("_")[0] === "profile"){
        if(active_page_data){
          setUser(active_page_data);
        }
      }
    }
    

    const localStorageUserDetails = localStorage.getItem("user_details")
    if(localStorageUserDetails === null){
      axios
        .get("http://localhost:8000/api/v1/user/profile/details/", {
          headers: { Authorization: token },
        })
        .then((response) => {
          localStorage.setItem("user_details", JSON.stringify(response.data));
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.status_code === 403) {
            cookieCutter.set('auth_token', '', { expires: new Date(0) })
            cookieCutter.set('auth_token_type', '', { expires: new Date(0) })
            // localStorage.removeItem("auth_token");
            // localStorage.removeItem("auth_token_type");
  
            localStorage.removeItem("active_page");
            localStorage.removeItem("active_page_data")
            
            localStorage.removeItem("user_details")
  
            localStorage.removeItem("pets")
            push("/signin");
          }
        });
    }
    else{
      setUser(JSON.parse(localStorageUserDetails));
    }
    
  }, []);

  return (
    <>
      <div className="min-h-screen grid grid-cols-12 no-scrollbar">
        <SideNavbar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
        />
        {renderPage(currentPage)}
      </div>
    </>
  );
}
