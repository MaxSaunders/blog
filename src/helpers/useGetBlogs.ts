import { Dispatch, useCallback, useEffect, useState } from "react"
import { MetaData } from "../types/Blog"
import extractMetadataFromMarkdown from "./extractMetaData"
import extractContentFromMarkdown from "./extractContent"

const convertToText = (res: Response) => res.text()

const formatUrl = (fileName: string) => fileName.split("?")[0]

const formatFileKey = (fileName: string) => {
    const filePath = fileName.split("?")[0].split("/")
    return filePath[filePath.length - 1]
}

type useGetBlogsReturn = {
    blogsMetaData: Record<string, MetaData>
    blogContent: Record<string, string>
    setBlogsMetaData: Dispatch<Record<string, MetaData>>
    setBlogContent: Dispatch<Record<string, string>>
}

const useGetBlogs = (blogFiles: string[]): useGetBlogsReturn => {
    const [blogsMetaData, setBlogsMetaData] = useState<
        Record<string, MetaData>
    >({})
    const [blogContent, setBlogContent] = useState<Record<string, string>>({})

    const getMetaDataAndContent = useCallback(
        (text: string): [MetaData, string] => {
            const [metaData] = extractMetadataFromMarkdown(text)
            const content = extractContentFromMarkdown(text)
            return [metaData, content]
        },
        []
    )

    const addMetaData = useCallback(
        (result: MetaData, dataKey: string, url: string) => {
            const key = dataKey
            setBlogsMetaData((i) => ({
                ...i,
                [key]: { ...result, url },
            }))
        },
        []
    )

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
                    addMetaData(metaData, formatFileKey(b), formatUrl(b))
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
