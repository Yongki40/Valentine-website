"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("Natalia");

  useEffect(() => {
    const ok = localStorage.getItem("valentine_authed") === "yes";
    if (!ok) router.replace("/");

    const n = localStorage.getItem("valentine_name");
    if (n) setName(n);
  }, [router]);

  return (
    <main className="container">
      <div className="pageCard">
        <h1 className="pageTitle">Hi {name} 💗</h1>
        <p className="pageText">
          Welcome to your little Valentine world. Pick a page:
        </p>

        <div className="pageLinks">
          <Link className="linkBtn" href="/love-letter">💌 Love Letter</Link>
          <Link className="linkBtn" href="/reasons">🌸 Reasons</Link>
          <Link className="linkBtn" href="/question">💘 The Question</Link>
        </div>

        <button
          className="linkBtn ghost"
          onClick={() => {
            localStorage.removeItem("valentine_authed");
            localStorage.removeItem("valentine_name");
            router.push("/");
          }}
        >
          Logout 🙈
        </button>
      </div>
    </main>
  );
}
