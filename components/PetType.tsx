import { Listbox, Transition } from "@headlessui/react";
import React, { useState, useEffect, Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import cache from "memory-cache";
const PetTypeSelect = ({ selectedPetType, handleChange }) => {
  const [petType, setpetType] = useState([]);

  const selectedType = petType.find((e) => e["type_id"] === selectedPetType);

  useEffect(() => {
    // Fetch the list of countries from the API
    const cachedFetch = async (url) => {
      const cachedResponse = cache.get(url);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        const hours = 24;
        const response = await fetch(url);
        const data = await response.json();
        cache.put(url, data, hours * 1000 * 60 * 60);
        return data;
      }
    };

    const fetchPetType = async () => {
      try {
        const response = await cachedFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pet/pet-types`
        );
        console.info("PetTypes: ", response);
        if (!response) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response;
        setpetType(data); // Assuming the API response is an array of country objects with a name property
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchPetType();
  }, [selectedType]);

  return (
    <>
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Pet Type <span className="text-red-500 text-base">*</span>
      </label>
      <div className="mt-1">
        <Listbox value={selectedPetType} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg ring-1 ring-inset ring-gray-300  bg-white py-3.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate text-sm ">
                {selectedType ? selectedType["type"] : ""}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {petType.map((month, monthIdx) => (
                  <Listbox.Option
                    key={monthIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={month.type_id}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {month.type}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {/* <select
          // required
          value={selectedPetType}
          onChange={handleChange}
          id="petType"
          name="petType"
          autoComplete="petType"
          className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="">Select pet type</option>
          {petType.map((e) => (
            <option key={e.type_id} value={e.type_id}>
              {e.type}
            </option>
          ))}
        </select> */}
      </div>
    </>
  );
};

export default PetTypeSelect;
