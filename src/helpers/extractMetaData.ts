import matter from "gray-matter"
import { MetaData, metaDataSchema } from "../types/Blog"

type StringDict = Record<string, string>

const extractMetadataFromMarkdown = (markdown: string): [MetaData, StringDict] => {
    const { data } = matter(markdown)

    const metadataObject: MetaData = metaDataSchema.parse(data)

    return [metadataObject, data]
}

export default extractMetadataFromMarkdown
