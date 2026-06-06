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

function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function parseImports(content) {
  const dependencies = new Set();
  const requires = new Set();

  const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    if (importPath.startsWith("@/lib/utils")) {
      requires.add("lib:utils");
    } else if (
      importPath.startsWith("@/components/pets/") ||
      importPath.startsWith("@/pets/")
    ) {
      const name = importPath.split("/").pop();
      requires.add(`pets:${toPascalCase(name)}`);
    } else if (importPath.startsWith("@/components/")) {
      const parts = importPath.split("/");
      const name = parts[parts.length - 1];
      if (name !== "ui") {
        // ignore the UI folder itself
        requires.add(`component:${name}`);
      }
    } else if (importPath.startsWith("./ui/")) {
      const name = importPath.split("/").pop();
      requires.add(`shadcn:${name}`);
    } else if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
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
      const content = fs.readFileSync(fullPath, "utf8");
      const fileName = path.basename(fullPath, path.extname(fullPath));

      const dirName = path.dirname(relativePath);
      const parts = dirName.split(path.sep);
      const group = parts.length > 1 ? parts[1] : cat;

      const meta = parseMetadata(content);
      const { dependencies, requires } = parseImports(content);

      // Try to get description from: 1. File Metadata, 2. Existing Registry, 3. Default
      let description = meta.description;
      if (
        !description &&
        existingRegistry.categories[cat] &&
        existingRegistry.categories[cat][fileName]
      ) {
        description = existingRegistry.categories[cat][fileName].description;
      }
      if (!description || description.endsWith(" component")) {
        // If it was a default one, maybe we can keep it or improve it
        description = description || `${fileName} component`;
      }

      registry.categories[cat][fileName] = {
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
  console.log("✅ Registry updated! Descriptions preserved.");
}

buildRegistry();

// To add a new component: Just create the file. Run npm run build:registry, and it will appear in the JSON with all its dependencies correctly linked.
// To add a description: You have two choices:
// 1. Directly in the code (Recommended): Add a comment at the top of your component file:
//   1         /** @description This is a beautiful button */
//   2         export function MyButton() ...
// 2. In the JSON: Edit it in registry.json once. The script is smart enough to see it and keep it forever.
