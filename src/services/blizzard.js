const fetch = require("node-fetch");
require("dotenv").config({ path: "config/.env.development" });

const regionHost = {
  us: "https://us.api.blizzard.com",
  eu: "https://eu.api.blizzard.com",
  kr: "https://kr.api.blizzard.com",
  tw: "https://tw.api.blizzard.com",
};

async function getAccessToken() {
  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;
  const region = process.env.BLIZZARD_REGION || "us";
  if (!clientId || !clientSecret) {
    throw new Error(
      "Blizzard API credentials not set in env (BLIZZARD_CLIENT_ID / BLIZZARD_CLIENT_SECRET)",
    );
  }

  const tokenUrl = `https://${region}.battle.net/oauth/token`;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to get token: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return { token: data.access_token, expires_in: data.expires_in, region };
}

async function fetchWowNews() {
  // Documentação: https://develop.battle.net/documentation/world-of-warcraft
  const region = process.env.BLIZZARD_REGION || "us";
  const host = regionHost[region] || regionHost["us"];

  // Endpoint de exemplo: /news/wow
  // A Blizzard muda endpoints, e pode precisar de namespace e locale.
  // Vamos tentar um endpoint genérico e tratar erros.
  try {
    const { token } = await getAccessToken();
    const url = `${host}/news/wow?locale=en_US`; // pode ajustar locale via env
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Blizzard API returned ${res.status}: ${txt}`);
    }

    const json = await res.json();
    // Retornar raw por enquanto; o route handler formatará
    return json;
  } catch (err) {
    // Propagar erro
    throw err;
  }
}

module.exports = {
  getAccessToken,
  fetchWowNews,
};
