import { PostStatus } from "@tankmon/types";
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
            schema: {
                body: PostStatus,
            },
        },
        async (request, reply) => {
            const postStatus = request.body;

            server.log.info(`Post status - ${postStatus.coreid}`);

            const data = postStatus.data.split(",");

            await prisma.status.create({
                data: {
                    tankId: postStatus.coreid,
                    distance: Number(data[0]),
                    batteryCharge: Number(data[1]),
                    signalStrength: Number(data[2]),
                    signalQuality: Number(data[3]),
                    publishedAt: new Date(postStatus.published_at),
                },
            });

            return reply.status(201).send();
        },
    );
};
