import { useCallback, useEffect, useState } from "react"
import extractMetadataFromMarkdown from "../helpers/extractMetaData"
import useBlogUrlParams from "../helpers/useBlogUrlParams"
import { MetaData } from "../types/Blog"
import BlogReader from "./BlogReader"
import PostListEntry from "./PostListEntry"

const convertToText = (res: Response) => res.text()

type BlogPageProps = {
    title: string
    blogs: string[]
}

const formatFileKey = (fileName: string) => fileName.split("?")[0]

const BlogPage = ({ title, blogs }: BlogPageProps) => {
    const [blogsData, setBlogsData] = useState<Record<string, MetaData>>({})
    const { selectedBlogTitle, setBlogByKey } = useBlogUrlParams()

    const selectedBlogData = blogsData[selectedBlogTitle]

    const getMetaData = useCallback((text: string): MetaData => {
        const [metaData] = extractMetadataFromMarkdown(text)
        return metaData
    }, [])

    const addMetaData = useCallback((result: MetaData, dataKey?: string) => {
        const key = dataKey ?? result.title
        setBlogsData((i) => ({
            ...i,
            [key]: result,
        }))
    }, [])

    useEffect(() => {
        blogs.forEach((b) =>
            fetch(b)
                .then(convertToText)
                .then(getMetaData)
                .then((metaData) => addMetaData(metaData, formatFileKey(b)))
        )
    }, [blogs, addMetaData, getMetaData])

    if (selectedBlogData) {
        return <BlogReader blog={selectedBlogData} blogKey={selectedBlogTitle} />
    }

    return (
        <>
            <div>
                <h1 style={{ fontSize: "2.5rem" }}>{title}</h1>
            </div>
            <div>
                {Object.entries(blogsData).map(([blogKey, blog]) => (
                    <PostListEntry
                        key={blogKey}
                        metaData={blog}
                        onClick={() => setBlogByKey(blogKey)}
                    />
                ))}
            </div>
        </>
    )
}

export default BlogPage
