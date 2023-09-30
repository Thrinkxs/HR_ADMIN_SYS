import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

dotenv.config();
// ?retryWrites=true&w=majority
const MONGODB_USERNAME: string = process.env.MONGO_USERNAME || "";
const MONGODB_PASSWORD: string = process.env.MONGO_PASSWORD || "";
const MONGODB_URL: string = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@hr-management.3s5ji6y.mongodb.net/`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

export const dbconfig = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
