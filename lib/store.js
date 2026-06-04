// Vercel-compatible storage using Redis/KV via the Upstash REST client.
//
// Works with a Vercel KV / Upstash integration: connecting one in the Vercel
// dashboard injects KV_REST_API_URL / KV_REST_API_TOKEN automatically.
//
// Collections (leads, invoices, quotes) are stored as JSON arrays under one key
// each. If KV is not configured, store calls throw a clear error that the API
// handlers translate into a 503 so the rest of the site is unaffected.
import { Redis } from "@upstash/redis";

let redis = null;

export class StorageNotConfiguredError extends Error {
  constructor() {
    super("Storage not configured: add a Vercel KV / Upstash database.");
    this.code = "STORAGE_NOT_CONFIGURED";
  }
}

function client() {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new StorageNotConfiguredError();
  redis = new Redis({ url, token });
  return redis;
}

const key = (collection) => `ff:${collection}`;

export const store = {
  async getAll(collection) {
    return (await client().get(key(collection))) || [];
  },
  async find(collection, id) {
    const list = (await client().get(key(collection))) || [];
    return list.find((d) => d.id === id) || null;
  },
  async insert(collection, doc) {
    const list = (await client().get(key(collection))) || [];
    list.push(doc);
    await client().set(key(collection), list);
    return doc;
  },
  async update(collection, id, patch) {
    const list = (await client().get(key(collection))) || [];
    const idx = list.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
    await client().set(key(collection), list);
    return list[idx];
  },
  // Per-prefix counter (e.g. INV, QUO). Counter starts at 1000 -> first is 1001.
  async nextNumber(prefix) {
    const n = await client().incr(`ff:counter:${prefix}`);
    return 1000 + n;
  },
};
