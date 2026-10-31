import os from "node:os";
import { site } from "@/config/site";

/**
 * The address the desktop QR code opens: {domain}/download/.
 * Until a domain is set, it is this computer's address on the local network (so a phone on the same Wi-Fi can scan it
 * while you preview). TODO: set site.domain before going live.
 */
export function downloadPageUrl(): string {
  if (site.domain) return `${site.domain.replace(/\/$/, "")}/download/`;
  return `http://${lanAddress() ?? "localhost"}:${process.env.PORT ?? 3100}/download/`;
}

function lanAddress(): string | undefined {
  const candidates: string[] = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list ?? []) {
      if (a.family === "IPv4" && !a.internal) candidates.push(a.address);
    }
  }
  // prefer a normal home/office Wi-Fi range over virtual adapters
  return candidates.find((a) => a.startsWith("192.168.")) ?? candidates.find((a) => a.startsWith("10.")) ?? candidates[0];
}
