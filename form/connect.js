import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Database connection details
const client = new Client({
  user: "postgres",
  database: "practice",
  hostname: "localhost",
  port: 5432,
  password: "charan",
});

// Function to insert data into the database
function insertData(name) {
  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL");

      return client.queryObject("INSERT INTO sample(name) VALUES($1)", [name]);
    })
    .then(() => {
      console.log("Data inserted successfully");
      alert("Data inserted successfully!");
    })
    .catch((error) => {
      console.error("Database error:", error);
    })
    .finally(() => {
      client.end();
    });
}

// Handling form submission
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("logbutton")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent page reload

      var name = document.getElementById("name").value.trim();

      if (name === "") {
        alert("Please enter a name.");
        return;
      }

      insertData(name);
    });
});
