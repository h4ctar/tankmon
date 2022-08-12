import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Tank } from "@tankmon/schema";
import { allowCors } from "../_utils";

const handler = (request: VercelRequest, response: VercelResponse) => {
    console.log("url", request.url);
    console.log("method", request.method);
    console.log("query", request.query);
    console.log("body", request.body);
    console.log("body", JSON.parse(request.body));

    // bump

    if (request.method === "GET") {
        console.info("Get all tanks");

        console.log(Tank.parse(JSON.parse(request.body)));

        const { name } = request.query;
        response.status(200).send(`Hello ${name}!`);
    } else {
        throw new Error("Unsupported method");
    }
};

export default allowCors(handler);
