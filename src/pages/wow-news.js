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
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-amber-300">WoW News</h1>
        <p className="text-sm text-slate-300">
          Últimas notícias e atualizações
        </p>
      </header>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 animate-pulse flex flex-col gap-3"
            >
              <div className="h-40 bg-slate-700 rounded w-full mb-2" />
              <div className="h-6 bg-slate-700 rounded w-3/4" />
              <div className="h-4 bg-slate-700 rounded w-full" />
              <div className="h-4 bg-slate-700 rounded w-2/3" />
              <div className="flex justify-between mt-2">
                <div className="h-3 w-1/4 bg-slate-700 rounded" />
                <div className="h-3 w-1/6 bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-400">Erro: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700 flex flex-col"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-2 border border-slate-700"
                loading="lazy"
                style={{ background: "#222" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              {item.title}
            </h2>
            <p className="text-slate-300 mb-3 line-clamp-3">{item.summary}</p>
            <div className="flex items-center justify-between text-sm text-slate-400 mt-auto">
              <time>
                {item.date ? new Date(item.date).toLocaleString() : ""}
              </time>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:underline"
                >
                  Leia mais
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
