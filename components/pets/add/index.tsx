import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'

const AddPet = ({ userID, onPageChange }) => {
    // const [scanResult, setScanResult] = useState(null);
    const delay = 100
    const [result, setScanResult] = useState("");

    const handleScan = (data) => {
        setScanResult(data);
    }

    const handleError = (err) => {
        console.error(err);
    }
  return (
    <>
      <div className="relative col-start-0 lg:col-start-3 col-span-full lg:col-span-10 bg-gray-100 mt-16 px-6 py-4 lg:mt-0 lg:px-12 lg:py-12">
        <div className="flex items-end min-w-full justify-between ">
          <h1 className="text-2xl tracking-normal font-bold text-gray-700 py-3">
            Register Pet
          </h1>
        </div>

      <div className="relative bg-white mt-5 rounded-2xl shadow-md p-4 overflow-hidden">
      <QrReader
            delay={delay}
            style={{height: 500,
                width: 500,}}
            onError={handleError}
            onScan={handleScan}
            />
            <p>{result}</p>
      </div>
      </div>
    </>
  );
};

export default AddPet;
