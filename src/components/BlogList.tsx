import { useMemo, useState } from "react"
import dayjs from "dayjs"
import { Blog } from "../types/Blog"

type BlogListProps = {
    title: string
    blogs: Blog[]
}

type BlogKey = keyof Blog
type SortKey = Exclude<BlogKey, "content" | "tags">

const BlogList = ({ title, blogs }: BlogListProps) => {
    const [sort] = useState<SortKey>("date")

    const sortedBlogs = useMemo(
        () =>
            blogs.toSorted((a: Blog, b: Blog) => {
                if (["date"].includes(sort)) {
                    return dayjs(a[sort]).isBefore(b[sort]) ? 1 : -1
                }
                if (["title"].includes(sort)) {
                    return a[sort].toString().localeCompare(b[sort].toString())
                }

                return a[sort].toString().localeCompare(b[sort].toString())
            }),
        [blogs, sort]
    )

    return (
        <>
            <div>{title}</div>
            <div>
                {sortedBlogs.map((blog) => (
                    <div key={blog.title}>{blog.title}</div>
                ))}
            </div>
        </>
    )
}

export default BlogList
