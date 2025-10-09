test("GET /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status/status");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});
