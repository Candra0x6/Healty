import HabitCard from "@/src/components/cards/HabitsCard";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { lifestyleAIResponse } from "@/src/types/genrateResponse";
import { headers } from "next/headers";

export default async function MyHabits() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/lifestyle`,
    {
      method: "GET",
      headers: await headers(),
    }
  );
  const habits: lifestyleAIResponse[] = await response.json();
  console.log(habits);
  return (
    <>
      <DashboardNav title="Habits" />
      <div className="grid grid-cols-2 grid-flow-row gap-8">
        {Array.isArray(habits) &&
          habits.map((lifestyle, i) => <HabitCard data={lifestyle} key={i} />)}
      </div>
    </>
  );
}
