"use client";

import Item from "@/components/event/item";
import axios from "axios";
import { useEffect, useState } from "react";
import cities from "@/public/cities";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

type CityOption = {
  label: string;
  value: string | null;
};

export default function Home() {
  const [events, setEvents] = useState<EventI[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>({
    label: "Wszystkie miasta",
    value: null,
  });

  useEffect(() => {
    const getEvents = async () => {
      const res: any = await axios.get("/api/home/get-events");
      setEvents(res?.data.events);
    };

    getEvents();
  }, []);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#111', // ciemne tło
      borderColor: 'white',
      color: 'white',
      width: '30%',
      marginBottom: '1vw',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white', // wybrana wartość
      
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white', // wpisywany tekst
      width: '30%',

    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa', // placeholder
      width: '30%',

    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : 'white',
      color: state.isFocused ? 'white' : 'black',


    }),
    menu: (provided: any) => ({
      ...provided,
      width: '30%',

      zIndex: 9999, // ważne, by nie znikało pod innymi elementami
    }),
  };

  const filteredEvents =
    selectedCity?.value !== null
      ? events.filter((event) => selectedCity && event.city === selectedCity.value)
      : events;

  return (
    <div className="flex-row gap-[1vw] justify-center items-center ">
      <Select
        options={cities}
        components={makeAnimated()}
        isSearchable={true}
        maxMenuHeight={200}
        value={selectedCity}
        styles={customStyles}
        onChange={(selectedOption) =>
          setSelectedCity(selectedOption as CityOption)
        }
      />
      <div className="flex gap-2 max-w-[100vw] flex-wrap items-center">
        {filteredEvents.map((event: EventI) => (
          <Item key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
