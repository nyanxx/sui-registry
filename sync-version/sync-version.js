// ./sync-version/sync-version.js
const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const newVersion = pkg.version;

const targetFilePath = path.join(__dirname, "../registry.json");

const registry = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
registry.version = newVersion;
fs.writeFileSync(
  targetFilePath,
  JSON.stringify(registry, null, 2) + "\n",
  "utf8",
);

console.log(`Successfully synced version ${newVersion} to registry.json`);
