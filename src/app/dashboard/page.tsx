import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";
import Image from 'next/image';

// Mock surplus data for now
const mockSurplusItems = [
  { id: 1, name: "Milk", quantity: 50, expirationDate: "2024-11-01" },
  { id: 2, name: "Bread", quantity: 100, expirationDate: "2024-10-15" },
  { id: 3, name: "Eggs", quantity: 200, expirationDate: "2024-10-20" }
];

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
  const profileImageUrl = '/assets/profile.jpg';

  // Fetch user data from the database
  const userData = await fetchUserData(userEmail);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar for User Information */}
      <div className="w-72 bg-gray-800 text-white p-6 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">User Information</h3>
        <div className="flex flex-col items-center">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="User Profile Image"
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-600 rounded-full mb-4" />
          )}
          <p className="text-lg font-semibold">{user?.fullName || "No Name"}</p>
          <p className="text-sm text-gray-400">{userEmail}</p>
        </div>
      </div>

      {/* Main Content Area for Streamlit App */}
      <div className="flex-grow">
        <iframe
          src="https://scaling-succotash-x5vx7vxv747hp7j9-8501.app.github.dev/" // Replace with your Streamlit app URL
          className="w-full h-full border-none"
          title="Streamlit App"
        />
      </div>

      {/* Right Sidebar for Surplus List */}
      <div className="w-80 bg-gray-800 text-white p-6 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Surplus List</h3>
        <form>
          <ul className="space-y-4">
            {mockSurplusItems.map((item) => (
              <li key={item.id} className="bg-gray-700 p-4 rounded shadow-md">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                </label>
                <p className="text-xs">Quantity: {item.quantity}</p>
                <p className="text-xs text-red-500">Expires on: {item.expirationDate}</p>
              </li>
            ))}
          </ul>
          {/* Add the Donate button at the end of the checklist */}
          <button
            type="button"
            className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
}

export default StreamlitAppWithSidebar;
