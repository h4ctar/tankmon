import { z } from "zod";

const Link = z.object({ href: z.string() });

export const Id = z.string().min(1);

export const Tank = z.object({
    id: Id,
    name: z.string().min(3),
    sensorHeight: z.number(),
    diameter: z.number(),
    capacity: z.number(),
});

export const Status = z.object({
    waterLevel: z.number(),
    batteryCharge: z.number(),
    signalStrength: z.number(),
    publishedAt: z.date(),
});
export type Status = z.infer<typeof Status>;

export const TankResource = Tank.extend({
    status: Status.array(),
    _links: z
        .object({
            self: Link,
        })
        .optional(),
});
export type TankResource = z.infer<typeof TankResource>;

export const GetTanksResponse = z
    .object({
        id: Id,
        name: z.string().min(3),
        status: Status.optional(),
        _links: z
            .object({
                self: Link,
            })
            .optional(),
    })
    .array();
export type GetTanksResponse = z.infer<typeof GetTanksResponse>;

export const PostTank = Tank;
export type PostTank = z.infer<typeof PostTank>;

export const PostStatus = z.object({
    event: z.literal("status"),
    data: z.string(),
    coreid: z.string(),
    published_at: z.string(),
});
export type PostStatus = z.infer<typeof PostStatus>;
