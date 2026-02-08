"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HeartConfetti from "../components/HeartConfetti";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const hint = useMemo(() => "Hint: starts with “Na” 💗", []);

  function playMusicGlobal() {
    // Controls the global MusicPlayer mounted in app/layout.tsx
    window.dispatchEvent(new Event("valentine:play"));
    localStorage.setItem("music_on", "yes");
  }

  function handleLogin() {
    // Try to start music on user gesture (allowed by browser)
    playMusicGlobal();

    const cleaned = name.trim();

    if (!cleaned) {
      setError("Type your name first, cutie 🥺");
      return;
    }
    if (cleaned.toLowerCase() !== "natalia") {
      const msgs = [
        "Hmm… that doesn’t feel right 😿",
        "Close… but only one special name works 💘",
        "Try again, pretty please 🌸",
        "The universe says: “not yet” 🙈",
      ];
      setError(msgs[Math.floor(Math.random() * msgs.length)]);
      return;
    }

    setError("");
    localStorage.setItem("valentine_authed", "yes");
    localStorage.setItem("valentine_name", cleaned);

    router.push("/home");
  }

  return (
    <main className="loginWrap">
      <HeartConfetti />

      <div className="loginCard">
        <h1 className="title">
          Will you be my valentine? <span className="heart">💝</span>
        </h1>

        <div className="kittyWrap">
          <Image
            src="/kitty.png"
            alt="Cute kitty"
            width={220}
            height={220}
            priority
          />
        </div>

        <div className="fieldWrap">
          <label className="label">Enter your name</label>
          <input
            className="input"
            value={name}
            onFocus={playMusicGlobal}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Type here…"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />

          <div className="hint">{hint}</div>

          {error ? <div className="error">{error}</div> : null}
        </div>

        <div className="actions">
          <button className="btnYes" onClick={handleLogin}>
            Login 💗
          </button>

          <button
            className="btnNo"
            onClick={() => setError("Nope button is disabled 😼 Try the right name!")}
            type="button"
          >
            Not me &gt;:(
          </button>
        </div>

        <div className="footer">From Yongki to you 💕</div>
      </div>
    </main>
  );
}
