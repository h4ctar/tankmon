import { MongoClient, WithId, WithoutId } from "mongodb";
import { Tank } from "../src/tanks/tank.schema";

export const client = new MongoClient(process.env.MONGODB_URI || "");


export const mapTank = (tank: WithId<Tank>): Tank => {
    return {...tank, id: tank._id.toString() }
};
