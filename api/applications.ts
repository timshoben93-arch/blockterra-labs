import type { IncomingMessage, ServerResponse } from "node:http";

function sendError(res: ServerResponse, error: unknown) {
  if (res.headersSent) return;
  const message = error instanceof Error ? error.message : "Server error";
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const { createApplication } = await import("../server/applications");
    await createApplication(req, res);
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
}
