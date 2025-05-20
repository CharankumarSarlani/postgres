import { Client } from "https: 
import "jsr:@std/dotenv/load";

const client = new Client({
  user: Deno.env.get("USERNAME"),
  database: Deno.env.get("DATABASE"),
  hostname: Deno.env.get("HOSTNAME"),
  port: Deno.env.get("PORT"),
  password: Deno.env.get("PASSWORD"),
});

const matchInfoQuery = () => `
  INSERT INTO match (
    match_number, season_year, played_on, team1_id, team2_id, venue_id,
    toss_winner_id, toss_decision, winner_id,
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
    (SELECT player_id FROM player WHERE player_name = $10),
    $11, $12, $13
  )
  RETURNING match_id
`;

const deliveryQuery = () => `
  INSERT INTO delivery(
    team_id, match_id, over_number, ball_number, striker_id, bowler_id, non_striker_id,
    batter_runs, total_runs, extra_type, extra_runs, dismissal_type, fielder_id, player_out_id
  ) VALUES (
    (SELECT team_id FROM team WHERE team_name = $1),
    (SELECT match_id FROM match WHERE played_on = $2 AND match_number = $3),
    $4, $5,
    (SELECT player_id FROM player WHERE player_name = $6),
    (SELECT player_id FROM player WHERE player_name = $7),
    (SELECT player_id FROM player WHERE player_name = $8),
    $9, $10, $11, $12, $13,
    (SELECT player_id FROM player WHERE player_name = $14),
    (SELECT player_id FROM player WHERE player_name = $15)
  )`;

 
const getJSONFiles = (dir) => {
  const files = [];
  for (const file of Deno.readDirSync(dir)) {
    if (file.name.endsWith(".json")) {
      files.push(`${dir}/${file.name}`);
    }
  }
  return files;
};

 
const fetchMatchInfo = (data) => [
  data.info.event?.match_number || 0,
  data.info.season,
  data.info.dates[0],
  data.info.teams[0],
  data.info.teams[1],
  data.info.venue,
  data.info.toss.winner,
  data.info.toss.decision,
  data.info.outcome?.winner || null,
  data.info.player_of_match?.[0],
  data.info.event.stage || "group",
  data.info.outcome.by?.runs || null,
  data.info.outcome.by?.wickets || null,
];

 
const processDelivery = (delivery, date, match_number, team, balls) => {
  const over = Math.floor(balls / 6);
  const extra = delivery.extras ? Object.keys(delivery.extras)[0] : null;
  const wicket_details = delivery.wickets?.[0];

  const values = [
    team,
    date,
    match_number,
    over,
    balls % 6,
    delivery.batter,
    delivery.bowler,
    delivery.non_striker,
    delivery.runs.batter,
    delivery.runs.total,
    extra,
    delivery.runs.extras,
    wicket_details?.kind,
    wicket_details?.fielders?.[0]?.name,
    wicket_details?.player_out,
  ];

  return client.queryArray(deliveryQuery(), values);
};

 
const isLegalDelivery = (delivery) => {
  const extras = ["byes", "legbyes"];
  if (delivery.extras) {
    return extras.includes(Object.keys(delivery.extras)[0]);
  }
  return true;
};

 
const processInnings = ({ team, overs }, date, match_number) => {
  const deliveries = overs.flatMap(({ deliveries }) => deliveries);
  let balls = 0;
  const queries = [];

  deliveries.forEach((delivery) => {
    queries.push(processDelivery(delivery, date, match_number, team, balls));
    if (isLegalDelivery(delivery)) balls++;
  });

  return Promise.all(queries);
};

 
const fetchInningData = (data) => {
  const date = data.info.dates[0];
  const match_number = data.info.event.match_number || 0;
  return data.innings.map((inning) =>
    processInnings(inning, date, match_number)
  );
};

 
const processFiles = (dir) => {
  const files = getJSONFiles(dir);
  const queries = [];

  files.forEach((file) => {
    console.log(`Processing file: ${file}`);
    try {
      const data = JSON.parse(Deno.readTextFileSync(file));
      const match_data = fetchMatchInfo(data);
      queries.push(client.queryObject(matchInfoQuery(), match_data));

      queries.push(...fetchInningData(data));
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  });

  return Promise.all(queries);
};

client
  .connect()
  .then(() => processFiles("../data"))
  .then(() => console.log("All files processed successfully."))
  .catch(console.error)
  .finally(() => client.end());
