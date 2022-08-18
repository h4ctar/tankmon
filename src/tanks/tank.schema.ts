import { z } from "zod";

export const Tank = z.object({
    _id: z.string().optional(),
    monitorId: z.string(),
    name: z.string().min(3),
    sensorHeight: z.number(),
    diameter: z.number(),
    capacity: z.number(),
});

export type Tank = z.infer<typeof Tank>;
