import type { IncomingMessage, ServerResponse } from "node:http";
import { createApplication } from "../server/applications";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return createApplication(req, res);
}
