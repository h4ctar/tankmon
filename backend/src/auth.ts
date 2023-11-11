import { FastifyRequest } from "fastify";
import { Forbidden } from "http-errors";

export type User = {
    preferred_username: string;
    realm_access: {
        roles: string[];
    };
};

export const checkToken = async (request: FastifyRequest, role: string) => {
    const user: User = await request.jwtVerify();
    if (!user.realm_access.roles.includes(role)) {
        throw new Forbidden("Missing role");
    }
    return user;
};
