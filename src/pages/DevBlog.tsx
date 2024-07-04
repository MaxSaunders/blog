import blogs from "../content/dev"
import BlogPage from "../components/BlogPage"

const DevBlog = () => {
    return <BlogPage title="Dev Blog" blogs={blogs} />
}

export default DevBlog
