"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionPage() {
  const router = useRouter();
  const [yes, setYes] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const noTexts = ["NO 😭", "WAIT 😨", "HEY 😾", "WHY 😿", "STOP 😵‍💫"];

  useEffect(() => {
    const ok = localStorage.getItem("valentine_authed") === "yes";
    if (!ok) router.replace("/");
  }, [router]);

  function moveNoButton() {
    const btn = noBtnRef.current;
    const card = cardRef.current;
    if (!btn || !card) return;

    // change text every escape
    btn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];

    const padding = 12;

    const cardRect = card.getBoundingClientRect();
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    const maxX = cardRect.width - btnWidth - padding;
    const maxY = cardRect.height - btnHeight - padding;

    const minX = padding;
    const minY = padding;

    let x = Math.random() * (maxX - minX) + minX;
    let y = Math.random() * (maxY - minY) + minY;

    // prevent tiny movements (feels smarter)
    if (
      Math.abs(btn.offsetLeft - x) < 40 &&
      Math.abs(btn.offsetTop - y) < 40
    ) {
      x = Math.random() * (maxX - minX) + minX;
      y = Math.random() * (maxY - minY) + minY;
    }

    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  }

  return (
    <main className="container">
      <div
        ref={cardRef}
        className="pageCard center"
        style={{ position: "relative" }}
      >
        <h1 className="pageTitle">Will you be my Valentine? 💝</h1>

        {/* Button playground */}
        <div
          style={{
            position: "relative",
            height: "220px",
            marginTop: "24px",
          }}
        >
          {/* YES */}
          <button
            className="btnYes"
            style={{ position: "relative", zIndex: 2 }}
            onClick={() => setYes(true)}
          >
            Yes! 💗
          </button>

          {/* NO (runaway 😈) */}
          <button
            ref={noBtnRef}
            className="btnNo"
            style={{
              position: "absolute",
              left: "60%",
              top: "60%",
              transition: "left 0.15s ease, top 0.15s ease",
            }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            type="button"
          >
            No &gt;:(
          </button>
        </div>

        {yes && (
          <div className="successBox">
            YAYYYY 💞 You just made my day 💗 <br />
            <a
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="callMeLink"
            >
              now call me 😉
            </a>
          </div>
        )}

      </div>
    </main>
  );
}
