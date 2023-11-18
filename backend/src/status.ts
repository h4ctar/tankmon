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

            server.log.info("BODY " + JSON.stringify(request.body));
            server.log.info("BODY TYPE " + typeof request.body);

            const postStatus = request.body as PostStatus;
            server.log.info("RAW DATA " + JSON.stringify(postStatus.data));
            server.log.info("RAW DATA TYPE " + typeof postStatus.data);
            const statusData = RawStatus.parse(postStatus.data);
            server.log.info("DATA " + statusData);
            await prisma.status.create({
                data: { monitorId: postStatus.coreid, ...statusData },
            });

            return reply.status(201).send();
        },
    );
};
