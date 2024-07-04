import matter from "gray-matter"

const extractContentFromMarkdown = (markdown: string): string => {
    const { content } = matter(markdown)

    return content
}

export default extractContentFromMarkdown
