"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";

// Define the interface for form data
interface FormData {
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  userType: string;
  name: string;
  email: string;
}

interface AccountProfileProps {
  user: any;
  btnTitle: string;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ user, btnTitle }) => {
  const router = useRouter();
  // Local state for form fields with initial values
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    userType: "business", // Default value set to business
    name: "",
    email: user?.email || "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle radio change for userType
  const handleUserTypeChange = (value: string) => {
    setFormData({ ...formData, userType: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send the form data to the API
      const response = await axios.post("/api/create-account", formData);
      console.log("Response:", response.data);
      // Handle success, e.g., redirect or display success message

      router.push("/");
    } catch (error: any) {
      console.error(
        "Error creating account:",
        error.response?.data || error.message
      );
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="flex flex-col">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col space-y-4">
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Enter street address"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      {/* User Type */}
      <div className="flex flex-col">
        <Label>User Type</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value: string) => handleUserTypeChange(value)}
        >
          <div className="flex space-x-4">
            <div>
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business</Label>
            </div>
            <div>
              <RadioGroupItem value="charity" id="charity" />
              <Label htmlFor="charity">Charity</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="default">
        {btnTitle}
      </Button>
    </form>
  );
};

export default AccountProfile;
