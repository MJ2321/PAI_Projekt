"use client";

import Item from "@/components/event/item";
import Image from "next/image";
import Plus from "@/public/plus.svg";
import Form from "@/components/event/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


interface EventI {
  _id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  city: string;
  price: number;
  slug: string;
}

export default function Dashboard() {
  const [popupState, setPopupState] = useState(false);
  const [events, setEvents] = useState<EventI[]>([]);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const getEvents = async () => {
      const res: any = await axios.get("/api/home/get-events");
      setEvents(res?.data.events);
    };

    if (user) {
      getEvents();
    }
  }, [user]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Ładowanie...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {!user ? (
        <h1 className="text-3xl font-bold">
          Nie masz uprawnień do tej strony
        </h1>
      ) : (
        <>
          {events.map((event: EventI) => (
            <Item key={event._id} event={event} />
          ))}
          <div
            onClick={() => setPopupState(!popupState)}
            className="fixed bottom-3 right-3 bg-[#1c0c55] border-4 cursor-pointer w-fit p-4 rounded-full"
          >
            <Image src={Plus} alt="add icon" width={40} height={40} />
          </div>
          {popupState && (
            <div className="event-form absolute flex justify-center bg-black pt-20 top-0 left-0 w-full h-full">
              <button
                className="absolute top-10 right-10 cursor-pointer"
                onClick={() => setPopupState(!popupState)}
              >
                Zamknij
              </button>
              <Form />
            </div>
          )}
        </>
      )}
    </div>
  );
}
