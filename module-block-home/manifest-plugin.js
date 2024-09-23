const fs = require("fs");
const path = require("path");

class ManifestPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("ManifestPlugin", (stats) => {
      const packageJson = require("./package.json");
      const manifest = {
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version,
        scope: packageJson.customData?.scope || "",
        module: "./app",
        export: "default",
        path: packageJson.customData?.path || "",
        type: packageJson.customData?.type || "",
        authors: packageJson.contributors || [],
      };

      // Écriture du fichier manifest.json dans le dossier dist
      fs.writeFileSync(
        path.resolve(compiler.options.output.path, "manifest.json"),
        JSON.stringify(manifest, null, 2)
      );
    });
  }
}

module.exports = ManifestPlugin;
