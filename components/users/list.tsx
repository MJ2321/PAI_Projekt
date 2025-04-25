"use client";

import { useState, useEffect } from "react";
import UserI from "@/types/user";
import axios from "axios";
import Spinner from "../spinner/spinner";

export default function List() {
  const [users, setUsers] = useState<UserI[]>([]);
  const getUsers = async () => {
    const res = await axios.get<{ success: boolean; users: UserI[] }>(
      "/api/admin/get-users"
    );

    console.log(res.data);

    setUsers(res.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!users.length) {
    return (
      <div className="mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mb-[3vw] mt-[-1vw]">
      <ul>
        <li className="flex w-full font-bold border-b-2 border-[#adadad] mt-10">
          <span className="p-2 flex-1">Nazwa</span>
          <span className="p-2 flex-1">Email</span>
          <span className="p-2 flex-1">Hasło</span>
          <span className="p-2 flex-1">Administrator</span>
        </li>
        {users.map((user) => {
          return (
            <li
              key={user._id}
              className="flex w-full border-b-2 border-[#adadad]"
            >
              <span className="p-2 flex-1">{user.name}</span>
              <span className="p-2 flex-1">{user.email}</span>
              <span className="p-2 flex-1">{user.password}</span>
              <span className="p-2 flex-1">{user.admin ? "Tak" : "Nie"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
