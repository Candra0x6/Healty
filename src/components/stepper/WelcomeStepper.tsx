/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { BiomatricsForm } from "../form/BiomatricsForm";
import { LifestyleForm } from "../form/LifestyleForm";
import {
  createMission,
  MedicalHistoryFormCheckbox,
} from "../form/MedicalHistoryForm";
import { useUserMedicalStore } from "@/src/store/user-medical-store";
import { useRouter } from "next/navigation";
import { LoadingStethoscope } from "../skeleton/StethoschopeLoading";
export const updateCharacterName = async (name: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/character/change/name`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating character name:", error);
    throw error;
  }
};

const initialAchivments = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/achievement/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export default function WelcomeStepper() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [characterName, setCharacterName] = useState("");
  const { biometrics, lifestyle, medicalHistory } = useUserMedicalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchMedicalHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prompt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            biometrics,
            lifestyle,
            medicalHistory,
          }),
        }
      );

      if (response.ok) {
        const missionResponse = await createMission();
        await updateCharacterName(characterName);

        if (missionResponse?.ok) {
          const achivment = await initialAchivments();
          if (achivment?.ok) {
            router.push("/dashboard/my-habits");
          }
        } else {
          setIsLoading(false);
          throw new Error("Mission response was not ok");
        }
      } else {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Fetch error: ", error);
    }
  };
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Progress value={progress} className="h-2 bg-primary" />
          </motion.div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Biometrics
                </h1>
              </div>
              <BiomatricsForm handleContinue={handleContinue} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="hover:bg-card"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Lifestyle
                </h1>
              </div>
              <LifestyleForm handleContinue={handleContinue} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="hover:bg-card"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Medical History
                </h1>
              </div>
              <MedicalHistoryFormCheckbox
                onContinue={handleContinue}
                title="Continue"
              />
            </motion.div>
          )}

          {step === 4 && isLoading == false && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="hover:bg-card"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Set Your Character
                </h1>
              </div>
              {/* <div className="grid grid-cols-2 gap-4 mb-8">
               {characters.map((character) => (
                 <motion.button
                   key={character.id}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className={cn(
                     "bg-gray-800 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors",
                     selectedCharacter === character.id
                       ? "bg-green-500/20 text-green-400"
                       : "hover:bg-gray-700"
                   )}
                   onClick={() => setSelectedCharacter(character.id)}
                 >
                   <span className="text-4xl">{character.avatar}</span>
                   <span className="text-lg text-gray-300">
                     {character.name}
                   </span>
                 </motion.button>
               ))}
             </div> */}
              <Input
                type="text"
                placeholder="Enter your character name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border-gray-700 mb-4"
              />
              <Button
                onClick={fetchMedicalHistory}
                className="w-full"
                disabled={!characterName}
              >
                Submit
              </Button>
            </motion.div>
          )}
          {isLoading && <LoadingStethoscope />}
        </AnimatePresence>
      </div>
    </div>
  );
}
