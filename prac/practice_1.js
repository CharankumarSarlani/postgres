import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "jsr:@std/dotenv/load";

// Database connection setup
const client = new Client({
  user: Deno.env.get("USERNAME"),
  database: Deno.env.get("DATABASE"),
  hostname: Deno.env.get("HOSTNAME"),
  port: Deno.env.get("PORT"),
  password: Deno.env.get("PASSWORD"),
});

const processMatchData = (jsonPath) => {
  const data = JSON.parse(Deno.readTextFileSync(jsonPath));
  const deliveries = [];
  const extras = [];
  const dismissals = [];

  const matchIdQuery = `(SELECT match_id FROM match WHERE match_number = ${data.info.event.match_number})`;

  for (const inning of data.innings) {
    for (const over of inning.overs) {
      for (const ball of over.deliveries) {
        const deliveryIdQuery = `(SELECT delivery_id FROM delivery WHERE match_id = ${matchIdQuery} AND over_number = ${over.over} AND ball_number = ${ball.ball})`;

        // Delivery data
        deliveries.push(
          [
            matchIdQuery,
            over.over,
            ball.ball,
            `(SELECT player_id FROM player WHERE player_name = '${ball.batter}')`,
            `(SELECT player_id FROM player WHERE player_name = '${ball.non_striker}')`,
            ball.runs.total,
          ].join(",")
        );

        // Extras data
        if (ball.runs.extras > 0) {
          extras.push([deliveryIdQuery, "'extra'", ball.runs.extras].join(","));
        }

        // Dismissal data
        if (ball.wickets) {
          for (const wicket of ball.wickets) {
            dismissals.push(
              [
                deliveryIdQuery,
                `'${wicket.kind}'`,
                `(SELECT player_id FROM player WHERE player_name = '${wicket.player_out}')`,
                wicket.fielders
                  ? `(SELECT player_id FROM player WHERE player_name = '${wicket.fielders[0].name}')`
                  : "NULL",
              ].join(",")
            );
          }
        }
      }
    }
  }

  return { deliveries, extras, dismissals };
};

// Function to write CSV
const writeCSV = (filename, data) => {
  Deno.writeTextFileSync(`./csv/${filename}.csv`, data.join("\n"));
};

// Process all JSON files
const processAllMatches = () => {
  const files = [...Deno.readDirSync("./data")].filter((f) =>
    f.name.endsWith(".json")
  );

  let allDeliveries = [];
  let allExtras = [];
  let allDismissals = [];

  for (const file of files) {
    const { deliveries, extras, dismissals } = processMatchData(
      `./data/${file.name}`
    );
    allDeliveries.push(...deliveries);
    allExtras.push(...extras);
    allDismissals.push(...dismissals);
  }

  writeCSV("deliveries", allDeliveries);
  writeCSV("extras", allExtras);
  writeCSV("dismissals", allDismissals);
};

processAllMatches();
console.log("✅ Data extracted and CSV files generated!");

import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "jsr:@std/dotenv/load";

const client = new Client({
  user: Deno.env.get("USERNAME"),
  database: Deno.env.get("DATABASE"),
  hostname: Deno.env.get("HOSTNAME"),
  port: Deno.env.get("PORT"),
  password: Deno.env.get("PASSWORD"),
});

// // const main = () => {
// //   client
// //     .connect()
// //     .then(() => {
// //       return client.queryObject("select * from  venue;");
// //       // return client.queryObject("INSERT INTO sample(name) VALUES($1)", [name]);
// //     })
// //     .then((data) => {
// //       console.log(data);
// //       console.log("Data inserted successfully");
// //       // alert("Data inserted successfully!");
// //     })
// //     .catch((error) => {
// //       console.error("Database error:", error);
// //     })
// //     .finally(() => {
// //       client.end();
// //     });
// // };

// // main();
// // Write code to convert your JSON to CSV here

// // const readData = (path) => {
// //   const players = [];
// //   const venues = [];
// //   for (const file of Deno.readDirSync(path)) {
// //     if (!file.name.endsWith(".json")) {
// //       continue;
// //     }
// //     const data = JSON.parse(Deno.readTextFileSync("./data/" + file.name));
// //     players.push(Object.values(data.info.players).flat());
// //     venues.push([data.info.venue, data.info.city]);
// //   }

// //   const places = new Set([...venues].flat());
// //   const allPlayers = players.flatMap((players) => players);
// //   const player = new Set([...allPlayers]);
// //   Deno.writeTextFileSync("./raw_data/venues.csv", [...places].join("\n"));
// //   Deno.writeTextFileSync("./raw_data/player.csv", [...player].join("\n"));
// // };

// // readData("./data");

const data = JSON.parse(Deno.readTextFileSync("../data/335982.json"));

const query = `
  INSERT INTO match (
    match_number, season_year, played_on, team1_id, team2_id, venue_id,
    toss_winner_id, toss_decision, winner_id, result_type,
    player_of_match_id, stage, win_by_runs, win_by_wickets
  )
  VALUES (
    $1, $2, $3,
    (SELECT team_id FROM team WHERE team_name = $4),
    (SELECT team_id FROM team WHERE team_name = $5),
    (SELECT venue_id FROM venue WHERE venue_name = $6),
    (SELECT team_id FROM team WHERE team_name = $7),
    $8,
    (SELECT team_id FROM team WHERE team_name = $9),
    $10,
    (SELECT player_id FROM player WHERE player_name = $11),
    $12, $13, $14
  )
`;

const values = [
  data.info.event.match_number,
  0,
  data.info.dates[0],
  data.info.teams[0],
  data.info.teams[1],
  data.info.venue,
  data.info.toss.winner,
  data.info.toss.decision,
  data.info.outcome.winner,
  data.info.outcome.result || "",
  data.info.player_of_match[0],
  data.info.event?.stage || "league",
  data.info.outcome.by?.runs || null,
  data.info.outcome.by?.wickets || null,
];

client
  .connect()
  .then(() => client.queryObject(query, values))
  .then(() => console.log("✅ Match inserted successfully"))
  .catch(console.log)
  .finally(() => client.end());
