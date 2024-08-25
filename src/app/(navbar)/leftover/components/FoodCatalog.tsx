import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const FoodCatalog = ({imagesSRC, distance, time, name, description, rating}) => {
  return (
    <div className='flex flex-col rounded-2xl  bg-white w-5/6'>
        <div className='relative h-48 rounded-t-2xl overflow-hidden'>
            <Image 
                src={imagesSRC}
                layout='fill'
                style={{ objectFit: 'cover' }}
                alt='name'
                />
        </div>
        <div className='text-[#679436] font-source-sans mx-2'>
            {distance} | {time}
        </div>
        <div className='font-montserrat font-bold text-[23px] text-[#A5BE00] mx-2'>
            {name}
        </div >
        <div className='font-source-sans text-[17px] text-[#679436] text-justify mx-2'>
            {description}
        </div>
        <div className='flex justify-center'>
            <button className='bg-[#679436] w-5/6 rounded-2xl mt-2 mb-2 text-white font-montserrat p-2 font-semibold text-[20px]'>Order</button>
        </div>
    </div>
  )
}

export default FoodCatalog