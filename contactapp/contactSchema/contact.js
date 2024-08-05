import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    relationshipLevel: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },
    meetingLocation: {
      type: String,
      required: true,
    },
    connectedThrough: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contacts",
      required: false,
    },
    firsthand: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Contacts =
  mongoose.models.Contacts || mongoose.model("Contacts", contactSchema);

export default Contacts;
