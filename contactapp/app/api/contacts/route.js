import { connect } from "@/connect/connect";
import Contacts from "@/contactSchema/contact";
import { NextResponse } from "next/server";

connect();

export const POST = async (req) => {
  const {
    fullName,
    phoneNumber,
    relationshipLevel,
    meetingLocation,
    connectedThrough,
    firsthand,
  } = await req.json();
  try {
    const newContact = await Contacts.create({
      fullName,
      phoneNumber,
      relationshipLevel,
      meetingLocation,
      connectedThrough: firsthand ? null : connectedThrough, // Ensure only ID is set
      firsthand,
    });

    return NextResponse.json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.error(error.message);
  }
};

export const GET = async () => {
  try {
    const getContacts = await Contacts.find().populate(
      "connectedThrough",
      "_id fullName"
    ); // Populate fullName as well
    return NextResponse.json(getContacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    return NextResponse.error(error.message);
  }
};

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await Contacts.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.error(error.message);
  }
};

export const PUT = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  const {
    fullName,
    phoneNumber,
    relationshipLevel,
    meetingLocation,
    connectedThrough,
    firsthand,
  } = await req.json();
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      id,
      {
        fullName,
        phoneNumber,
        relationshipLevel,
        meetingLocation,
        connectedThrough: firsthand ? null : connectedThrough, // Ensure only ID is set
        firsthand,
      },
      { new: true }
    ).populate("connectedThrough", "_id fullName"); // Populate fullName as well
    return NextResponse.json(
      updatedContact,
      { message: "Contact updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.error(error.message);
  }
};
