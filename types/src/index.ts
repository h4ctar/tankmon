import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.string().min(1);

export const Tank = z.object({
    monitorId: z.string(),
    name: z.string().min(3),
    sensorHeight: z.number(),
    diameter: z.number(),
    capacity: z.number(),
});

export const TankResource = Tank.extend({
    id: Id,
    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type TankResource = z.infer<typeof TankResource>;

export const PostTank = Tank;
export type PostTank = z.infer<typeof PostTank>;
