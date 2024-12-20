import React from "react";
import Particles from "./components/particles";

interface Dungeon {
  keystone_run_id: number
  dungeon: string
  mythic_level: number
}

export default async function Home() {
  const data = await fetch('https://raider.io/api/v1/characters/profile?region=us&realm=tichondrius&name=pablojohn&fields=mythic_plus_weekly_highest_level_runs')
  const profile = await data.json()
  const weeklyDungeons = profile.mythic_plus_weekly_highest_level_runs

  var dungeonSlotsOpened = 0
  if (weeklyDungeons.length >= 1 && weeklyDungeons.length < 4)
    dungeonSlotsOpened = 1
  if (weeklyDungeons.length >= 4 && weeklyDungeons.length < 8)
    dungeonSlotsOpened = 2
  if (weeklyDungeons.length >= 8)
    dungeonSlotsOpened = 3

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        {dungeonSlotsOpened}
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          <ul className="flex items-center justify-center gap-4">
            {weeklyDungeons.map((dungeon: Dungeon) => (
              <li key={dungeon.keystone_run_id}>{dungeon.dungeon} {dungeon.mythic_level}</li>
            ))}
          </ul>
        </h2>
      </div>
    </div>
  );

}
