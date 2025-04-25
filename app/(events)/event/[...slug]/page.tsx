import connect from "@/db";
import Event from "@/models/Event";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
  searchParams: object;
};

export default async function SingleEvent({ params }: Props) {
  const { slug } = params;

  let event;

  try {
    await connect();
    event = await Event.findOne({ slug });
  } catch (error) {
    console.error("Błąd przy pobieraniu eventu:", error);
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Nie znaleziono eventu</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-indigo-800">{event.name}</h1>

      <div className="text-gray-700 space-y-3">
        <p><span className="font-semibold">Opis:</span> {event.desc}</p>
        <p><span className="font-semibold">Data:</span> {event.date}</p>
        <p><span className="font-semibold">Miasto:</span> {event.city}</p>
        <p><span className="font-semibold">Cena:</span> {event.price} zł</p>
        <p><span className="font-semibold">Slug:</span> {slug}</p>
      </div>

    </div>
  );
}
