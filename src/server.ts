import express from "express";
import {createNewMember} from "../src/controllers/sql";
import { Client } from "pg";
import { config } from "dotenv";
import cors from "cors";

const app = express();

config();
app.use(express.json());
app.use(cors());


const herokuSSLSetting = {rejectUnauthorized: false};
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: sslSetting
};

export const client = new Client(dbConfig);


async function clientConnect(){
    await client.connect();
    console.log("Client connected successfully");
}

clientConnect();

app.post("/subscribe", createNewMember)

const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
