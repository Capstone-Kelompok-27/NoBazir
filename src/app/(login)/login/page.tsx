import React from 'react'
import Image from 'next/image'


const page = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-1/2 h-screen border-2 bg-[#EBF2FA]'>
        <div className='flex flex-col justify-center items-center mt-32 text-[#679436]'>
          <h1 className='text-[38px] font-montserrat font-bold'>Welcome to NoBazir</h1>
          <h1 className='text-[27px] font-source-sans'> Select service to continue</h1>
        </div>

        <div className='flex flex-col justify-center items-center mt-10 text-[#679436] font-sans'>
          <div className='flex flex-col justify-center gap-4'>
            <div className='flex flex-row  w-full max-w-xs rounded-3xl border-2 border-[#679436] p-2'>
              <Image 
                src={"/login/google.svg"}
                alt=''
                width={24}
                height={48}
                className='mx-4'
                />
              <h1 className='relative text-[20px] font-source-sans font-semibold'>Log in with Google</h1>
            </div>
            <div className='flex flex-row w-full max-w-xs rounded-3xl border-2 border-[#679436] p-2'>
              <Image 
                src={"/login/facebook.svg"}
                alt=''
                width={24}
                height={48}
                className='mx-4'
                />
                <h1 className='text-[20px] text-center font-source-sans font-semibold'>Log in with Facebook</h1>
            </div>
            <div className='flex flex-row w-full max-w-xs rounded-3xl border-2 border-[#679436] p-2'>
              <Image 
                src={"/login/apple.svg"}
                alt=''
                width={24}
                height={48}
                className='mx-4'
                />
              <h1 className='text-[20px] text-center font-source-sans font-semibold'>Log in with Apple</h1>
            </div>
            <div className='flex flex-row w-full max-w-xs rounded-3xl border-2 border-[#679436] p-2'>
              <Image 
                src={"/login/github.svg"}
                alt=''
                width={24}
                height={48}
                className='mx-4'
                />
                <h1 className='text-[20px] text-center font-source-sans font-semibold'>Log in with Github</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 h-screen'>
      <img src="/login/salad.png" className='w-full h-full' alt="" />
      </div>
    </div>
  )
}

export default page