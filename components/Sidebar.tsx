import React, { FC, MouseEventHandler } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlinePets,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Image from "next/image";
import { IconBase, IconType } from "react-icons";
import { PiPawPrintBold } from "react-icons/pi";
import { LiaPawSolid } from "react-icons/lia";

import Link from "next/link";

interface Menu {
  id: number;
  isActive: boolean;
  page: string;
  label: string;
  icon: IconType;
}

interface SidebarProps {
  currentPage: string;
  onPageChange: Function;
  onLogout: Function;
}

const SideNavbar: FC<SidebarProps> = (props): JSX.Element => {
  const menu: Menu[] = [
    {
      id: 1,
      isActive: props.currentPage.split("_")[0] === "pets",
      page: "pets",
      label: "My Pets",
      icon: PiPawPrintBold,
    },
    {
      id: 2,
      isActive: props.currentPage.split("_")[0] === "profile",
      page: "profile",
      label: "Profile",
      icon: CgProfile,
    },
    {
      id: 3,
      isActive: props.currentPage.split("_")[0] === "feedback",
      page: "feedback",
      label: "Feedback",
      icon: FaRegComments,
    },
  ];

  return (
    <Disclosure>
      <Disclosure.Button className="absolute top-4 left-4 inline-flex items-center peer justify-center rounded-md p-2 bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
        <GiHamburgerMenu
          className="block lg:hidden h-6 w-6"
          aria-hidden="true"
        />
      </Disclosure.Button>
      <div className="p-6 w-60 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-start item-center">
          <div className="flex justify-center items-center pb-3 border-b border-gray-100">
            <Image
              src={"/assets/logo-blue.png"}
              alt={""}
              width={48}
              height={48}
            />
            <h1 className="text-lg text-center cursor-pointer font-bold text-[#0E67B5]">
              PetNFC
            </h1>
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4">
            {menu.map((item) => {
              const IconComponent = item.icon; // Assuming `item.icon` is a React component

              return (
                <div
                key={item.id}
                  onClick={() => props.onPageChange(item.page)}
                  className={`flex mb-2 justify-start items-center gap-3 pl-5 ${
                    item.isActive
                      ? "bg-blue-500 shadow-lg"
                      : "hover:bg-blue-500 hover:shadow-lg"
                  } p-2 rounded-md group cursor-pointer m-auto`}
                >
                  {React.createElement(IconComponent, {
                    className: `text-2xl ${
                      item.isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-white"
                    }`,
                  })}
                  <h3
                    className={`text-sm ${
                      item.isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-white"
                    } font-semibold`}
                  >
                    {item.label}
                  </h3>
                </div>
              );
            })}
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div
              onClick={() => props.onPageChange("settings")}
              className={`flex mb-2 justify-start items-center gap-3 pl-5 ${
                props.currentPage === "settings"
                  ? "bg-blue-500 shadow-lg"
                  : "hover:bg-blue-500 hover:shadow-lg"
              } p-2 rounded-md group cursor-pointer m-auto`}
            >
              <MdOutlineSettings
                className={`text-2xl ${
                  props.currentPage === "settings"
                    ? "text-white"
                    : "text-gray-700 group-hover:text-white"
                }`}
              />
              <h3
                className={`text-sm ${
                  props.currentPage === "settings"
                    ? "text-white"
                    : "text-gray-700 group-hover:text-white"
                } font-semibold`}
              >
                Settings
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className=" my-4">
            <div
              onClick={() => props.onLogout()}
              className="flex mb-2 justify-start items-center gap-3 pl-5 border border-gray-200 hover:bg-red-600 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-sm text-gray-800 group-hover:text-white font-semibold ">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default SideNavbar;
