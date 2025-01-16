// app/api/users/route.js

import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";

// Connect to the database
const ConnectDB = async () => {
  try {
    await DBConnection();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// Handle GET and POST requests
export async function GET() {
  await ConnectDB();

  try {
    const users = await UserModel.find();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await ConnectDB();

  try {
    const body = await req.json(); // Parse the JSON body
    const { username, email, message } = body;

    if (!username || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newUser = new UserModel({ username, email, message });
    await newUser.save();

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
