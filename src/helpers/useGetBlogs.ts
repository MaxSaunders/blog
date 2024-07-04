import { useCallback, useEffect, useState } from "react"
import { MetaData } from "../types/Blog"
import extractMetadataFromMarkdown from "./extractMetaData"
import extractContentFromMarkdown from "./extractContent"

const convertToText = (res: Response) => res.text()

const formatFileKey = (fileName: string) => fileName.split("?")[0]

const useGetBlogs = (blogFiles: string[]) => {
    const [blogsMetaData, setBlogsMetaData] = useState<Record<string, MetaData>>({})
    const [blogContent, setBlogContent] = useState<Record<string, string>>({})

    const getMetaDataAndContent = useCallback((text: string): [MetaData, string] => {
        const [metaData] = extractMetadataFromMarkdown(text)
        const content = extractContentFromMarkdown(text)
        return [metaData, content]
    }, [])

    const addMetaData = useCallback((result: MetaData, dataKey?: string) => {
        const key = dataKey ?? result.title
        setBlogsMetaData((i) => ({
            ...i,
            [key]: result,
        }))
    }, [])

    const addContent = useCallback((result: string, dataKey: string) => {
        setBlogContent((i) => ({
            ...i,
            [dataKey]: result,
        }))
    }, [])

    useEffect(() => {
        blogFiles.forEach((b) =>
            fetch(b)
                .then(convertToText)
                .then(getMetaDataAndContent)
                .then(([metaData, content]) => {
                    addMetaData(metaData, formatFileKey(b))
                    addContent(content, formatFileKey(b))
                })
        )
    }, [blogFiles, addMetaData, getMetaDataAndContent, addContent])

    return {
        blogsMetaData,
        blogContent,
        setBlogsMetaData,
        setBlogContent,
    }
}

export default useGetBlogs
