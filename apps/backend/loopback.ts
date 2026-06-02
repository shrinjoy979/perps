import type { ToEngine } from "commons";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("Redis error:", err));
await client.connect();

export function loopback(message: ToEngine) {
    return new Promise((resolve, reject) => {
        const loopbackId = Math.random().toString();
        client.xAdd("engine", "*", {loopbackId, ...message})
    })
}