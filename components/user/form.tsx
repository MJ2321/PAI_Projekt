"use client";

import { FormEvent } from "react";
import UserI from "@/types/user";
import axios from "axios";

interface Props {
  onClose: () => void;
}

export default function Form({ onClose }: Props) {
  const input_form = "p-2 border-2 border-[#1c0c55] mb-2 outline-none rounded-sm";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form[1] as HTMLInputElement).value;
    const email = (form[2] as HTMLInputElement).value;
    const password = (form[3] as HTMLInputElement).value;
    const admin = (form[4] as HTMLInputElement).checked;

    const user: UserI = { name, email, password, admin };

    const response = await axios.post("/api/admin/add-user", { user });

    if (response.data.success) window.location.reload();
  };

  return (
    <div className="flex justify-center items-center fixed top-[50%] left-[50%] w-[100vw] h-[100vh] bg-[#00000084] translate-x-[-50%] translate-y-[-50%]">
      <form className="flex flex-col w-[600px] bg-[#ddd] px-15 py-15 rounded-2xl" onSubmit={submit}>

        <h1 className="flex justify-between text-xl mb-2">Dodaj nowego użytkownika       <button
          type="button"
          onClick={onClose}
          className="relative top-0 right-0 text-lg text-[#1c0c55] font-bold cursor-pointer hover:text-[#3e2e77]"
        >
          Zamknij
        </button></h1>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className={input_form}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={input_form}
          required
        />
        <input
          type="text"
          placeholder="Hasło"
          className={input_form}
          required
        />
        <label className="p-2 border-2 border-[#1c0c55] mb-2 outline-none items-center rounded-sm">
          <input type="checkbox" className="mr-1" />
          Konto administratora
        </label>
        <button
          type="submit"
          className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-700 text-[#ddd] rounded-sm"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
}
