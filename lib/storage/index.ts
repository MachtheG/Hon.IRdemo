import fs from "node:fs/promises";
import path from "node:path";

/** Pluggable storage for form submissions. Swap in a database adapter later:
 *  implement `StorageAdapter` and return it from `getStore()`. */
export type Kind = "pledge" | "volunteer";
export interface Submission {
  kind: Kind;
  at: string;
  data: Record<string, unknown>;
}
export interface StorageAdapter {
  name: string;
  save(s: Submission): Promise<void>;
  count(kind: Kind): Promise<number>;
}

/** Local development: appends to .data/submissions.json (git-ignored). */
function jsonFileAdapter(file = path.join(process.cwd(), ".data", "submissions.json")): StorageAdapter {
  const read = async (): Promise<Submission[]> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      return [];
    }
  };
  return {
    name: "json",
    async save(s) {
      const all = await read();
      all.push(s);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify(all, null, 1));
    },
    async count(kind) {
      return (await read()).filter((s) => s.kind === kind).length;
    },
  };
}

/** Serverless fallback: memory + console log (resets on cold start). */
const mem: Submission[] = [];
function consoleAdapter(): StorageAdapter {
  return {
    name: "console",
    async save(s) {
      mem.push(s);
      // Log without the phone number.
      const { phone: _p, ...rest } = s.data as Record<string, unknown>;
      console.log(`[submission] ${s.kind}`, JSON.stringify(rest));
    },
    async count(kind) {
      return mem.filter((s) => s.kind === kind).length;
    },
  };
}

let store: StorageAdapter | null = null;
export function getStore(): StorageAdapter {
  if (store) return store;
  const choice = process.env.STORAGE_ADAPTER ?? (process.env.VERCEL ? "console" : "json");
  store = choice === "json" ? jsonFileAdapter() : consoleAdapter();
  return store;
}
