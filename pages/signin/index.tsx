import Link from "next/link";
import Image from "next/image";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyPets from "../home/pets";
import MyHomePage from "../home";
import { useRouter } from "next/navigation";
import cookieCutter from '@boiseitguru/cookie-cutter'

export default function SignIn() {
  const { push } = useRouter();
  const [token, setToken] = useState<string | null>();
  const [hasError, setError] = useState(false);

  useEffect(() => {

    const auth = cookieCutter.get('auth_token')
    // const auth = localStorage.getItem("auth_token");
    setToken(auth);
  }, [token]);

  const [isVisible, setVisibility] = useState(false);

  const [loginForm, setLoginform] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (label, event) => {
    setError(false);
    switch (label) {
      case "username":
        setLoginform({ ...loginForm, username: event.target.value });
        break;
      case "password":
        setLoginform({ ...loginForm, password: event.target.value });
        break;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // call api login
    await axios
      .post("http://localhost:8000/api/v1/auth/signin", loginForm)
      .then((response) => {
        // Save token to local storage
        cookieCutter.set('auth_token', response.data.data.access_token)
        cookieCutter.set('auth_token_type', response.data.data.token_type)
        // localStorage.setItem("auth_token", response.data.data.access_token);
        // localStorage.setItem("auth_token_type", response.data.data.token_type);
        // add successfully notif
        // reload page after success login
        window.location.href = "/home";
      })
      .catch((error) => {
        // add error notif
        setError(true);
      });
  };

  return token == null ? (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-white col-span-full rounded-l-lg rounded-r-lg lg:col-span-1 lg:rounded-r-none px-4">
          <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="flex items-center justify-center w-full max-w-sm mb-4">
              <Image
                src="/assets/logo-blue.png"
                width={75}
                height={75}
                alt="Picture of the author"
              />
              <h1 className="font-semibold text-[#0E67B5] text-2xl">PetNFC</h1>
            </div>
            <form
              className="flex flex-col form-container w-full max-w-sm mb-20"
              onSubmit={onSubmitHandler}
            >
              <h1 className="text-2xl text-center font-semibold text-gray-700">
                Sign In to your account
              </h1>
              <p className="text-sm text-center text-gray-500 mt-2">
                Welcome back!
              </p>

              <div className="flex items-center justify-center mt-4">
                <span
                  className={` transition ease-in-out duration-300 text-red-500 font-semibold ${
                    hasError ? "visible" : "hidden"
                  }`}
                >
                  Incorrect username or password.
                </span>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Username
                </label>
                <div className="">
                  <div
                    className={`flex rounded-md shadow-sm ring-inset ${
                      hasError ? "ring-red-500 ring-2 " : "ring-gray-300 ring-1"
                    }  focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600`}
                  >
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-2.5 lg:py-2 text-gray-700 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-sm sm:leading-6"
                      placeholder="Enter your username"
                      onChange={(event) => {
                        onChangeForm("username", event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="">
                  <div
                    className={`flex items-center rounded-md shadow-sm ring-inset ${
                      hasError ? "ring-red-500 ring-2 " : "ring-gray-300 ring-1"
                    }  focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600`}
                  >
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="password"
                      className="block flex-1 border-0 bg-transparent py-2.5 lg:py-2 text-gray-700 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-sm sm:leading-6"
                      placeholder="Enter your password"
                      onChange={(event) => {
                        onChangeForm("password", event);
                      }}
                    />
                    {isVisible ? (
                      <HiEyeOff
                        size={20}
                        className="flex select-none mx-3 text-gray-400"
                        onClick={() => {
                          setVisibility(!isVisible);
                        }}
                      ></HiEyeOff>
                    ) : (
                      <HiEye
                        size={20}
                        className="flex select-none mx-3 text-gray-400"
                        onClick={() => {
                          setVisibility(!isVisible);
                        }}
                      ></HiEye>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="bg-blue-500 w-full rounded-md text-white py-2.5 lg:py-2">
                  Sign In
                </button>
              </div>
            </form>
            <Link
              href={"/"}
              className="text-sm text-blue-300 hover:text-blue-500 transition duration-300 ease-out"
            >
              Back to Home Page
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 hidden lg:block rounded-r-lg relative">
          <div className="bg-blue-500 w-24 h-24 rounded-full absolute right-56 top-12"></div>
          <div className="bg-blue-500 w-4 h-4 rounded-full absolute right-56 top-12"></div>

          <div className="bg-blue-500 w-36 h-36 rounded-full absolute right-96 bottom-32"></div>
          <div className="bg-blue-500 w-8 h-8 rounded-full absolute right-56 bottom-12"></div>

          <div className="flex flex-col items-center justify-center min-h-screen relative">
            <div className="bg-blue-500 w-20 h-20 rounded-full absolute left-24 top-48"></div>
            <div className="bg-blue-500 w-12 h-12 rounded-full absolute left-40 top-12"></div>

            <div className="bg-blue-600 w-24 h-24 rounded-full absolute right-24 bottom-48"></div>
            <div className="bg-blue-600 w-8 h-8 rounded-full absolute right-24 top-56"></div>
            <Image
              width={220}
              height={1}
              className="z-50"
              src="/img/howitworks/Step-03.png"
              alt="Picture of the author"
            />
            <h1 className="text-slate-100 font-semibold text-lg mt-4 z-50">
              QR and NFC Tagging
            </h1>
            <p className="max-w-md text-slate-100 z-50">
              With a simple scan or tap, unlock a world of information,
              convenience, and possibilities for your pet’s data.
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <MyHomePage />
  );
}
