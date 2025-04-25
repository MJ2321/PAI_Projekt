import { NextResponse } from "next/server";
import connect from "@/db";
import User from "@/models/User";
import UserI from "@/types/user";

type ResponseData = {
  success: boolean;
  users?: UserI[];
};

export async function GET() {
  try {
    await connect();
    const users = await User.find({});

    return NextResponse.json<ResponseData>({ success: true, users });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false });
  }
}
