"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
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
      <DashboardNav title="Habits" />

      <div className="min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
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
        <Card className="bg-card">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-4">Global Ranking</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">Level</TableHead>
                  <TableHead className="text-white">XP</TableHead>
                  <TableHead className="text-white">Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderBoard.slice(2).map((player, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>{index + 4}</TableCell>
                    <TableCell className="font-medium">
                      {player.Character.level.currentLevel}
                    </TableCell>
                    <TableCell>{player.Character.level.currentXP}</TableCell>
                    <TableCell>{player.Character.symbol}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
