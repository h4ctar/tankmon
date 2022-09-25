import type { VercelRequest, VercelResponse } from "@vercel/node";
import { WithId } from "mongodb";
import { Tank } from "../../src/tanks/tank.schema";
import { client, mapTank } from "../_mongo";
import { allowCors } from "../_utils";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "GET") {
        console.info("Get all tanks");

        await client.connect();
        const tanks = await client.db("tankmon").collection<Tank>("tanks").find().toArray();
        response.status(200).send(tanks.map(mapTank));
    } else if (request.method === "POST") {
        console.info("Create a new tank");

        const tank = Tank.parse(request.body);

        await client.connect();
        const result = await client.db("tankmon").collection<Tank>("tanks").insertOne(tank);
        tank.id = result.insertedId.id.toString();

        response.status(201).send(tank);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
