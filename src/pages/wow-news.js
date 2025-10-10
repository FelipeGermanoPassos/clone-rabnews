import React, { useEffect, useState } from "react";

export default function WowNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/v1/wow/news");
        const json = await res.json();
        setItems(json.items || []);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", padding: 24 }}>
      <h1>WoW News</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "crimson" }}>Erro: {error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {items.map((item) => (
          <article
            key={item.id}
            style={{
              border: "1px solid #333",
              borderRadius: 8,
              padding: 12,
              background: "#0b1020",
              color: "#fff",
            }}
          >
            <h2 style={{ fontSize: "1.1rem" }}>{item.title}</h2>
            <p style={{ color: "#ccc" }}>{item.summary}</p>
            <p style={{ fontSize: 12, color: "#999" }}>
              {item.date ? new Date(item.date).toLocaleString() : ""}
            </p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#7fb1ff" }}
              >
                Leia mais
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
