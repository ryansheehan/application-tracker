import {z} from 'zod';

export const schema = z.object({
    company: z.string(),
    position: z.string(),
    links: z.array(z.object({
        label: z.string(),
        url: z.string().url({message: "Please enter a valid URL"}),
    })        
    ).min(1, "You must include the original job posting URL"),
    notes: z.string().optional(),
})
