import DashboardNav from "@/src/components/elements/DashboardNav";
import AchivmentPart from "@/src/components/mission-element/AchivmentPart";
import DailyCheckin from "@/src/components/mission-element/DailyCheckin";
import DailyGuest from "@/src/components/mission-element/DailyGuest";

import { Mission, UserAchievement, Achievement } from "@prisma/client";
import { headers } from "next/headers";
import React from "react";

export type AchievementsResponse = UserAchievement & {
  achievement: Achievement;
};
export default async function MyMission() {
  const missionRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/mission`,
    {
      method: "GET",
      headers: await headers(),
    }
  );
  const mission = missionRes.ok ? await missionRes.json() : { data: [] };

  const achievementsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/achievement`,
    {
      method: "GET",
      headers: await headers(),
    }
  );
  const achievements = achievementsRes.ok
    ? await achievementsRes.json()
    : { data: [] };

  return (
    <>
      <DashboardNav title="Missions" />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 gap-4 bg-card p-8 space-y-4 rounded-xl">
          <h1 className="font-bold text-2xl">Missions quest 🚀</h1>
          {mission?.data.map((mission: Mission, i: number) => {
            return <DailyGuest key={i} data={mission} />;
          })}
        </div>
        <div className="col-span-1 bg-card rounded-xl p-8">
          <h1 className="font-bold text-2xl mb-5">Daily checkin 🫡</h1>
          <DailyCheckin />
        </div>
        <div className="col-span-2 bg-card w-full h-full rounded-xl">
          <AchivmentPart data={achievements?.data} />
        </div>
      </div>
    </>
  );
}
