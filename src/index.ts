import { Client } from "pg";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const wss = new WebSocketServer({ port: 5000 });
wss.on("connection", function (socket) {
  console.log("user connected");
  setInterval(() => {
    socket.send("cur price: " + Math.random());
  }, 2000);
});

wss.on("close", function () {
  console.log("user disconnected");
});
const pgClient = new Client(process.env.POSTGRES_URL);

async function connect() {
  await pgClient.connect();
  console.log("connected to db");
  await pgClient.query(
    "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);"
  );
  const res = await pgClient.query("SELECT * from users;");
  console.log(res.rows);
}
connect();
