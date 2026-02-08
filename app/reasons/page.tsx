"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const reasons = [
  "Your smile is literally a mood changer 💗",
  "Talking to you feels calm and exciting at once",
  "You’re cute in a way that feels unreal",
  "You make small moments feel special",
  "You’re the name this website is waiting for 😌",
];

export default function ReasonsPage() {
  const router = useRouter();

  useEffect(() => {
    const ok = localStorage.getItem("valentine_authed") === "yes";
    if (!ok) router.replace("/");
  }, [router]);

  return (
    <main className="container">
      <div className="pageCard">
        <h1 className="pageTitle">Reasons 🌸</h1>
        <ul className="reasons">
          {reasons.map((r, i) => (
            <li key={i} className="reasonItem">💖 {r}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
