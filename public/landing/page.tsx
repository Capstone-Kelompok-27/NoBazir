import React from 'react'
import Navbar from '@/app/_components/Navbar'


const page = () => {

    const isLoggedIn = true;
    return (
    <div className='flex flex-col bg-[#679436]'>
        <div className=' bg-[#EBF2FA] rounded-b-2xl '>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='flex flex-row mx-20 mt-40'>
                <div className='flex flex-col justify-center items-center w-7/12 my-5'>
                    <h1 className='font-montserrat font-black text-[36px] text-[#05668D] text-center'>Every Bite Counts: Reduce Waste with NoBazir</h1>
                    <h1 className='font-source-sans font-semibold text-[28px] my-5 text-center text-[#427AA1]'>
                    NoBazir is a web app that features a marketplace for buying and selling food 
                    based on the principle of responsible consumption, 
                    along with educational content related to environmental issues.
                    </h1>
                    <a href="/home"><button className='bg-[#A5BE00] text-[#EBF2FA] rounded-2xl px-6 py-2 my-5' >Get Started</button></a>
                </div>
                <div>Kasih foto apa kek</div>
            </div>
        </div>
        <div className='flex flex-col my-20 mx-20'>
            <img src="navbar/landing/image1.png" alt="" />
            <div className='flex flex-row'>
                <div className='flex flex-col justify-start'>
                    <h1 className='text-[#EBF2FA] font-montserrat font-extrabold text-[44px]'> What Is LeftOver?</h1>
                    <h1 className='text-[#EBF2FA] font-source-sans font-semibold text-[22px] mt-10'>Try a next level experience of food purchase with LeftOver. <br />Buyers can view and access detailed information of all <br />available food items.</h1>
                    <a href="/leftover"><button className='bg-[#A5BE00] text-[#EBF2FA] rounded-2xl px-6 py-2 my-5 w-1/3'>View More</button></a>
                </div>
                <div>kasih foto lek</div>
            </div>
            <div className='mt-10 bg-[#A5BE00] rounded-2xl'>
                <div className='flex flex-row my-10'>
                    <div className='w-7/12'><img src="navbar/landing/discuss.png" alt="" className='mx-4 scale-90'/></div>
                    <div className='flex flex-col justify-start mt-10'>
                        <h1 className='font-montserrat font-extrabold text-[58px] text-[#EBF2FA]'>Discuss What's<br/> Happening on Community</h1>
                        <h1 className='font-source-sans font-semibold text-[22px] text-[#EBF2FA] mt-10'>Users can view posts from others and create their own posts. It also features a list of environmentally-themed events, like Car-Free Day, organized by tags.</h1>
                        <a href="/community"> <button className='bg-[#679436] text-[#EBF2FA] text-[px] rounded-2xl px-6 py-2 my-5 w-1/5'>View More</button> </a>
                    </div>
                </div>
            </div>
            <div className='flex flex-row my-10'>
                <div className='flex flex-col w-1/2'>
                    <h1 className='font-montserrat font-extrabold text-[44px] text-[#EBF2FA]'> All <br /> About <br/>Rewards</h1>
                    <h1 className='w-full font-source-sans font-semibold text-[22px] text-[#EBF2FA] mt-10 '>Users can earn rewards when their posts achieve high engagement. These rewards can be exchanged for various exciting benefits.</h1>
                    <a href="/"><button className='bg-[#A5BE00]  text-[#EBF2FA] rounded-2xl px-6 py-2 my-5 w-1/5'>View More</button></a>            
                </div>
                <div>kasih foto ye</div>
            </div>
        </div>
        <div className='bg-[#EBF2FA] rounded-t-2xl'>
            <div className='flex flex-col items-center my-10'>
                <h1 className='font-montserrat font-extrabold text-[44px] text-[#05668D]'>Why Use NoBazir?</h1>
                <div className='font-source-sans font-bold text-[22px] text-[#05668D] w-full flex flex-col text-center items-center p-4'>
                    <h1 className='w-1/2 border-2 rounded-full border-[#427AA1] p-2 my-2'>Help the environment by reducing food waste </h1>
                    <h1 className='w-1/2 border-2 rounded-full border-[#427AA1] p-2 my-2'>Rescue food near you</h1>
                    <h1 className='w-1/2 border-2 rounded-full border-[#427AA1] p-2 my-2'>Enjoy good food at 1/2 price or less</h1>
                    <h1 className='w-1/2 border-2 rounded-full border-[#427AA1] p-2 my-2'>Find environmental events and seek new friends</h1>
                </div>
            </div>
        </div>
        <div className='relative bg-cover bg-center' style={{ backgroundImage: "url('/navbar/landing/imagebawah.png')" }}>
            <div className='flex flex-row mx-20 my-10 justify-between bg-opacity-50 p-10 rounded-xl'>
                <div className='flex flex-col'>
                <h1 className='font-montserrat font-extrabold text-[36px] text-[#FFFFFF]'>Have any Question?</h1>
                <h1 className='font-source-sans font-regular text-[#FFFFFF] text-[24px] my-5'>
                    We're here to help! Reach out to us anytime through our contact
                </h1>
                </div>
                <div>
                <a href="https://www.instagram.com/sparta_hmif/"><button className='bg-[#A5BE00] text-[#EBF2FA] text-[24px] rounded-full px-10 py-4 my-5'>Contact Us</button></a>
                </div>
            </div>
        </div>

    </div>
  )
}

export default page