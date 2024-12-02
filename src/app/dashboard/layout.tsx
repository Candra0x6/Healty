import Sidebar from "@/src/components/elements/Sidebar";
import { headers } from "next/headers";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-xl mx-auto w-full flex gap-x-10">
      <aside className="w-[20%] h-full ">
        <Sidebar />
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
