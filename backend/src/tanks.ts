import { GetTanksResponse, Id, PostTank, TankResource } from "@tankmon/types";
import { FastifyPluginCallback, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { NotFound } from "http-errors";
import { z } from "zod";
import { prisma } from "./prisma";
import { Tank } from "@prisma/client";

export const tankRoutes: FastifyPluginCallback<
    Record<never, never>,
    RawServerDefault,
    ZodTypeProvider
> = async (server) => {
    server.get("/api/tanks", {}, async (request, reply) => {
        server.log.info("Get all tanks");

        const tankModels = await prisma.tank.findMany({
            include: {
                status: {
                    orderBy: {
                        publishedAt: "asc",
                    },
                    where: {
                        publishedAt: {
                            gte: new Date(
                                new Date().getTime() - 24 * 60 * 60 * 1000,
                            ),
                        },
                    },
                },
            },
        });

        const getTanksResponse: GetTanksResponse = tankModels.map(
            (tankModel) => ({
                id: tankModel.id,
                name: tankModel.name,
                ...(tankModel.status[0]
                    ? {
                          status: {
                              waterLevel: Math.round(
                                  (tankModel.sensorHeight -
                                      tankModel.status[0].distance / 1000) /
                                      tankModel.sensorHeight,
                              ),
                              batteryCharge: tankModel.status[0].batteryCharge,
                              signalStrength:
                                  tankModel.status[0].signalStrength,
                              publishedAt: tankModel.status[0].publishedAt,
                          },
                      }
                    : {}),
                _links: {
                    self: {
                        href: `/api/tanks/${tankModel.id}`,
                    },
                    diagrams: {
                        href: `/api/diagrams?tankId=${tankModel.id}`,
                    },
                },
            }),
        );

        return reply.status(200).send(getTanksResponse);
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
                include: {
                    status: {
                        orderBy: {
                            publishedAt: "asc",
                        },
                        where: {
                            publishedAt: {
                                gte: new Date(
                                    new Date().getTime() - 24 * 60 * 60 * 1000,
                                ),
                            },
                        },
                    },
                },
            });

            if (!tankModel) {
                throw new NotFound("Tank not found");
            }

            const tankResource: TankResource = {
                id: tankModel.id,
                name: tankModel.name,
                sensorHeight: tankModel.sensorHeight,
                capacity: tankModel.capacity,
                diameter: tankModel.diameter,
                status: tankModel.status.map((status) => ({
                    waterLevel: Math.round(
                        (tankModel.sensorHeight - status.distance / 1000) /
                            tankModel.sensorHeight,
                    ),
                    batteryCharge: status.batteryCharge,
                    signalStrength: status.signalStrength,
                    publishedAt: status.publishedAt,
                })),
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
            server.log.info("Create tank");

            const postTank = request.body;
            const tankModel = await prisma.tank.create({
                data: postTank,
            });

            const tankResource: TankResource = {
                id: tankModel.id,
                name: tankModel.name,
                sensorHeight: tankModel.sensorHeight,
                capacity: tankModel.capacity,
                diameter: tankModel.diameter,
                status: [],
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
            server.log.info("Update tank");

            const postTank = request.body;
            const tankModel = await prisma.tank.update({
                where: { id: request.params.tankId },
                data: postTank,
            });

            const tankResource: TankResource = {
                id: tankModel.id,
                name: tankModel.name,
                sensorHeight: tankModel.sensorHeight,
                capacity: tankModel.capacity,
                diameter: tankModel.diameter,
                status: [],
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
            server.log.info(`Delete tank - tankId: ${request.params.tankId}`);

            await prisma.tank.delete({
                where: { id: request.params.tankId },
            });

            return reply.status(200).send();
        },
    );
};
