import blogs from "../content/quotes"
import BlogPage from "../components/BlogPage"
import "./QuotesBlog.css"

const QuotesBlog = () => {
    return (
        <div className="quotes-blog">
            <BlogPage title="Quotes Blog" blogs={blogs} showExcerpts />
        </div>
    )
}

export default QuotesBlog
