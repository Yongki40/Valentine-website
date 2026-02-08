"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(false);

  // Keep preference across refresh
  useEffect(() => {
    const wantOn = localStorage.getItem("music_on") === "yes";
    if (wantOn) {
      // Try to play (may be blocked until user gesture)
      audioRef.current?.play().then(() => setMusicOn(true)).catch(() => {
        // blocked; user needs to click play once
        setMusicOn(false);
      });
    }
  }, []);

  async function play() {
    try {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.5;
      await audioRef.current.play();
      setMusicOn(true);
      localStorage.setItem("music_on", "yes");
    } catch (e) {
      // autoplay blocked
      setMusicOn(false);
      localStorage.setItem("music_on", "no");
      console.error("Audio play blocked:", e);
    }
  }

  function pause() {
    audioRef.current?.pause();
    setMusicOn(false);
    localStorage.setItem("music_on", "no");
  }

  // Allow any page to control music by dispatching events
  useEffect(() => {
    const onPlay = () => play();
    const onPause = () => pause();

    window.addEventListener("valentine:play", onPlay);
    window.addEventListener("valentine:pause", onPause);

    return () => {
      window.removeEventListener("valentine:play", onPlay);
      window.removeEventListener("valentine:pause", onPause);
    };
  }, []);

  return (
    <>
      {/* Put your file in public/ and match this name */}
      <audio ref={audioRef} src="/soft-lofi.mp3" loop preload="auto" />

      {/* Global small control (shows on every page) */}
      <button
        type="button"
        onClick={musicOn ? pause : play}
        style={{
          position: "fixed",
          right: 14,
          bottom: 14,
          zIndex: 9999,
          borderRadius: 999,
          padding: "10px 14px",
          border: "2px solid rgba(255,90,138,.18)",
          background: "rgba(255,255,255,.85)",
          color: "rgba(255,90,138,.95)",
          fontWeight: 900,
          cursor: "pointer",
        }}
        aria-label="Music control"
      >
        {musicOn ? "⏸ Music" : "▶ Music"}
      </button>
    </>
  );
}
