import type { IncomingMessage, ServerResponse } from "node:http";
import { adminApplications } from "../applications";

function sendError(res: ServerResponse, error: unknown) {
  if (res.headersSent) return;
  const message = error instanceof Error ? error.message : "Server error";
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await adminApplications(req, res);
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
}
