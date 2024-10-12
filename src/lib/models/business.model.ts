import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  onboarded: { type: Boolean, default: false },
  // inventorySummary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventorySummary' }],  // Link to the summarized inventory data
  // donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
});

const Business =
  mongoose.models.Business || mongoose.model("Business", businessSchema);

export default Business;
