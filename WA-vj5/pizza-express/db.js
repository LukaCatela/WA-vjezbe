import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

console.log("USERNAME:", process.env.MONGO_USERNAME);
console.log("PASSWORD:", process.env.MONGO_PASSWORD);
console.log("CLUSTER:", process.env.MONGO_CLUSTER);

const mongoURI = `mongodb+srv://${username}:${password}@${cluster}.dxkfyc9.mongodb.net/?appName=${cluster}`;

console.log(mongoURI);
async function connectToDatabase() {
    try{
        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log("Uspjesno spajanje na bazu.");

        let db = client.db('pizza_db');
        return db;
    } catch (error){
        console.error("Doslo je do greske prilikom spajanja na bazu", error);
        throw error;
    }
}

export default connectToDatabase;
