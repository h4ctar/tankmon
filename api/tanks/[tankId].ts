import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Tank } from "../../src/tanks/tank.schema";
import { allowCors } from "../_utils";
import { client, mapTank } from "../_mongo";
import { ObjectId } from "mongodb";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info(`Get specific tank ${request.query.tankId}`);

        await client.connect();
        const tank = await client.db("tankmon").collection<Tank>("tanks").findOne({ _id: new ObjectId(request.query.tankId as string) });

        if (!tank) {
            console.info("Not found")
            response.status(404).send("Not found");
        } else {
            console.log(tank);
            response.status(200).send(mapTank(tank));
        }
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
