// Setup for jest-dom using CommonJS
require("@testing-library/jest-dom");

// Polyfill TextEncoder/TextDecoder for environments where they are not defined (needed by 'pg')
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
