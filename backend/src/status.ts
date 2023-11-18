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
            server.log.info("Post status");

            const postStatus = request.body;
            await prisma.status.create({
                data: postStatus,
            });

            return reply.status(201).send();
        },
    );
};
