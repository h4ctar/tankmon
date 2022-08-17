import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Tank } from "../../src/tanks/tank.schema";
import { client } from "../_mongo";
import { allowCors } from "../_utils";

const handler = async (request: VercelRequest, response: VercelResponse) => {
    console.log("url", request.url);
    console.log("method", request.method);
    console.log("query", request.query);
    console.log("body", request.body);

    if (request.method === "GET") {
        console.info("Get all tanks");

        await client.connect();
        const tanks = await client.db("tankmon").collection<Tank>("tanks").find().toArray();

        console.log(tanks);

        response.status(200).send(tanks);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
