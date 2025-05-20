import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Database connection
const client = new Client({
  user: "postgres",
  database: "practice",
  hostname: "localhost",
  port: 5432,
  password: "charan",
});

await client.connect();

console.log("Server is running on http://localhost:8000");

serve(async (req) => {
  // ✅ Handle CORS Preflight Requests (OPTIONS Method)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const name = body.name;

      if (!name) {
        return new Response("Name is required", {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }

      await client.queryObject("INSERT INTO sample(name) VALUES($1)", [name]);

      return new Response("Data inserted successfully", {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    } catch (error) {
      return new Response("Database error: " + error.message, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  }

  return new Response("Invalid request", {
    status: 405,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
});
