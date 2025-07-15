import mongoose from "mongoose";
import { config } from "../config/index.js";
import { DBName } from "../constants.js";

export const DB = async () => {
    try {
        console.log("Connecting to mongodb...");
        const connection = await mongoose.connect(`${config.mongoDbURI}/${DBName}`);
        const connectionHost = connection.connection.host;
        console.log("\nMongodb connected!!!");
        console.log("Connected to host: ", connectionHost, "\n");
    } catch (error) {
        console.log("Mongodb error: \n", error);
        process.exit(1);
    }
    
}