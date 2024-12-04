"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";

import GoldMedal from "@/public/icon/medal/gold-medal.png";
import SilverMedal from "@/public/icon/medal/silver-medal.png";
import BronzeMedal from "@/public/icon/medal/bronze-medal.png";
import Image from "next/image";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { User, Character, Level } from "@prisma/client";
import { useRouter } from "next/navigation";
const MotionCard = motion(Card);
type Leaderboard = User & { Character: Character & { level: Level } };
export default function Component() {
  const router = useRouter();
  const [leaderBoard, setLeaderBoard] = useState<Leaderboard[]>([]);
  const getLeaerboard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setLeaderBoard(data.data);
    } catch (error) {
      console.error("Error getting leaderboard data:", error);
      throw error;
    }
  };
  useEffect(() => {
    getLeaerboard();
  }, []);
  return (
    <>
      <DashboardNav title="Learderboard" />

      <div className="min-h-screen text-white">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8">
          {leaderBoard?.map((player, index) => (
            <MotionCard
              onClick={() => router.push(`/player/${player.id}`)}
              key={index}
              className="bg-card"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={player?.image as string}
                      alt={player.name as string}
                    />
                    <AvatarFallback>
                      {player?.name?.charAt(0) as string}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold flex ">{player.name}</h3>
                  {index === 0 && (
                    <Image
                      src={GoldMedal}
                      alt="Gold Medal"
                      className="aspect-square w-10 self-end ml-auto"
                    />
                  )}
                  {index === 1 && (
                    <Image
                      src={SilverMedal}
                      alt="Silver Medal"
                      className="aspect-square w-10 self-end ml-auto"
                    />
                  )}
                  {index === 2 && (
                    <Image
                      src={BronzeMedal}
                      alt="Bronze Medal"
                      className="aspect-square w-10 self-end ml-auto"
                    />
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="font-bold">
                      {player?.Character?.level.currentLevel}
                    </p>
                    <p className="text-gray-400 text-sm">Level</p>
                  </div>
                  <div>
                    <p className="font-bold">
                      {player?.Character?.level?.currentXP}
                    </p>
                    <p className="text-gray-400 text-sm">XP</p>
                  </div>
                  <div>
                    <p className="font-bold">{player?.Character?.symbol}</p>
                    <p className="text-gray-400 text-sm">Badge</p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </>
  );
}
