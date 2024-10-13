import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";
import Image from 'next/image';

// Fetch user data and determine if the user is a charity
async function fetchUserData(userEmail: string) {
  await connectToDB();

  const business = await Business.findOne({ email: userEmail });
  const charity = await Charity.findOne({ email: userEmail });
  
  // If the user is a charity, fetch all businesses
  let allBusinesses = null;
  if (charity) {
    allBusinesses = await Business.find(); // Get all businesses
  }

  // Return user data and all businesses (if user is a charity)
  return { userData: business || charity || null, isCharity: !!charity, allBusinesses };
}

// Main component rendering the Streamlit app and sidebar
async function StreamlitAppWithSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const profileImageUrl = '/assets/profile.jpg';

  // Fetch user data and check if the user is a charity
  const { userData, isCharity, allBusinesses } = await fetchUserData(userEmail);

  return (
    <div className="flex h-screen w-full">
      {/* Left Half: Sidebar and User/Business Info */}
      <div className="w-1/2 bg-gray-800 text-white p-6 overflow-y-auto">
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

        {/* Conditionally render business information if the user is a charity */}
        {isCharity && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Nearby Businesses</h4>
            <div className="space-y-4">
              {allBusinesses && allBusinesses.map((business: any) => (
                <div key={business._id} className="border border-gray-700 p-4 rounded-lg bg-gray-700">
                  <p><strong>Username:</strong> {business.name}</p>
                  <p><strong>Email:</strong> {business.email}</p>
                  <p><strong>Phone Number:</strong> {business.phone || "N/A"}</p>
                  {/* Format the address properly */}
                  <p><strong>Address:</strong> {`${business.address.street}, ${business.address.city}, ${business.address.state}, ${business.address.zipCode}` || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Half: Streamlit App */}
      <div className="w-1/2">
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
