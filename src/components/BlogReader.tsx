import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { IoMdClose } from "react-icons/io"
import Markdown from "react-markdown"
import useBlogUrlParams from "../helpers/useBlogUrlParams"
import { MetaData } from "../types/Blog"
import extractContentFromMarkdown from "../helpers/extractContent"
import extractMetadataFromMarkdown from "../helpers/extractMetaData"
import { CALENDAR_DATE_FORMAT } from "../helpers/constants"
import { scrollToTop } from "../helpers/utils"
import CustomComponents from "./CustomMarkdown"
import ShareButton from "./ShareButton"
import Tag from "./Tag"
import "./BlogReader.css"

const getContentAndMetaData = (markDown: string): [string, MetaData] => [
    extractContentFromMarkdown(markDown),
    extractMetadataFromMarkdown(markDown)[0],
]

type BlogReaderProps = {
    blog: MetaData
}

const BlogReader = ({ blog }: BlogReaderProps) => {
    const blogKey = blog.url
    if (!blogKey) {
        throw new Error("Blog not found")
    }

    const [blogContent, setBlogContent] = useState<string>("")
    const [metaData, setMetaData] = useState<MetaData>()
    const { clearBlog } = useBlogUrlParams()
    const { hash: anchorId } = useLocation()

    useEffect(() => {
        setTimeout(() => {
            scrollToTop(anchorId.slice(1))
        }, 100)
    }, [anchorId])

    useEffect(() => {
        fetch(blogKey)
            .then((i) => i.text())
            .then(getContentAndMetaData)
            .then(([content, metaData]) => {
                setBlogContent(content)
                setMetaData(metaData)
            })
    }, [blogKey])

    return (
        <div className="blog-reader">
            <div className="blog-reader-controls">
                <ShareButton />
                <button
                    className="icon-button"
                    title="Close Blog"
                    onClick={clearBlog}
                >
                    <IoMdClose size={24} />
                </button>
            </div>
            <div className="header">
                <h1>{blog.title}</h1>
                {blog.author && <h3>Author: {blog.author}</h3>}
            </div>
            <div className="sub-header">
                <div className="tag-row">
                    {metaData?.tags.map((tag) => (
                        <Tag
                            key={tag}
                            tag={tag}
                            style={{ fontSize: 16, padding: "5px 10px" }}
                        />
                    ))}
                </div>
                <span className="date">
                    {metaData?.date?.format(CALENDAR_DATE_FORMAT)}
                </span>
            </div>
            <Markdown components={CustomComponents}>{blogContent}</Markdown>
        </div>
    )
}

export default BlogReader
