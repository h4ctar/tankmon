import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Tank } from "../../src/tanks/tank.schema";
import { allowCors } from "../_utils";
import { client } from "../_mongo";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get specific tank");

        await client.connect();
        const tank = await client.db("tankmon").collection<Tank>("tanks").findOne({ _id: request.query.tankId });

        response.status(200).send(tank);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);