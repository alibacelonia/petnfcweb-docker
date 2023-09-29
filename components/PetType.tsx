import React, { useState, useEffect } from 'react';

const PetTypeSelect = ({ selectedPetType, handleChange }) => {
  const [petType, setpetType] = useState([]);

  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchPetType = async () => {
      try {
        const response = await fetch('https://petnfc.com.au/api/v1/pet/pet-types'); // Replace with the actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setpetType(data); // Assuming the API response is an array of country objects with a name property
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchPetType();
  }, []);

  return (
    <div className="sm:col-span-3">
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
        Pet Type
        </label>
        <div className="mt-2">
        <select
            // required
            value={selectedPetType} onChange={handleChange}
            id="petType"
            name="petType"
            autoComplete="petType"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
            <option value="">Select pet type</option>
            {petType.map((e) => (
            <option key={e.type_id} value={e.type_id}>
                {e.type}
            </option>
            ))}
        </select>
        </div>
    </div>
  );
};

export default PetTypeSelect;
