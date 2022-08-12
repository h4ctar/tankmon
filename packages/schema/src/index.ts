import { z } from "zod";

export const Tank = z.object({
    id: z.string(),
    name: z.string(),
    height: z.number(),
    capacity: z.number(),
});

export type Tank = z.infer<typeof Tank>;
