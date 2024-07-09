import { IoMdClose } from "react-icons/io"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import ReactSelect from "react-select"
import useBlogUrlParams from "../helpers/useBlogUrlParams"
import useGetBlogs from "../helpers/useGetBlogs"
import useSortBlogs, { SortKey } from "../helpers/useSortBlogs"
import PostListEntry from "./PostListEntry"
import BlogReader from "./BlogReader"
import "./BlogPage.css"

type BlogPageProps = {
    title: string
    blogs: string[]
    showExcerpts?: boolean
}

const BlogPage = ({ title, blogs, showExcerpts }: BlogPageProps) => {
    const { blogsMetaData } = useGetBlogs(blogs)
    const { selectedBlogTitle, setBlogByKey } = useBlogUrlParams()

    const selectedBlogData = blogsMetaData[selectedBlogTitle]
    const {
        sort,
        sortedBlogs,
        sortDirection,
        sortOptions,
        tagOptions,
        tagFilter,
        setSort,
        toggleSortDirection,
        toggleTagsFilter,
        clearTagsFilter,
    } = useSortBlogs(blogsMetaData)

    if (selectedBlogData) {
        return <BlogReader blog={selectedBlogData} />
    }

    return (
        <div className="blog-page">
            <div>
                <h1 className="title">{title}</h1>
            </div>
            <div className="blog-page-controls">
                <div className="filter-row">
                    <div className="tag-filter">
                        <h3 className="tag-filter-header">Filter by Tags</h3>
                        {Array.from(tagOptions)
                            .sort((a, b) => a.localeCompare(b))
                            .map((tagOption) => (
                                <span key={tagOption}>
                                    <span
                                        onClick={() =>
                                            toggleTagsFilter(tagOption)
                                        }
                                        key={tagOption}
                                        className={`selectable-tag ${
                                            tagFilter.includes(tagOption) &&
                                            "active-tag"
                                        }`}
                                    >
                                        {tagOption}
                                    </span>
                                </span>
                            ))}
                    </div>
                    {tagFilter.length > 0 && (
                        <span
                            onClick={clearTagsFilter}
                            className="selectable-tag clear-filter-button"
                        >
                            <IoMdClose />
                            Clear Filter
                        </span>
                    )}
                </div>
                <div className="sort-dropdown">
                    <h3>Sort</h3>
                    <ReactSelect
                        value={{ value: sort, label: sort.toUpperCase() }}
                        onChange={(e) => setSort(e?.value as SortKey)}
                        className="select-field"
                        options={sortOptions.map((i) => ({
                            value: i,
                            label: i.toUpperCase(),
                        }))}
                    />
                    <button
                        onClick={toggleSortDirection}
                        className="button input-button"
                    >
                        {sortDirection === "desc" ? (
                            <FaArrowDown size={18} />
                        ) : (
                            <FaArrowUp size={18} />
                        )}
                    </button>
                </div>
            </div>
            <div>
                {sortedBlogs.map(([blogKey, blog]) => (
                    <PostListEntry
                        key={blogKey}
                        metaData={blog}
                        onClick={() => setBlogByKey(blogKey)}
                        showExcerpt={showExcerpts}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogPage
