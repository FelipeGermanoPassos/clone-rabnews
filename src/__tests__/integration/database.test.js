const { Client } = require("pg");
require("dotenv").config({ path: ".env.test" });

test("should connect to PostgreSQL", async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  await client.connect();
  const result = await client.query("SELECT 1 + 1 as sum");
  await client.end();

  expect(result.rows[0].sum).toBe(2);
});
