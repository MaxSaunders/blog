import { Blog } from "../types/Blog"

type BlogListProps = {
    title: string
    blogs: Blog[]
}

const BlogList = ({ title, blogs }: BlogListProps) => {
    return (
        <>
            <div>{title}</div>
            <div>
                {blogs.map((blog) => (
                    <div key={blog.title}>{blog.title}</div>
                ))}
            </div>
        </>
    )
}

export default BlogList
