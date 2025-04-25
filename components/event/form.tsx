"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import Select from "react-select";
import cities from '@/public/cities';
import makeAnimated from 'react-select/animated';

export default function Form() {
  type CityOption = {
    label: string;
    value: string;
  };
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const event: any = {};

    event.name = (form[0] as HTMLInputElement).value;
    event.desc = (form[1] as HTMLInputElement).value;
    event.date = (form[2] as HTMLInputElement).value;
    event.url = (form[3] as HTMLInputElement).value;
    event.price = (form[4] as HTMLInputElement).value;
    event.city = selectedCity?.value;

    const currentDate = new Date().toISOString().split("T")[0];

    if (event.date < currentDate) {
      alert("Data wydarzenia nie może być w przeszłości.");
      return;
    }


    try {
      const res = await axios.post("/api/dashboard/add-event", { event });
      if (res.status === 200) {
        alert("Wydarzenie zostało dodane pomyślnie!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Błąd podczas dodawania wydarzenia:", error);
      alert("Wystąpił błąd podczas dodawania wydarzenia.");
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-[50%] left-[50%] w-[100vw] h-[100vh] bg-[#00000084] translate-x-[-50%] translate-y-[-50%]">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edytuj Event</h2>
            <form className="flex flex-col gap-4" onSubmit={submit}>

              <label>
                Nazwa:
                <input
                  type="text"
                  name="name"
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Opis:
                <textarea
                  name="desc"
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Data:
                <input
                  type="date"
                  name="date"
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Miasto:
                <Select
                  options={cities}
                  components={makeAnimated()}
                  isSearchable={true}
                  maxMenuHeight={200}
                  onChange={(selectedOption) =>
                    setSelectedCity(selectedOption as CityOption)
                  }
                ></Select>
              </label>
              <label>
                Cena:
                <input
                  type="number"
                  name="price"
                  className="border p-2 rounded w-full"
                />
              </label>
              <button
          type="submit"
          className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-700"
        >
          Dodaj
        </button>
        </form>
        </div>
    </div>
  );
}
