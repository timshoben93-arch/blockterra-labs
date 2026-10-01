import { build } from "esbuild";

const shared = {
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  packages: "external",
  legalComments: "none",
};

await build({
  ...shared,
  entryPoints: ["server/entries/applications.ts"],
  outfile: "api/applications.js",
});

await build({
  ...shared,
  entryPoints: ["server/entries/adminApplications.ts"],
  outfile: "api/admin/applications.js",
});
