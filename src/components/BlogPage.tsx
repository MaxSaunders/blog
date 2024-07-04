import useBlogUrlParams from "../helpers/useBlogUrlParams"
import useGetBlogs from "../helpers/useGetBlogs"
import BlogReader from "./BlogReader"
import PostListEntry from "./PostListEntry"
import "./BlogPage.css"

type BlogPageProps = {
    title: string
    blogs: string[]
}

const BlogPage = ({ title, blogs }: BlogPageProps) => {
    const { blogsMetaData } = useGetBlogs(blogs)
    const { selectedBlogTitle, setBlogByKey } = useBlogUrlParams()

    const selectedBlogData = blogsMetaData[selectedBlogTitle]

    if (selectedBlogData) {
        return <BlogReader blog={selectedBlogData} blogKey={selectedBlogTitle} />
    }

    return (
        <div className="blog-page">
            <div>
                <h1 className="title">{title}</h1>
            </div>
            <div>
                {Object.entries(blogsMetaData).map(([blogKey, blog]) => (
                    <PostListEntry
                        key={blogKey}
                        metaData={blog}
                        onClick={() => setBlogByKey(blogKey)}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogPage
