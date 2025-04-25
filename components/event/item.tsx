"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useSession } from "next-auth/react";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import cities from "@/public/cities";
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

interface PropsI {
  event: EventI;
}

export default function Item(props: PropsI) {
  const { event } = props;

  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.admin;

  const currentPath = usePathname(); // Pobranie aktualnej ścieżki

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: event._id,
    name: event.name,
    desc: event.desc,
    date: event.date,
    city: event.city,
    price: event.price,
  });

  type CityOption = {
    label: string;
    value: string;
  };
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsPopupOpen(false);
    try {
      const updatedData = {
        ...formData,
        city: selectedCity?.value || formData.city,
      };
      console.log("Sending request to:", `/api/events/${formData._id}`);
      console.log("Payload:", updatedData);
      const res = await fetch(`/api/events/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setIsPopupOpen(false);
        window.location.reload(); // Reload the page to see the changes
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <>
      <Link href={event.slug ? `/event/${event.slug}` : "/"}>
        <div className="w-[29vw] h-auto py-4 px-2 rounded-lg mb-2 flex-row bg-gray-700 text-[#ddd]">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <span className="flex items-start gap-1">
                <img src="./date.svg" className="w-4" alt="date icon" />
                <span className="inline-block text-sm">{event.date}</span>
              </span>
              <span className="flex items-start gap-1">
                <img src="./map.svg" className="w-4" alt="map icon" />
                <span className="inline-block text-sm">{event.city}</span>
              </span>
            </div>
            <span className="max-w-[26vw] mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {event.desc}
            </span>
          </div>
          {/* Renderuj przyciski tylko na stronie /dashboard */}
          {isAdmin && currentPath === "/dashboard" && (
            <div className="ml-[60%] flex items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPopupOpen(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Edytuj
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const confirmed = confirm("Na pewno chcesz usunąć ten event?");
                  if (!confirmed) return;

                  try {
                    const res = await fetch(`/api/events/${formData._id}`, {
                      method: "DELETE",
                    });

                    if (res.ok) {
                      alert("Event usunięty!");
                      window.location.href = "/dashboard";
                    } else {
                      alert("Błąd podczas usuwania eventu.");
                    }
                  } catch (err) {
                    console.error("Delete error:", err);
                    alert("Wystąpił błąd.");
                  }
                }}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 ml-2"
              >
                Usuń
              </button>
            </div>
          )}
        </div>
      </Link>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edytuj Event</h2>
            <form className="flex flex-col gap-4">
              <label>
                ID:
                <input type="text" name="id" value={formData._id} readOnly />
              </label>
              <label>
                Nazwa:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Opis:
                <textarea
                  name="desc"
                  defaultValue={formData.desc}
                  onChange={(e) => handleInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Data:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
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
                  defaultValue={{ label: formData.city, value: formData.city }}
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
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </label>
            </form>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Anuluj
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}