"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import HeartConfetti from "../components/HeartConfetti";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedOnceRef = useRef(false);

  const hint = useMemo(() => "Hint: starts with “Na” 💗", []);

  useEffect(() => {
    // Create audio once on client
    audioRef.current = new Audio("/soft-lofi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  async function startMusic() {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setMusicOn(true);
      startedOnceRef.current = true;
    } catch {
      // autoplay blocked until user gesture — button click usually fixes it
      setMusicOn(false);
    }
  }

  function stopMusic() {
    audioRef.current?.pause();
    setMusicOn(false);
  }

  function tryStartMusicFromGesture() {
    // call on first user interaction (typing/click)
    if (!startedOnceRef.current) startMusic();
  }

  function handleLogin() {
    tryStartMusicFromGesture();

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
    <main className="loginWrap" onMouseDown={tryStartMusicFromGesture} onTouchStart={tryStartMusicFromGesture}>
      <HeartConfetti />

      <div className="loginCard">
        <h1 className="title">
          Will you be my valentine? <span className="heart">💝</span>
        </h1>

        <div className="kittyWrap">
          <Image src="/kitty.png" alt="Cute kitty" width={220} height={220} priority />
        </div>

        <div className="fieldWrap">
          <label className="label">Enter your name</label>
          <input
            className="input"
            value={name}
            onFocus={tryStartMusicFromGesture}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
              tryStartMusicFromGesture();
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

        <div className="musicRow">
          {!musicOn ? (
            <button className="musicBtn" onClick={startMusic} type="button">
              ▶ Play music
            </button>
          ) : (
            <button className="musicBtn" onClick={stopMusic} type="button">
              ⏸ Pause music
            </button>
          )}
          <span className="musicHint">soft romance mode 🎵</span>
        </div>

        <div className="footer">From me to you 💕</div>
      </div>
    </main>
  );
}
