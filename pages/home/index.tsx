import { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../../components/Sidebar";
import MyFeedbackPage from "../../components/feedback";
import React from "react";
import { useRouter } from "next/navigation";
import cookieCutter from "@boiseitguru/cookie-cutter";
import MyPetsPage from "../../components/pets";
import AddPet from "../../components/pets/add";
import MyPetDetailsPage from "../../components/pets/details";
import EditPetDetails from "../../components/pets/details/edit";
import MyProfilePage from "../../components/profile";
import EditUserDetails from "../../components/profile/edit";
import MySettingsPage from "../../components/settings";

export default function MyHomePage() {
  const { push } = useRouter();
  const [user, setUser] = useState({});
  const [selectedPet, setSelectedPet] = useState({});
  const [currentPage, setCurrentPage] = useState("");

  const handlePageChange = (page: string, data: object = {}) => {
    cookieCutter.set("active_page", page);
    cookieCutter.set("active_page_data", JSON.stringify(data));

    setCurrentPage(page);

    if (page.split("_")[0] === "pets") {
      if (Object.keys(data).length > 0) {
        setSelectedPet(data);
      }
    }
    if (page.split("_")[0] === "profile") {
      if (Object.keys(data).length > 0) {
        setUser(data);
      }
    }
  };

  const renderPage = (page: string) => {
    switch (page) {
      case "pets":
        return (
          <MyPetsPage
            userID={user["user_id"]}
            onPageChange={handlePageChange}
          />
        );

      case "pets_add":
        return (
          <AddPet userID={user["user_id"]} onPageChange={handlePageChange} />
        );

      case "pets_details":
        return (
          <MyPetDetailsPage
            userID={user["user_id"]}
            onPageChange={handlePageChange}
            data={selectedPet}
          />
        );

      case "pets_edit_details":
        return (
          <EditPetDetails onPageChange={handlePageChange} data={selectedPet} />
        );

      case "profile":
        return <MyProfilePage onPageChange={handlePageChange} data={user} />;

      case "profile_edit_details":
        return <EditUserDetails onPageChange={handlePageChange} data={user} />;

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
      cookieCutter.set("auth_token", "", { expires: new Date(0) });
      cookieCutter.set("auth_token_type", "", { expires: new Date(0) });

      push("/signin");
    }
  };

  useEffect(() => {
    const auth_token = cookieCutter.get("auth_token");
    const auth_token_type = cookieCutter.get("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    const active_page = cookieCutter.get("active_page");
    const active_page_data = cookieCutter.get("active_page_data");
    if (active_page == null) {
      setCurrentPage("pets");
    } else {
      setCurrentPage(active_page);
      if (active_page.split("_")[0] === "pets") {
        if (active_page_data) {
          setSelectedPet(active_page_data);
        }
      }
      if (active_page.split("_")[0] === "profile") {
        if (active_page_data) {
          setUser(active_page_data);
        }
      }
    }

    if (auth_token == undefined || auth_token == null) {
      push("/signin");
    } else {
      const cookieUserDetails = cookieCutter.get("user_details");
      if (cookieUserDetails === null || cookieUserDetails === undefined) {
        axios
          .get("http://localhost:8000/api/v1/user/profile/details/", {
            headers: { Authorization: token },
          })
          .then((response) => {
            cookieCutter.set("user_details", JSON.stringify(response.data));
            setUser(response.data);
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
        setUser(JSON.parse(cookieUserDetails));
      }
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
