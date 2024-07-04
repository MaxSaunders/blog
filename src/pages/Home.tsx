import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import useGetBlogs from "../helpers/useGetBlogs"
import devBlogsFiles from "../content/dev"
import mediaBlogFiles from "../content/media"
import { MetaData } from "../types/Blog"
import Tag from "../components/Tag"
import "./Home.css"

type LatestBlogDisplayProps = {
    blogs: [string, MetaData][]
    urlBase: string
}

const LatestBlogDisplay = ({ blogs, urlBase }: LatestBlogDisplayProps) => (
    <div className="blog-display-row">
        {blogs.map(([file, blog]) => (
            <Link key={blog.title} className="blog-display" to={`${urlBase}?title=${file}`}>
                <div className="blog-display-content">
                    <h3 className="display-title">{blog.title}</h3>
                    <div className="tags-row">
                        {blog.tags.map((tag) => (
                            <Tag
                                key={tag}
                                tag={tag}
                                style={{ backgroundColor: "#efefef", color: "black" }}
                            />
                        ))}
                    </div>
                    <Markdown className="content-body">{blog.excerpt}</Markdown>
                </div>
                <div className="read-more">
                    <div className="read-more-content">
                        <h4>Read More</h4>
                        <FaArrowRight className="read-more-icon" />
                    </div>
                </div>
            </Link>
        ))}
    </div>
)

const getLatest = (blogs: Record<string, MetaData>, maxAmount = 3) => {
    return Object.entries(blogs)
        .sort((a, b) => (a[1].date?.isAfter(b[1].date) ? -1 : 1))
        .splice(0, maxAmount)
}

const Home = () => {
    const { blogsMetaData: devMetaData } = useGetBlogs(devBlogsFiles)
    const { blogsMetaData: mediaMetaData } = useGetBlogs(mediaBlogFiles)

    const devBlogsDisplay = getLatest(devMetaData)
    const mediaBlogsDisplay = getLatest(mediaMetaData)

    return (
        <div className="home-page">
            <div>
                <h1 className="title">Max's Blog</h1>
            </div>
            <div className="intro-message">
                <p>
                    Hello and welcome! If you're passionate about software development, intrigued by
                    the intricacies of media, and love diving deep into scenes that make movies and
                    TV shows memorable, you're in the right place. This blog is your destination for
                    insightful articles on software development lessons learned firsthand,
                    explorations of fascinating topics that pique my interest, and detailed
                    breakdowns of those cinematic moments that stay with us long after the credits
                    roll.
                </p>
                <p>
                    Join me on a journey where we not only unravel the complexities of coding but
                    also celebrate the magic of storytelling in our favorite media. Whether you're
                    here to sharpen your coding skills, discover hidden gems in entertainment, or
                    simply share in the joy of exploring what makes software and media so
                    captivating, I'm thrilled to have you along.
                </p>
                <p>
                    Let's embark on this adventure together and delve into the world where
                    technology meets creativity, where every line of code and every cinematic frame
                    has a story to tell.
                </p>
            </div>
            <div>
                <h2>Latest Blogs</h2>
                <div className="blog-section-header">
                    <h3 className="section-title">Dev Blogs</h3>
                    <div className="header-totals">
                        {`${Object.entries(devMetaData).length} Blogs`}
                    </div>
                </div>
                <hr />
                <LatestBlogDisplay blogs={devBlogsDisplay} urlBase="/dev" />
                <div className="blog-section-header">
                    <h3 className="section-title">Media Blogs</h3>
                    <div className="header-totals">
                        {`${Object.entries(mediaMetaData).length} Blogs`}
                    </div>
                </div>
                <hr />
                <LatestBlogDisplay blogs={mediaBlogsDisplay} urlBase="/media" />
            </div>
        </div>
    )
}

export default Home
