import React from "react";

const CreateCalorie = () => {
  // Date placeholder
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  // Time placeholder
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const defaultTime = `${hours}:${minutes}`;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-4/5 flex-col gap-3 lg:w-1/2">
        <div className="flex gap-3">
          <input
            type="text"
            name="date"
            placeholder={defaultDate}
            className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
          />
          <input
            type="text"
            name="time"
            placeholder={defaultTime}
            className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
          />
          <input
            type="text"
            name="calorie"
            placeholder="Calorie:"
            className="hidden h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00] sm:flex"
          />
        </div>
        <input
          type="text"
          name="calorie"
          placeholder="Calorie:"
          className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00] sm:hidden"
        />
        <input
          type="text"
          name="note"
          placeholder="Note:"
          className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
        />
        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="flex w-36 justify-center rounded-3xl bg-[#A5BE00] px-2 py-2 font-bold text-gray-100"
          >
            Add Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCalorie;
