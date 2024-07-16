import blogs from "../content/quotes"
import BlogPage from "../components/BlogPage"
import { QuotesCustomComponents } from "../components/CustomMarkdown"
import "./QuotesBlog.css"

const QuotesBlog = () => {
    return (
        <div className="quotes-blog">
            <BlogPage
                title="Quotes Blog"
                blogs={blogs}
                showExcerpts
                customComponents={QuotesCustomComponents}
            />
        </div>
    )
}

export default QuotesBlog
