import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import PetCardItem from "./cardItem";

export default function PetCards({ user_id, petData, onPageChange }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
        {petData.map((data) => {
          return (
            <PetCardItem
              key={data.unique_id}
              user_id={user_id}
              data={data}
              onPageChange={onPageChange}
            />
          );
        })}
      </div>
    </>
  );
}
