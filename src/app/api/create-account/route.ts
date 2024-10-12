import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";
import { NextRequest } from "next/server";

// Connect to the database
export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const { userType, phone, street, city, state, zipCode, email, name } =
      await req.json();

    if (!name || !email || !phone || !street || !city || !state || !zipCode) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (userType === "business") {
      // Create and save a new business
      const business = new Business({
        name,
        email,
        phone,
        address: { street, city, state, zipCode },
        onboarded: true,
      });
      await business.save();
      return NextResponse.json(
        { message: "Business created successfully", business },
        { status: 201 }
      );
    } else if (userType === "charity") {
      // Create and save a new charity
      const charity = new Charity({
        name,
        email,
        phone,
        address: { street, city, state, zipCode },
        onboarded: true,
      });
      await charity.save();
      return NextResponse.json(
        { message: "Charity created successfully", charity },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid user type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
