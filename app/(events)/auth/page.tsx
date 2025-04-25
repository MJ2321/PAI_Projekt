import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Login from "@/components/login/form";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return <Login />;
}
