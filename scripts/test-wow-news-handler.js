const handler = require("../src/pages/api/v1/wow/news");

const req = { method: "GET" };
const res = {
  status(code) {
    this._status = code;
    return this;
  },
  json(obj) {
    console.log("STATUS", this._status);
    console.log(JSON.stringify(obj, null, 2));
  },
};

handler(req, res).catch((err) => {
  console.error("Handler error", err);
  process.exit(1);
});
