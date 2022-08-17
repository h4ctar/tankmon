import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Tank } from "../../src/tanks/tank.schema";
import { allowCors } from "../_utils";
import { client } from "../_mongo";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    console.log("url", request.url);
    console.log("method", request.method);
    console.log("query", request.query);
    console.log("body", request.body);
    console.log("body", JSON.parse(request.body));

    if (request.method === "GET") {
        console.info("Get specific tank");

        await client.connect();
        const tank = await client.db("tankmon").collection<Tank>("tanks").findOne({ _id: request.query.tankId });

        console.log(tank);

        response.status(200).send(tank);
    } else if (request.method === "POST") {
        console.info("Get a new tank");

        const tank = Tank.parse(JSON.parse(request.body));

        console.log(tank);

        await client.connect();
        await client.db("tankmon").collection<Tank>("tanks").insertOne(tank);

        response.status(201).send(tank);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
