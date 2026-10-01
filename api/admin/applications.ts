import type { IncomingMessage, ServerResponse } from "node:http";
import { adminApplications } from "../../server/applications";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return adminApplications(req, res);
}
