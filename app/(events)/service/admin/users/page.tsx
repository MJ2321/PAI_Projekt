"use client"

import Form from "@/components/user/form";
import Link from "next/link";
import List from "@/components/users/list";
import {useState} from 'react';
import Image from "next/image";
import Plus from "@/public/plus.svg";
import Exit from "@/public/exit.svg";
import { useSession } from "next-auth/react";


export default function Users() {
  const [popupState, setPopupState] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.admin

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Nie masz uprawnień do tej strony</h1>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4">
        <Link href={"/"} className="flex items-center font-bold"><Image src={Exit} alt="quit icon" width={30} height={30}></Image>Strona główna</Link>
      </div>
      <div
        onClick={() => {
          setPopupState(!popupState);
        }}
        className="fixed bottom-3 right-3 bg-[#1c0c55] border-4 cursor-pointer w-fit p-4 rounded-full"
      >
        <Image src={Plus} alt="add icon" width={40} height={40} />
      </div>
      <div>
        {popupState && <Form onClose={() => setPopupState(!popupState)}/>}
        <List />
      </div>
    </div>
  );
}
