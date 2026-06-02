import type { ToEngine } from "commons";
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("Redis error:", err));
await client.connect();

while(1) {
  const response = await client.xReadGroup("engine", "engine", [{
    key: "engine",
    id: ">"
  }], {
    BLOCK: 100,
    COUNT: 1
  })

  if (!response) {
    continue;
  }

  console.log(response);
}