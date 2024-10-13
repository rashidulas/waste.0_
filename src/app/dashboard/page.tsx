import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";
import Image from 'next/image';

// Fetch user data
async function fetchUserData(userEmail: string) {
  await connectToDB();

  const business = await Business.findOne({ email: userEmail });
  const charity = await Charity.findOne({ email: userEmail });
  

  // Return user data from either collection
  return business || charity || null;
}

// Main component rendering the Streamlit app and sidebar
async function StreamlitAppWithSidebar() {
  const user = await currentUser();
  if (!user) return null;
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const profileImageUrl = '/assets/profile.jpg'

  // Fetch user data from the database
  const userData = await fetchUserData(userEmail);

  return (
    <div className="flex h-screen w-full">
    {/* Sidebar for User Information */}
    <div className="w-64 bg-gray-800 text-white p-6 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">User Information</h3>
      <div className="flex flex-col items-center">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl} // Get the image from Clerk
            alt="User Profile Image"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-600 rounded-full mb-4" />
        )}
        <p className="text-lg font-semibold">{user.fullName || "No Name"}</p>
        <p className="text-sm text-gray-400">{userEmail}</p>
      </div>
    </div>

      {/* Main Content Area for Streamlit App */}
      <div className="flex-grow">
        <iframe
          src="http://localhost:8501" // Replace with your Streamlit app URL
          className="w-full h-full border-none"
          title="Streamlit App"
        />
      </div>
    </div>
  );
}

export default StreamlitAppWithSidebar;
