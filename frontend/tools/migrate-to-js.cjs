const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const ROOT = process.cwd()
const TARGET_DIRS = ["app", "components", "hooks", "lib"]

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walk(fullPath))
      continue
    }

    if (/\.d\.ts$/.test(entry.name)) continue
    if (!/\.(ts|tsx)$/.test(entry.name)) continue
    files.push(fullPath)
  }

  return files
}

function convertFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8")
  const isTsx = filePath.endsWith(".tsx")
  const result = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: path.basename(filePath),
  })

  const nextPath = filePath.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js")
  fs.writeFileSync(nextPath, result.outputText, "utf8")
  return { filePath, nextPath, isTsx }
}

for (const targetDir of TARGET_DIRS) {
  const fullDir = path.join(ROOT, targetDir)
  if (!fs.existsSync(fullDir)) continue
  const files = walk(fullDir)
  files.forEach(convertFile)
}

console.log("Converted TypeScript files to JavaScript.")
