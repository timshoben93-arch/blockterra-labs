import type { Plugin } from "vite";
import { loadEnv } from "vite";
import { adminApplications, createApplication, sendJson } from "./applications";

export function devApiPlugin(): Plugin {
  return {
    name: "application-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      if (env.ADMIN_DASHBOARD_KEY) process.env.ADMIN_DASHBOARD_KEY = env.ADMIN_DASHBOARD_KEY;
      if (env.FIREBASE_SERVICE_ACCOUNT) process.env.FIREBASE_SERVICE_ACCOUNT = env.FIREBASE_SERVICE_ACCOUNT;

      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url ?? "").split("?")[0];
        if (!pathname.startsWith("/api/")) {
          next();
          return;
        }
        try {
          if (pathname === "/api/applications") {
            await createApplication(req, res);
            return;
          }
          if (pathname === "/api/admin/applications") {
            await adminApplications(req, res);
            return;
          }
          sendJson(res, 404, { error: "Not found" });
        } catch (error) {
          console.error(error);
          sendJson(res, 500, { error: error instanceof Error ? error.message : "Server error" });
        }
      });
    },
  };
}
