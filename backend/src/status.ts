import { PostStatus, RawStatus } from "@tankmon/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./prisma";

export const statusRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.post(
        "/api/status",
        {
            // schema: {
            //     body: PostStatus,
            // },
        },
        async (request, reply) => {
            server.log.info("Post status");

            server.log.info(request.body);
            server.log.info(typeof request.body);
            // server.log.info(JSON.parse(request.body));

            // const postStatus = request.body;
            // const statusData = RawStatus.parse(postStatus.data);
            // await prisma.status.create({
            //     data: { monitorId: postStatus.coreid, ...statusData },
            // });

            return reply.status(201).send();
        },
    );
};
