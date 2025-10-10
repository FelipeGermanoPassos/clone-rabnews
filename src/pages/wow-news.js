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

      {loading && <p className="text-slate-300">Carregando...</p>}
      {error && <p className="text-red-400">Erro: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h2>
            <p className="text-slate-300 mb-3">{item.summary}</p>
            <div className="flex items-center justify-between text-sm text-slate-400">
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
