import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Event from "@/models/Event";

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = url.pathname.split("/").pop(); // np. "/api/events/123" => "123"
  console.log("PUT request received for event ID:", id);

  try {
    await connect();
    const updatedData = await request.json();
    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ success: false, message: "Error updating event", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = url.pathname.split("/").pop(); 

  console.log("🗑️ DELETE request for event ID:", id);

  try {
    await connect();
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ success: false, message: "Error deleting event", error }, { status: 500 });
  }
}
