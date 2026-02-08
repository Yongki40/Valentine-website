"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoveLetterPage() {
  const router = useRouter();

  useEffect(() => {
    const ok = localStorage.getItem("valentine_authed") === "yes";
    if (!ok) router.replace("/");
  }, [router]);

  return (
    <main className="container">
      <div className="pageCard">
        <h1 className="pageTitle">Love Letter 💌</h1>
        <p className="pageText">
          Dear Natalia,<br /><br />
          I made this little website for you, because you deserve something sweet, simple, and made with love.
          I love you more than I can put into words. Since I never quite know how to express my feelings, 
          I decided to create this website for you—something small, but filled with everything I feel for you.
          <br /><br />
          Always your biggest admirer 💗
          <br />
          - Yongki Tanu
        </p>
      </div>
    </main>
  );
}
