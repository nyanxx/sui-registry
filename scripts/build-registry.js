const fs = require("fs");
const path = require("path");

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const PACKAGE_PATH = path.join(__dirname, "../package.json");

const CATEGORIES = ["components", "sections", "pages", "pets", "utils"];

const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf8"));
const existingRegistry = fs.existsSync(REGISTRY_PATH)
  ? JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"))
  : { categories: {} };

function getFiles(dir, allFiles = []) {
  if (!fs.existsSync(dir)) return allFiles;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (file !== "node_modules" && !file.startsWith(".")) {
        getFiles(name, allFiles);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      allFiles.push(name);
    }
  }
  return allFiles;
}

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

      // Normalize inconsistent paths (e.g., components/pets -> pets)
      if (pathAfterAlias.startsWith("components/pets/")) {
        pathAfterAlias = pathAfterAlias.replace("components/pets/", "pets/");
      }

      // Handle special virtual/external requirements
      if (pathAfterAlias.startsWith("lib/utils")) {
        requires.add("lib:utils");
      } else if (pathAfterAlias.startsWith("components/ui/")) {
        const name = pathAfterAlias.split("/").pop();
        requires.add(`shadcn:${name}`);
      } else {
        // Standard internal path ID
        requires.add(pathAfterAlias);
      }
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
    const catDir = path.join(__dirname, "..", cat);
    const files = getFiles(catDir);

    files.forEach((fullPath) => {
      const relativePath = path.relative(path.join(__dirname, ".."), fullPath);
      const itemID = relativePath.replace(/\\/g, "/").replace(/\.tsx?$/, "");
      const fileName = path.basename(fullPath, path.extname(fullPath));

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
  });

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log("✅ Registry updated with path-based IDs!");
}

buildRegistry();
