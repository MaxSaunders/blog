import dayjs from "dayjs"
import { z } from "zod"

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
})

export type Blog = z.infer<typeof blogSchema>

export const metaDataSchema = z.object({
    title: z.string().catch("Untitled"),
    author: z.string().catch(""),
    date: z
        .string()
        .transform((val) => dayjs(val))
        .optional(),
    tags: z.array(z.string()),
})

export type MetaData = z.infer<typeof metaDataSchema>
