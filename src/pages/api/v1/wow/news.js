const { fetchWowNews } = require("../../../../services/blizzard");

async function handler(req, res) {
  try {
    // Em dev sem credenciais, fetchWowNews lançará. Capturamos e retornamos mock
    const data = await fetchWowNews();

    // Formatar notícias (assumindo estrutura da Blizzard)
    const items =
      data && data.news
        ? data.news.map((n) => ({
            id: n.id || n.title,
            title: n.title || n.headline || "No title",
            summary: n.body ? n.body.substring(0, 240) : n.summary || "",
            url: n.url || n.links?.self || null,
            date: n.date || n.published_at || null,
            image: n.image || null,
          }))
        : [];

    return res.status(200).json({ items });
  } catch (err) {
    console.error("Blizzard fetch error:", err.message || err);

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
