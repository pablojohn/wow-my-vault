"use client";

import React, { useState } from "react";
import { Card } from './components/card';
import FormComponent from "./components/form";
import Footer from "./components/footer"; // Import the Footer component

interface Dungeon {
  keystone_run_id: number
  dungeon: string
  mythic_level: number
}

export default function Home() {
  const [weeklyDungeons, setWeeklyDungeons] = useState<Dungeon[]>([]);
  const [slots, setSlots] = useState<{ mythic_level: number, reward_level: number }[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (name: string, realm: string) => {
    setFormSubmitted(false); // Reset formSubmitted to false to trigger animations

    const data = await fetch(`/api/fetchDungeons?name=${name}&realm=${realm}`);
    if (!data.ok) {
      console.error('Failed to fetch data');
      return;
    }
    const profile = await data.json();
    const weeklyDungeons = profile.mythic_plus_weekly_highest_level_runs;

    const sortedDungeons = weeklyDungeons.sort((a: Dungeon, b: Dungeon) => b.mythic_level - a.mythic_level);
    const top3Dungeons = sortedDungeons.slice(0, 3);

    const slots = top3Dungeons.map((dungeon: Dungeon) => {
      let reward_level = 0;
      if (dungeon.mythic_level >= 0 && dungeon.mythic_level <= 2) {
        reward_level = 606;
      } else if (dungeon.mythic_level >= 3 && dungeon.mythic_level <= 4) {
        reward_level = 610;
      } else if (dungeon.mythic_level >= 5 && dungeon.mythic_level <= 6) {
        reward_level = 613;
      } else if (dungeon.mythic_level === 7) {
        reward_level = 616;
      } else if (dungeon.mythic_level >= 8 && dungeon.mythic_level <= 9) {
        reward_level = 619;
      } else if (dungeon.mythic_level >= 10) {
        reward_level = 623;
      }
      return {
        mythic_level: dungeon.mythic_level,
        reward_level: reward_level
      };
    });

    setWeeklyDungeons(sortedDungeons.slice(0, 10));
    setSlots(slots);
    setFormSubmitted(true); // Set formSubmitted to true to trigger animations
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black p-4">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">WoW My Vault</h1>
        <FormComponent onSubmit={handleFormSubmit} />
        {formSubmitted && (
          <>
            <h1 className="py-3.5 px-0.5 z-10 text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text">
              <div className="flex overflow-x-auto space-x-4 mt-8 sm:mt-0">
                {slots.map((slot, index) => (
                  <Card key={index} className="min-h-[200px] min-w-[200px] flex-shrink-0">
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
                      <h2 className="text-2xl font-bold text-white underline">Slot {index + 1}</h2>
                      <span className="text-xl text-white">{slot.mythic_level}</span>
                      <span className="text-xl text-white">{slot.reward_level}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </h1>
            <div className="my-8 text-center animate-fade-in">
              <h2 className="text-sm text-white">
                <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {weeklyDungeons.slice(0, 10).map((dungeon: Dungeon, index: number) => (
                    <React.Fragment key={dungeon.keystone_run_id}>
                      <li>{dungeon.dungeon} {dungeon.mythic_level}</li>
                      {index < weeklyDungeons.slice(0, 10).length - 1 && <span className="hidden sm:inline text-white">|</span>}
                    </React.Fragment>
                  ))}
                </ul>
              </h2>
            </div>
          </>
        )}
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}