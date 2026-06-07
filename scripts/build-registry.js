const fs = require("fs");
const path = require("path");

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const PACKAGE_PATH = path.join(__dirname, "../package.json");

const CATEGORIES = ["components", "sections", "pages", "pets", "utils"];

const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf8"));
const existingRegistry = fs.existsSync(REGISTRY_PATH)
  ? JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"))
  : { categories: {} };

// Map to store itemID by their file name and partial paths for resolution
const itemMap = new Map();
const allFiles = [];

function getFiles(dir, allFilesList = []) {
  if (!fs.existsSync(dir)) return allFilesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (file !== "node_modules" && !file.startsWith(".")) {
        getFiles(name, allFilesList);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      allFilesList.push(name);
    }
  }
  return allFilesList;
}

// Pre-scan all categories to build a resolution map
CATEGORIES.forEach((cat) => {
  const catDir = path.join(__dirname, "..", cat);
  const files = getFiles(catDir);
  files.forEach((fullPath) => {
    const relativePath = path.relative(path.join(__dirname, ".."), fullPath);
    const itemID = relativePath.replace(/\\/g, "/").replace(/\.tsx?$/, "");
    const fileName = path.basename(fullPath, path.extname(fullPath));

    allFiles.push({ fullPath, relativePath, itemID, fileName, cat });

    // Store by fileName for simple resolution
    if (!itemMap.has(fileName)) {
      itemMap.set(fileName, itemID);
    }

    // Store by itemID itself
    itemMap.set(itemID, itemID);

    // Store by cat/fileName
    itemMap.set(`${cat}/${fileName}`, itemID);
  });
});

function parseMetadata(content) {
  const descriptionMatch = content.match(/@description\s+(.*)/);
  return {
    description: descriptionMatch ? descriptionMatch[1].trim() : null,
  };
}

function parseImports(content) {
  const dependencies = new Set();
  const requires = new Set();

  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // 1. Internal Path-based Requirements (starting with @/)
    if (importPath.startsWith("@/")) {
      let pathAfterAlias = importPath.replace("@/", "");

      // Handle special virtual/external requirements
      if (pathAfterAlias.startsWith("lib/utils")) {
        requires.add("lib:utils");
        continue;
      }

      if (pathAfterAlias.startsWith("components/ui/")) {
        const name = pathAfterAlias.split("/").pop();
        requires.add(`shadcn:${name}`);
        continue;
      }

      // Try dynamic resolution
      // 1. Exact match
      if (itemMap.has(pathAfterAlias)) {
        requires.add(itemMap.get(pathAfterAlias));
        continue;
      }

      // 2. Normalized path (components/pets -> pets)
      let normalized = pathAfterAlias.replace(/^components\//, "");
      if (itemMap.has(normalized)) {
        requires.add(itemMap.get(normalized));
        continue;
      }

      // 3. Just the file name (last part)
      const fileName = pathAfterAlias.split("/").pop();
      if (itemMap.has(fileName)) {
        requires.add(itemMap.get(fileName));
        continue;
      }

      // Fallback: add as is if nothing matched
      requires.add(pathAfterAlias);
      continue;
    }

    // 2. Relative UI imports (fallback)
    if (importPath.startsWith("./ui/")) {
      const name = importPath.split("/").pop();
      requires.add(`shadcn:${name}`);
      continue;
    }

    // 3. External NPM dependencies
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      const pkgName = importPath.startsWith("@")
        ? importPath.split("/").slice(0, 2).join("/")
        : importPath.split("/")[0];

      if (!["react", "next"].includes(pkgName)) {
        dependencies.add(pkgName);
      }
    }
  }

  return {
    dependencies: Array.from(dependencies).sort(),
    requires: Array.from(requires).sort(),
  };
}

function buildRegistry() {
  const registry = {
    version: pkg.version,
    categories: {},
  };

  CATEGORIES.forEach((cat) => {
    registry.categories[cat] = {};
  });

  allFiles.forEach(({ fullPath, relativePath, itemID, fileName, cat }) => {
    const dirName = path.dirname(relativePath);
    const parts = dirName.split(path.sep);
    const group = parts.length > 1 ? parts[1] : cat;

    const content = fs.readFileSync(fullPath, "utf8");
    const meta = parseMetadata(content);
    const { dependencies, requires } = parseImports(content);

    // Try to get description from: 1. File Metadata, 2. Existing Registry, 3. Default
    let description = meta.description;
    if (
      !description &&
      existingRegistry.categories[cat] &&
      existingRegistry.categories[cat][itemID]
    ) {
      description = existingRegistry.categories[cat][itemID].description;
    }
    if (!description || description.endsWith(" component")) {
      description = description || `${fileName} component`;
    }

    registry.categories[cat][itemID] = {
      name: fileName,
      group,
      description,
      files: [relativePath.replace(/\\/g, "/")],
      dependencies,
      devDependencies: [],
      requires,
    };
  });

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log("✅ Registry updated with dynamic path resolution!");
}

buildRegistry();
