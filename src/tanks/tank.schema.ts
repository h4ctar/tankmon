import { z } from "zod";

export const Tank = z.object({
    _id: z.string(),
    monitorId: z.string(),
    name: z.string(),
    sensorHeight: z.number(),
    diameter: z.number(),
    capacity: z.number(),
});

export type Tank = z.infer<typeof Tank>;
