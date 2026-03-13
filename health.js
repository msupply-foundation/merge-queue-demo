// health.js — health check endpoint
const config = require("./config");

function checkHealth() {
  // This reads API_URL from config — will break if PR A merges first!
  const url = `${config.API_URL}/health`;
  console.log(`Health check: ${url}`);
  return { healthy: url.startsWith("http") };
}

module.exports = { checkHealth };
