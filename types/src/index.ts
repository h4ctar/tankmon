import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.number();

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

export const PostStatus = z.object({
    monitorId: z.string(),
    distance: z.number(),
    batteryCharge: z.number(),
    signalStrength: z.number(),
    signalQuality: z.number(),
});
export type PostStatus = z.infer<typeof PostStatus>;
