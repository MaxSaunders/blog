import { useSearchParams } from "react-router-dom"
import { MetaData } from "../types/Blog"
import { useCallback } from "react"

const BLOG_TITLE_PARAM = "title"

const useBlogUrlParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedBlogTitle = searchParams.get(BLOG_TITLE_PARAM) ?? ""

    const setBlog = useCallback(
        (blog: MetaData) => {
            searchParams.delete(BLOG_TITLE_PARAM)
            searchParams.set(BLOG_TITLE_PARAM, blog.title)
            setSearchParams(searchParams)
        },
        [searchParams, setSearchParams]
    )

    const setBlogByKey = useCallback(
        (blog: string) => {
            searchParams.delete(BLOG_TITLE_PARAM)
            searchParams.set(BLOG_TITLE_PARAM, blog)
            setSearchParams(searchParams)
        },
        [searchParams, setSearchParams]
    )

    const clearBlog = useCallback(() => {
        searchParams.delete(BLOG_TITLE_PARAM)
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams])

    return {
        selectedBlogTitle,
        setBlog,
        setBlogByKey,
        clearBlog,
    }
}

export default useBlogUrlParams
