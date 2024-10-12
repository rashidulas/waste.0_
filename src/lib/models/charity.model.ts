import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Charity name
  email: { type: String, required: true }, // Charity contact email
  phone: { type: String }, // Charity contact phone
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  onboarded: { type: Boolean, default: false },
});

const Charity =
  mongoose.models.Charity || mongoose.model("Charity", charitySchema);

export default Charity;
