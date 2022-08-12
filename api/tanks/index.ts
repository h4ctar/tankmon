import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Tank } from "../../src/tank.schema";
import { allowCors } from "../_utils";

const TANKS: Tank[] = [{ id: "asdf", name: "Bob" }];

const handler = (request: VercelRequest, response: VercelResponse) => {
    console.log("url", request.url);
    console.log("method", request.method);
    console.log("query", request.query);
    console.log("body", request.body);

    if (request.method === "GET") {
        console.info("Get all tanks");
        response.status(200).send(TANKS);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
