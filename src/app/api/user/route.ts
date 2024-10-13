import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";

// Named export for the GET method
export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress;

  // Connect to the database
  await connectToDB();

  // Fetch user-related data from MongoDB
  const business = await Business.findOne({ email: userEmail }).lean(); // Use lean() for performance
  const charity = await Charity.findOne({ email: userEmail }).lean(); // Use lean() for performance

  // Check if the user is onboarded
  const isOnboarded = (business && business.onboarded) || (charity && charity.onboarded);

  // Prepare the response data
  const userData = {
    id: user.id,
    email: userEmail,
    onboarded: isOnboarded,
    businessData: business || null, // Include business data if it exists
    charityData: charity || null, // Include charity data if it exists
  };

  return NextResponse.json(userData, { status: 200 });
}
