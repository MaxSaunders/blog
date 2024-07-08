// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import matter from "gray-matter"
import { MetaData, metaDataSchema } from "../types/Blog"

type StringDict = Record<string, string>

const extractMetadataFromMarkdown = (
    markdown: string
): [MetaData, StringDict] => {
    const { data } = matter(markdown)
    const { excerpt } = matter(markdown, {
        excerpt: (file) =>
            (file.excerpt = file.content
                .split("\n")
                .filter((i: string) => !!i.trim().length)
                .slice(0, 4)
                .join(" ")),
    })

    const metadataObject: MetaData = metaDataSchema.parse({ ...data, excerpt })

    return [metadataObject, data]
}

export default extractMetadataFromMarkdown
