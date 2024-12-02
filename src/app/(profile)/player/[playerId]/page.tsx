"use client";
import DetailProfile from "@/src/components/profile/DetailProfile";
import {
  Achievement,
  Character,
  HealthAnalysis,
  Level,
  LifestyleModification,
  Mission,
  User,
  UserAchievement,
} from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
export type UserDetails = User & { Character: Character & { level: Level } } & {
  healthAnalysis: HealthAnalysis & {
    lifestyleModifications: LifestyleModification[] & { mission: Mission[] };
  };
} & { UserAchievement: (UserAchievement & { achievement: Achievement })[] };
export default function PlayerDetails() {
  const { playerId } = useParams();
  const [user, setUser] = useState<UserDetails>();
  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${playerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error getting player data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="max-w-2xl  mx-auto">
      <div className="flex w-full justify-between py-10">
        <button
          onClick={() => window.history.back()}
          className="hover:bg-card flex gap-x-2 items-center font-bold py-2 px-5 rounded-xl hover:text-primary "
        >
          <TbArrowBackUp size={24} />
          Back
        </button>
      </div>
      <DetailProfile data={user as UserDetails} />
    </div>
  );
}
