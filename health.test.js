// health.test.js
const { checkHealth } = require("./health");

const result = checkHealth();
if (!result.healthy) {
  console.error("FAIL: health check should return healthy");
  process.exit(1);
}
console.log("Health check tests passed!");
