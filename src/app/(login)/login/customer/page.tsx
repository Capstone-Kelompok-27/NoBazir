import FormLoginCustomer from "@/app/_components/formLoginCustomer";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();
  if (!session || session.user.role) {
    redirect("/");
  }

  return (
    <div>
      <div>
        <FormLoginCustomer session={session} />
          <div className="flex flex-row min-h-screen">
            <div className="flex flex-col justify-center p-8 w-1/2 rounded-lg mx-4 jus">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-600 text-center">Welcome to NoBazir</h1>
                <p className="text-green-500 mt-2 text-center">Please provide your profile details below</p>
              </div>

              <div className="mb-4">
                <label className="block text-green-600 mb-2">Your Name</label>
                <input type="text" className="border-2 p-2 rounded-2xl w-full" />
              </div>


              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-green-600 mb-2">Sub-district/Village</label>
                  <input type="text" className="border-2 p-2 rounded-2xl w-full" />
                </div>

                <div className="w-1/2">
                  <label className="block text-green-600 mb-2">District</label>
                  <input type="text" className="border-2 p-2 rounded-2xl w-full" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-green-600 mb-2">Contact</label>
                <input type="text" className="border-2 p-2 rounded-2xl w-full" />
              </div>

              <div className='flex justify-center'>
                <button className="w-1/2 p-3 bg-green-600 text-white rounded-full">Sign Up</button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <img src="/navbar/landing/merchant.png" className="rounded-lg max-h-screen w-full object-cover" alt="Merchant" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default page;
