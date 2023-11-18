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
    percentageFull: z.number().optional(),
    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type TankResource = z.infer<typeof TankResource>;

export const PostTank = Tank;
export type PostTank = z.infer<typeof PostTank>;

export const Status = z.object({
    distance: z.number(),
    batteryCharge: z.number(),
    signalStrength: z.number(),
    signalQuality: z.number(),
});
export type Status = z.infer<typeof Status>;

export const PostStatus = z.object({
    event: z.literal("status"),
    data: z.string(),
    coreid: z.string(),
    published_at: z.string(),
});
export type PostStatus = z.infer<typeof PostStatus>;
