import React from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="flex h-[48px] w-1/2 items-start justify-between rounded-lg border-2 border-[#679436] border-opacity-50 px-4 py-3 bg-[#679436] bg-opacity-[0.28]">
    <input
      type="text"
      placeholder="Search for food or store"
      className="w-full bg-transparent outline-none"
    />
    <IoMdSearch className="text-xl text-gray-400" />
  </div>
  )
}

export default SearchBar

