test("GET /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.status).toBe("ok");
  expect(responseBody.database_status).toEqual({ sum: 2 });
  expect(responseBody.updated_at).toBeDefined();
});
