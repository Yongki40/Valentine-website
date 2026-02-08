import Link from "next/link";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/love-letter", label: "Love Letter" },
  { href: "/reasons", label: "Reasons" },
  { href: "/gallery", label: "Gallery" },
  { href: "/question", label: "Question" },
];

export default function NavBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(255,255,255,.65)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #ffe0ed",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link href="/" style={{ fontWeight: 800 }}>
          For <span style={{ color: "#ff4d88" }}>Natalia</span> 💗
        </Link>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid #ffd1e3",
                background: "#fff",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
