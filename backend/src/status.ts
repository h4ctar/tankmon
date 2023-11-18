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
            const data = postStatus.data.split(",");
            server.log.info("DATA " + data);
            await prisma.status.create({
                data: {
                    monitorId: postStatus.coreid,
                    distance: Number(data[0]),
                    batteryCharge: Number(data[1]),
                    signalStrength: Number(data[2]),
                    signalQuality: Number(data[3]),
                },
            });

            return reply.status(201).send();
        },
    );
};
