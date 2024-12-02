"use client";
import { Button } from "@/src/components/ui/button";
import { LifestyleModification } from "@prisma/client";
import HabitShowcaseCard from "@/src/components/cards/HabitShowcaseCard";
import React, { Fragment, useState } from "react";
import FAQCard from "@/src/components/cards/FaqCard";
import confetti from "canvas-confetti";
import FeatureSlideshow from "@/src/components/slide/FeatureSlideShow";
import characterBored from "@/public/image/character-assets/women/women-2.png";
import characterHappy from "@/public/image/character-assets/women/women-3.png";
import characterHappySimple from "@/public/image/character-assets/women/women-4.png";
import characterSuperHappy from "@/public/image/character-assets/women/women-5.png";
import characterSad from "@/public/image/character-assets/women/women-1.png";
import Image from "next/image";
import arrow from "../../../public/icon/arrow/Arrow 11.svg";
import Navbar from "@/src/components/elements/Navbar";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
export default function Home() {
  const { data: session } = useSession();
  const faqs = [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.",
    },
    {
      question: "What are the key features of React?",
      answer:
        "Key features of React include its virtual DOM for efficient updating, component-based architecture, JSX syntax, and unidirectional data flow.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript, recommended for use with React. It looks similar to XML/HTML and allows you to write HTML structures in the same file as your JavaScript code.",
    },
    {
      question: "What are React Hooks?",
      answer:
        "React Hooks are functions that allow you to 'hook into' React state and lifecycle features from function components. They include useState, useEffect, useContext, and more.",
    },
  ];

  const character = [
    {
      id: 1,
      image: characterBored,
    },
    {
      id: 2,
      image: characterHappy,
    },
    {
      id: 3,
      image: characterSad,
    },
    {
      id: 4,
      image: characterHappySimple,
    },
  ];
  const [onShow, setOnShow] = useState<number>(0);
  const dummyHabitData: LifestyleModification[] = [
    {
      id: "1",
      activity: "Running",
      impactFactor: 20,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
    {
      id: "2",
      activity: "Swimming",
      impactFactor: 15,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
    {
      id: "3",
      activity: "Cycling",
      impactFactor: 25,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
  ];
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleConfettiOnElement = (event: React.MouseEvent) => {
    const { clientX, clientY } = event; // Koordinat klik
    const { innerWidth, innerHeight } = window;

    confetti({
      particleCount: 40,
      angle: 125,
      spread: 40,
      origin: {
        x: clientX / innerWidth, // Normalisasi X
        y: clientY / innerHeight, // Normalisasi Y
      },
    });
  };
  return (
    <>
      <Navbar user={session as Session} />
      <main className="mx-auto max-w-6xl w-full flex flex-col dark:bg-black">
        <section className=" min-h-screen relative">
          <div className="grid grid-cols-2 gap-5 mt-[14rem]">
            <div className="space-y-5 ">
              <h1 className="font-bold text-7xl text-secondary-foreground">
                Upgrade your{" "}
                <span className="text-foreground">lifestyle plan</span>
              </h1>
              <h3>Turn your health into quest to beat productivity</h3>
              <Button className="rounded-full px-10">GET STARTED</Button>
              <canvas
                className="z-10 "
                ref={canvasRef}
                style={{
                  width: "100%",
                  zIndex: 10,
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  pointerEvents: "none",
                }}
              />
            </div>
            <div className="w-full h-full flex flex-col items-end relative">
              <div className="  flex flex-col items-center relative">
                <div className="absolute z-10 -top-10 right-0">
                  <h1 className="font-bold text-xs mb-2 ">Tick of it.. 🤐</h1>
                  <Image
                    alt="arrow"
                    src={arrow}
                    className="rotate-90 fill-primary"
                    width={30}
                    height={30}
                  />
                </div>
                {(dummyHabitData.length > onShow &&
                  dummyHabitData.map((habit, i) => (
                    <Fragment key={i}>
                      {i === onShow && i < dummyHabitData.length && (
                        <HabitShowcaseCard
                          handleConfetti={handleConfettiOnElement}
                          stateId={i}
                          setState={setOnShow}
                          key={habit.id}
                          data={habit}
                        />
                      )}
                    </Fragment>
                  ))) || (
                  <div
                    onClick={() => setOnShow(0)}
                    className="flex w-[400px] h-fit p-7 bg-card rounded-lg cursor-pointer"
                  >
                    You have completed all the habits 🎉
                  </div>
                )}
                <div className="w-full flex justify-center mt-10 relative">
                  <div className="absolute z-10 right-0 top-0">
                    <h1 className="font-bold text-xs ">Make her happy 😊</h1>
                    <Image
                      alt="arrow"
                      src={arrow}
                      className="rotate-180 fill-primary"
                      width={30}
                      height={30}
                    />
                  </div>
                  {character.map(
                    (item, i) =>
                      item.id === onShow + 1 && (
                        <div key={i} className="flex relative">
                          <div className="absolute inset-0 flex items-center justify-center ">
                            <div
                              className={`w-1/2 h-1/2 -z-10 bg-gradient-to-tr from-blue-500 to-teal-500 rounded-full blur-3xl`}
                              style={{
                                animationDelay: "0.5s",
                                opacity: 0 + onShow * 0.25,
                              }}
                            />
                          </div>
                          <Image
                            key={i}
                            alt="character"
                            className=" rounded-xl drop-shadow-xl shadow-black"
                            src={item.image}
                          />
                        </div>
                      )
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-[14rem]">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-center">
              Better to be protected than to be hale
            </h1>
            <p className="text-center">
              We provide you with the best health analysis and implementation
              plan
            </p>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            <div className="bg-card w-[320px] h-[200px]">s</div>
            <div className="bg-card w-[320px] h-[200px]">s</div>
            <div className="bg-card w-[320px] h-[200px]">s</div>
          </div>
        </section>
        <section className="mb-[14rem]">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-center">
              Habit make fun, easy and productive
            </h1>
            <p className="text-center">
              We provide you with the best health analysis and implementation
              plan
            </p>
          </div>
          <FeatureSlideshow />
        </section>
        <section className="space-y-2">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-center">FAQ </h1>
            <p className="text-center">
              We provide you with the best health analysis and implementation
              plan
            </p>
          </div>
          {faqs.map((item, id) => (
            <FAQCard key={id} question={item.question} answer={item.answer} />
          ))}{" "}
        </section>
      </main>
    </>
  );
}
