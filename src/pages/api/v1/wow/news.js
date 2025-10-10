const { fetchWowNewsWithCache } = require("../../../../services/blizzard");

function pickImageFromEntry(n) {
  // Common Blizzard structures may include `image`, `thumbnail`, or assets array
  if (!n) return null;
  if (n.image) return n.image;
  if (n.thumbnail) return n.thumbnail;
  if (n.assets && Array.isArray(n.assets) && n.assets.length) {
    // pick first asset with url
    const a = n.assets.find((x) => x.url || x.value || x.href);
    return a ? a.url || a.value || a.href : null;
  }
  return null;
}

async function handler(req, res) {
  const tryReal = req.query.mock === "false";
  try {
    const data = await fetchWowNewsWithCache();

    // Formatar notícias (assumindo estrutura da Blizzard)
    const items =
      data && (data.news || data.items)
        ? (data.news || data.items).map((n) => ({
            id: n.id || n.title,
            title: n.title || n.headline || "No title",
            summary: n.body ? n.body.substring(0, 240) : n.summary || "",
            url: n.url || (n.links && n.links.self) || null,
            date: n.date || n.published_at || n.publishedAt || null,
            image: pickImageFromEntry(n),
          }))
        : [];

    return res.status(200).json({ items, source: "blizzard" });
  } catch (err) {
    console.error("Blizzard fetch error:", err.message || err);

    // If the user explicitly requested real data, bubble error
    if (tryReal) {
      return res
        .status(502)
        .json({ error: "Blizzard API error", message: err.message });
    }

    // Retornar mock simples para desenvolvimento
    const items = [
      {
        id: "mock-1",
        title: "Exemplo de notícia do World of Warcraft",
        summary:
          "Este é um resumo de exemplo. Configure BLIZZARD_CLIENT_ID e BLIZZARD_CLIENT_SECRET para usar a API real.",
        url: "https://worldofwarcraft.com",
        date: new Date().toISOString(),
        image: null,
      },
    ];

    return res
      .status(200)
      .json({
        items,
        note: "mocked due to missing credentials or fetch error",
      });
  }
}

module.exports = handler;
