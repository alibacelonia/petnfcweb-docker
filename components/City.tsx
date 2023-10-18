import React, { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const CitySelect =  ({ selectedCity, selectedState, handleChange }) => {
  const [cities, setState] = useState([]);
  const [selectedCityName, setSelectedCity] = useState({});

  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchPetType = async () => {
      try {
        const response = await fetch(
          `/lottie/cities.json`
        ); // Replace with the actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        const filteredData = data.filter((city)=> {return city.country_code == "AU" && city.state_code == selectedState})
        const selectedCityData = filteredData.find((city) => city["id"] == selectedCity)
        setState(filteredData); // Assuming the API response is an array of country objects with a name property
        setSelectedCity(selectedCityData);
        
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchPetType();
  }, [selectedState, selectedCity]);
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Suburb{" "}
        <span className="text-red-500 text-base">*</span>
      </label>
      <div className="mt-1">
        <Combobox value={selectedCityName} onChange={handleChange} name="city">
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300  shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="block w-full rounded-md border-0 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:text-sm sm:leading-6"
                displayValue={(city) => (selectedCity ? city["name"] : "")}
                onChange={(event) => {
                  // setQuery(event.target.value);
                }}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              // afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {cities.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  cities.map((city) => (
                    <Combobox.Option
                      key={city.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {city.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default CitySelect;
