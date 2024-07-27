import fs from "fs";
import { walkSync } from "./libs/walkSync.mjs";

for (const filePath of walkSync("./dist/chrome")) {
  if (filePath.endsWith(".js") || filePath.endsWith(".html")) {
    const original = fs.readFileSync(filePath, "utf8")
    const replaced = original.replaceAll("/_next", "/next")

    fs.writeFileSync(filePath, replaced, "utf8")
  }
}

{
  const thepackage = JSON.parse(fs.readFileSync("./package.json", "utf8"))

  const original = fs.readFileSync("./dist/chrome/manifest.json", "utf8")
  const replaced = original.replaceAll("VERSION", thepackage.version)

  fs.writeFileSync("./dist/chrome/manifest.json", replaced, "utf8")
}

for (const filePath of walkSync("./dist/chrome")) {
  if (filePath.endsWith(".js") || filePath.endsWith(".html")) {
    const original = fs.readFileSync(filePath, "utf8")

    const replaced = original
      .replaceAll("IS_WEBSITE", "false")
      .replaceAll("IS_CHROME", "true")
      .replaceAll("IS_FIREFOX", "false")
      .replaceAll("IS_SAFARI", "false")
      .replaceAll("IS_ANDROID", "false")
      .replaceAll("IS_APPLE", "false")

    fs.writeFileSync(filePath, replaced, "utf8")
  }
}