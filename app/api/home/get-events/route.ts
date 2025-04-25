import { NextResponse } from "next/server";
import connect from "@/db";
import Event from "@/models/Event";

type ResponseData = {
  success: boolean;
  events: any[];
};

export async function GET() {
  try {
    await connect();

    const events = await Event.find();

    return NextResponse.json<ResponseData>({ success: true, events });
  } catch (error) {
    return NextResponse.json<ResponseData>({ success: false, events: [] });
  }
}
