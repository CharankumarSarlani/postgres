import "jsr:@std/dotenv/load";

import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  user: Deno.env.get("DATABASE_USER"),
  database: Deno.env.get("DATABASE"),
  hostname: Deno.env.get("HOST"),
  port: Deno.env.get("PORT"),
  password: Deno.env.get("PASSWORD"),
});

// const insertData = (data) => {};

function main(name, marks) {
  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL");
      return client.queryObject(
        `insert into sample(name , age) values($1, $2)`,
        [name]
      );
      // insert into sample sample(name , age) values(
      // charan, '');
      //  drop table job;

      // return client.queryObject("insert into sample");
      // return client.queryObject("select * from account");
      //insert into customer() values('charan', '');
      // drop  table job;
    })
    .then((result) => {
      console.table(result.rows);
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    })
    .finally(() => {
      client.end();
    });
}

const name = prompt("enter your name");
const marks = prompt("enter  your maeks");

main(name, marks);
// charan
// '); drop table job; --
