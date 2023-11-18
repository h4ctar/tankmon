import "dotenv/config";
import fastify from "fastify";
import {
    ZodTypeProvider,
    serializerCompiler,
    validatorCompiler,
} from "fastify-type-provider-zod";
import { statusRoutes } from "./status";
import { tankRoutes } from "./tanks";

export const server = fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "3000");
        server.log.info(`Starting server on port ${port}`);

        await server.register(tankRoutes);
        await server.register(statusRoutes);

        await server.listen({ port: port });

        server.log.info(`Server listening on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
