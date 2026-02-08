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
          I made this little website because you deserve something sweet and simple.
          I like you—more than I can explain in one sentence… but I’ll keep trying in the nicest ways.
          <br /><br />
          Always your biggest admirer 💗
        </p>
      </div>
    </main>
  );
}
