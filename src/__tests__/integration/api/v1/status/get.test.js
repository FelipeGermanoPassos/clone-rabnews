const handler = require("src/pages/api/v1/status/status");
const { createRequest, createResponse } = require("node-mocks-http");
require("dotenv").config({ path: "config/.env.test" });

test("GET /api/v1/status should return 200", async () => {
  const req = createRequest({
    method: "GET",
  });
  const res = createResponse();

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(data.status).toBe("ok");
  expect(data.database_status).toEqual({ sum: 2 });
  expect(data.updated_at).toBeDefined();
});
