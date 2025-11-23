// createFile.js
const fs = require("fs");
const path = require("path");

const fileName = process.argv[2];

if (!fileName) {
  console.error(
    "❌ Please provide a file name. Example: node createFile.js home-page"
  );
  process.exit(1);
}

// ✅ Validate filename
if (!/^[a-z0-9-_]+$/i.test(fileName)) {
  console.error(
    "❌ File name can only contain letters, numbers, hyphens, and underscores."
  );
  process.exit(1);
}

const ROOT = process.cwd();

const createdFiles = [];

const appJsPath = path.join(ROOT, "app.js");
const projectFolderName = path.basename(ROOT);

// -----------------------------
// Convert filename → camelCase
// -----------------------------
function toCamelCase(str) {
  return str.toLowerCase().replace(/[-_](.)/g, (_, chr) => chr.toUpperCase());
}

const camelName = toCamelCase(fileName);
const routeVarName = `${camelName}Route`;

// -----------------------------
// Convert filename → File Name
// -----------------------------
function formatForComment(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const commentWorthyFileName = formatForComment(fileName);

// -----------------------------
// Templates
// -----------------------------
const ejsTemplate = `
<%- layout(\`boilerplate/boilerplate\`) %>

<!-- CSS -->
<link rel="stylesheet" href="/stylesheet/${fileName}/${fileName}.css" />

<div class="${fileName}-container">
  <header class="${fileName}-header"></header>
  <main class="${fileName}-main"></main>
</div>

<!-- JS -->
<script src="/javascript/${fileName}/ex.js"></script>
`.trim();

const cssTemplate = `
@import url("/stylesheet/utils/utils.css");

/* >= 475px */
/* @media (min-width: 475px) {} */

/* >= 576px */
/* @media (min-width: 576px) {} */

/* >= 768px */
/* @media (min-width: 768px) {} */

/* >= 1024px */
/* @media (min-width: 1024px) {} */

/* >= 1260px */
/* @media (min-width: 1260px) {} */

/* >= 1400px */
/* @media (min-width: 1400px) {} */
`.trim();

const routeTemplate = `
const { 
  express,
  loadJSON } = require("../dependencies"); // Import necessary module and helper

// Initialize Express router
const router = express.Router();

// Import ${commentWorthyFileName} data 
const data = loadJSON("${fileName}/data.json");

// Route to display ${commentWorthyFileName} Page
router.get("/${fileName}", (_, res) => {
  // Rendering ${commentWorthyFileName} Page
  res.render("pages/${fileName}", { ...data });
});

module.exports = router;
`.trim();

// -----------------------------
// File Creation Helper
// -----------------------------
function safeWrite(filePath, content) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    createdFiles.push(path.relative(ROOT, filePath));
  } catch (err) {
    console.error(`❌ Failed to create ${filePath}:`, err.message);
    process.exit(1);
  }
}

// -----------------------------
// Create Files
// -----------------------------
safeWrite(path.join(ROOT, "views", "pages", `${fileName}.ejs`), ejsTemplate);
safeWrite(path.join(ROOT, "public", "javascript", fileName, `ex.js`));
safeWrite(
  path.join(ROOT, "public", "stylesheet", fileName, `${fileName}.css`),
  cssTemplate
);
safeWrite(
  path.join(ROOT, "data", fileName, "data.json"),
  JSON.stringify({}, null, 2)
);
safeWrite(path.join(ROOT, "routes", `${fileName}.js`), routeTemplate);

// -----------------------------
// Update app.js
// -----------------------------
try {
  // Backup app.js
  fs.copyFileSync(appJsPath, appJsPath + ".bak");

  let appJs = fs.readFileSync(appJsPath, "utf8");

  // --- Append require() at the end of require block
  const requireLine = `const ${routeVarName} = require("./routes/${fileName}");`;
  if (!appJs.includes(requireLine)) {
    const requireRegex =
      /(const\s+[\w]+\s*=\s*require\([^)]+\);\s*)+(\n\s*app\.use\()/m;
    appJs = appJs.replace(requireRegex, (match) =>
      match.replace(/\n\s*app\.use\(/, `\n${requireLine}\n\napp.use(`)
    );
  }

  // --- Append route variable at the end of app.use array
  const arrayInsert = `  ${routeVarName},`;
  if (!appJs.includes(arrayInsert.trim())) {
    const arrayRegex = /app\.use\("\/",\s*\[((.|\s)*?)\]/m;
    appJs = appJs.replace(arrayRegex, (match) =>
      match.replace(/\]$/, `${arrayInsert}\n]`)
    );
  }

  fs.writeFileSync(appJsPath, appJs, "utf8");
} catch (err) {
  console.error("❌ Failed to update app.js:", err.message);
  process.exit(1);
}

// Print table
console.log("\n📁 Created files:\n");
console.log(" Index │ File");
console.log("───────┼───────────────────────────────────────────────────────");

createdFiles.forEach((f, i) => {
  const displayPath = path.join(projectFolderName, f).replace(/\\\\/g, "\\");
  const coloredIndex = `\x1b[33m${i + 1}\x1b[0m`;
  const coloredFile = `\x1b[32m${displayPath}\x1b[0m`;
  console.log(`   ${coloredIndex}   │ ${coloredFile}`);
});
