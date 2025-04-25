"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Login = () => {
  const input_form = "p-2 border border-white mb-2 outline-none";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;

    const res: any = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.status === 401) {
      toast.error("Wrong credentials");
      return;
    }


    window.location.reload();
  };

  return (
    <div>
      <form
        className="flex flex-col w-[25vw] bg-cyan-950 p-6 text-white gap-1"
        onSubmit={submit}
      >
        <label className="flex flex-col gap-0.5">
          Email
          <input
            name="username"
            type="email"
            className={input_form}
            placeholder="Wpisz Email"
            required
          />
        </label>
        <label className="flex flex-col gap-0.5">
          Hasło
          <input
            name="password"
            type="password"
            className={input_form}
            placeholder="Wpisz Hasło"
            required
          />
        </label>
        <button
          type="submit"
          className="p-2 cursor-pointer bg-gray-600 hover:bg-gray-700"
        >
          Zaloguj się
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;