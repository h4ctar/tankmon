import type { VercelRequest, VercelResponse } from "@vercel/node";
import { User } from "../../../packages/schema/src";
import { allowCors } from "./_utils";

const handler = (request: VercelRequest, response: VercelResponse) => {
    console.log("url", request.url);
    console.log("method", request.method);
    console.log("body", request.body);
    console.log("body", JSON.parse(request.body));

    console.log(User.parse(JSON.parse(request.body)));

    const { name } = request.query;
    response.status(200).send(`Hello ${name}!`);
};

export default allowCors(handler);
