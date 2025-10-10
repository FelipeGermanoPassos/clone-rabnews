jest.mock("src/services/blizzard", () => ({
  fetchWowNewsWithCache: jest.fn(() =>
    Promise.resolve({
      news: [
        {
          id: "a1",
          title: "N1",
          body: "Body 1",
          url: "http://example.com/1",
          date: "2025-01-01T00:00:00Z",
        },
        {
          id: "a2",
          title: "N2",
          body: "Body 2",
          url: "http://example.com/2",
          date: "2025-01-02T00:00:00Z",
          assets: [{ url: "http://img" }],
        },
      ],
    }),
  ),
}));

const handler = require("src/pages/api/v1/wow/news");
const { createRequest, createResponse } = require("node-mocks-http");

test("GET /api/v1/wow/news returns formatted items", async () => {
  const req = createRequest({ method: "GET" });
  const res = createResponse();

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(Array.isArray(data.items)).toBe(true);
  expect(data.items.length).toBe(2);
  expect(data.items[1].image).toBe("http://img");
});
