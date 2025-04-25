'use client';

import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      {children}
    </SessionProvider>
  );
}