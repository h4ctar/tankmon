import type { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "./_utils";

const handler = (request: VercelRequest, response: VercelResponse) => {
    const { name } = request.query;
    response.status(200).send(`Hello ${name}!`);
};

export default allowCors(handler);