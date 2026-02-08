"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

const photos: Photo[] = [
  { src: "/gallery/natalia-5.jpg", alt: "Natalia photo 1", caption: "My favorite smile 💗" },
  { src: "/gallery/natalia-6.jpg", alt: "Natalia photo 2", caption: "Softest vibe 🌸" },
  { src: "/gallery/natalia-1.jpg", alt: "Natalia photo 3", caption: "Pretty moments ✨" },
  { src: "/gallery/natalia-4.jpg", alt: "Natalia photo 4", caption: "Cute moments 😻" },
  { src: "/gallery/natalia-2.jpg", alt: "Natalia photo 5", caption: "Always stunning 💖" },
  { src: "/gallery/natalia-3.jpg", alt: "Natalia photo 6", caption: "Peakaboo 👻" },
  { src: "/gallery/natalia-7-copy.jpg", alt: "Natalia photo 7", caption: "Embarrassed but always pretty 🦋" },
  { src: "/gallery/natalia-9.jpg", alt: "Natalia photo 8", caption: "Shy cat 😳" },
  { src: "/gallery/natalia-8.jpg", alt: "Natalia photo 8", caption: "First picture you give me 🫣" },
];

export default function GalleryOfLovePage() {
  const router = useRouter();

  // Keep your "login gate"
  useEffect(() => {
    const ok = localStorage.getItem("valentine_authed") === "yes";
    if (!ok) router.replace("/");
  }, [router]);

  return (
    <main className="container">
      <div className="pageCard" style={{ position: "relative" }}>
        <h1 className="pageTitle">Gallery of You 💞</h1>
        <p className="pageText" style={{ marginBottom: 14 }}>
          A little collection of the prettiest moments.
        </p>

        <div className="loveGallery">
          {photos.map((p, idx) => (
            <figure className="loveTile" key={idx}>
              <div className="loveImgWrap">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={idx < 2}
                />
              </div>
              {p.caption ? <figcaption className="loveCaption">{p.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
