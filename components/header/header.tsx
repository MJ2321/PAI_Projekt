"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import Login from "@/components/login/form";
import { useState } from "react";
import { useSession } from "next-auth/react";


export default function Header() {

  const [loginPopup, setLoginPopup] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="py-4 flex items-center justify-between border-b-2 mb-5">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Gamedev Wydarzenia</h1>
      </Link>
      <div className="flex items-center gap-3">
        {user && (
        <Link className="p-2" href={"/dashboard"}>
          Dodaj wydarzenie
        </Link>)}
        {user && user.admin && (<Link className="p-2" href={"/service/admin/users"}>
          Użytkownicy
        </Link>)}
        {user && user?.name && (
          <div className="flex ml-10 border border-[#1c0c55] rounded-md">
            <p className="p-2 font-bold ">{user.name}</p>
            <p className="p-2">|</p>
            <button
              className="font-bold p-2 cursor-pointer flex items-center"
              onClick={() => signOut()}
            >
              Wyloguj się
              {/* <img src="./exit.svg" className="w-6"></img> */}
            </button>
          </div>
        )}
        {!user?.name && (
          <button onClick={() => setLoginPopup(!loginPopup)}>Zaloguj się</button>
        )}

        {loginPopup && (
          
          <div className="fixed top-0 left-0 w-full h-full bg-[#00000084] flex justify-center items-center z-999">
        
          <button
            type="button"
            onClick={() => setLoginPopup(!loginPopup)}
            className="absolute top-[34%] right-[38%] text-lg text-[#ddd] font-bold cursor-pointer hover:text-[#ccc]">
            Zamknij
          </button>
            <Login />
          </div>
        )}
      </div>
    </div>
  );
}
