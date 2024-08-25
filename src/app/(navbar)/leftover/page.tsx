import React from 'react';
import Navbar from "@/app/_components/Navbar";

const Page = () => {
  
  const isLoggedIn = true;

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="p-4">
        <h1>LeftOver</h1>
        <p>This is the leftover page.</p>
      </main>
    </div>
  );
};

export default Page;