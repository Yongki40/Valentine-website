import FloatingHearts from "../../components/FloatingHearts";

const placeholders: { title: string; text: string }[] = [
  { title: "A moment", text: "Put your favorite shared memory here." },
  { title: "A place", text: "The spot that reminds you of her." },
  { title: "A song", text: "The song that feels like Natalia." },
  { title: "A smile", text: "Something she did that you still remember." },
];

export default function GalleryPage() {
  return (
    <main className="container">
      <FloatingHearts />

      <section className="hero">
        <div className="badge">🖼️ Gallery</div>
        <h1>Little memories</h1>
        <p className="subtitle">
          Replace these cards with real photos later. (Simple and clean is
          already romantic.)
        </p>
      </section>

      <section className="grid">
        {placeholders.map((p, idx) => (
          <div key={idx} className="card half">
            <h2>✨ {p.title}</h2>
            <p>{p.text}</p>
            <p className="small" style={{ marginTop: 10 }}>
              Tip: later you can add an image tag here.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
