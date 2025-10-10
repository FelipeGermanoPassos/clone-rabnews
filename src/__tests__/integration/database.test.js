// Mock pg Client to avoid connecting to a real database in automated tests
jest.mock("pg", () => {
  return {
    Client: function () {
      return {
        connect: jest.fn(() => Promise.resolve()),
        query: jest.fn(() => Promise.resolve({ rows: [{ sum: 2 }] })),
        end: jest.fn(() => Promise.resolve()),
      };
    },
  };
});

require("dotenv").config({ path: "config/.env.test" });

test("should connect to PostgreSQL (mocked)", async () => {
  const { Client } = require("pg");
  const client = new Client();

  await client.connect();
  const result = await client.query("SELECT 1 + 1 as sum");
  await client.end();

  expect(result.rows[0].sum).toBe(2);
});
