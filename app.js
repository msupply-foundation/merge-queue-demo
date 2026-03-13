// app.js — main application
const config = require("./config");

function fetchData() {
  const apiUrl = process.env.API_URL || "https://api.example.com";
  console.log(`Fetching from ${apiUrl} with timeout ${config.TIMEOUT}`);
  return { status: "ok" };
}

module.exports = { fetchData };
