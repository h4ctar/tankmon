import { Id, PostTank, TankResource } from "@tankmon/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { NotFound } from "http-errors";
import { z } from "zod";
import { checkToken } from "./auth";
import { prisma } from "./prisma";
import { v4 as uuid } from "uuid";

export const tankRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get("/api/tanks", {}, async (request, reply) => {
        server.log.info("Get all tanks");

        const tankModels = await prisma.tank.findMany({});

        const tankResources: TankResource[] = tankModels.map((tankModel) => ({
            ...tankModel,
            _links: {
                self: {
                    href: `/api/tanks/${tankModel.id}`,
                },
                diagrams: {
                    href: `/api/diagrams?tankId=${tankModel.id}`,
                },
            },
        }));

        return reply.status(200).send(tankResources);
    });

    server.get(
        "/api/tanks/:tankId",
        {
            schema: {
                params: z.object({
                    tankId: Id,
                }),
            },
        },
        async (request, reply) => {
            server.log.info("Get tank");

            const tankModel = await prisma.tank.findUnique({
                where: {
                    id: request.params.tankId,
                },
            });

            if (!tankModel) {
                throw new NotFound("Tank not found");
            }

            const tankResource: TankResource = {
                ...tankModel,
                _links: {
                    self: {
                        href: `/api/tanks/${request.params.tankId}`,
                    },
                },
            };

            return reply.status(200).send(tankResource);
        },
    );

    server.post(
        "/api/tanks",
        {
            schema: {
                body: PostTank,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:tanks");

            server.log.info("Create tank");

            const postTank = request.body;
            const tankModel = await prisma.tank.create({
                data: {
                    id: uuid(),
                    ...postTank,
                },
            });

            const tankResource: TankResource = {
                ...tankModel,
                _links: {
                    self: {
                        href: `/api/tanks/${tankModel.id}`,
                    },
                },
            };

            return reply.status(201).send(tankResource);
        },
    );

    server.put(
        "/api/tanks/:tankId",
        {
            schema: {
                params: z.object({
                    tankId: Id,
                }),
                body: PostTank,
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:tanks");

            server.log.info("Update tank");

            const postTank = request.body;
            const tankModel = await prisma.tank.update({
                where: { id: request.params.tankId },
                data: postTank,
            });

            const tankResource: TankResource = {
                ...tankModel,
                _links: {
                    self: {
                        href: `/api/tanks/${tankModel.id}`,
                    },
                },
            };

            return reply.status(200).send(tankResource);
        },
    );

    server.delete(
        "/api/tanks/:tankId",
        {
            schema: {
                params: z.object({
                    tankId: Id,
                }),
            },
        },
        async (request, reply) => {
            await checkToken(request, "edit:tanks");

            server.log.info(`Delete tank - tankId: ${request.params.tankId}`);

            await prisma.tank.delete({
                where: { id: request.params.tankId },
            });

            return reply.status(200).send();
        },
    );
};
