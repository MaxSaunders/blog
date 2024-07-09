import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { z } from "zod"
import dayjs from "dayjs"
import { MetaData, metaDataSchema } from "../types/Blog"

const URL_SORT_KEY = "sort"
const URL_SORT_DIRECTION_KEY = "sortDir"
const URL_TAG_FILTER_KEY = "tags"

const sortDirectionKeySchema = z.enum(["asc", "desc"])
type SortDirection = z.infer<typeof sortDirectionKeySchema>

const sortKeySchema = metaDataSchema
    .omit({ tags: true, excerpt: true, url: true })
    .keyof()
export type SortKey = z.infer<typeof sortKeySchema>

function isSortDir(string: unknown): string is SortDirection {
    return typeof string === "string" && string in sortDirectionKeySchema.Values
}

const ensureSortDir = (key?: string | null): SortDirection =>
    key && isSortDir(key) ? key : "desc"

function isSortKey(string: unknown): string is SortKey {
    return typeof string === "string" && string in sortKeySchema.Values
}

const ensureSortKey = (key?: string | null): SortKey =>
    key && isSortKey(key) ? key : "date"

const useSortBlogs = (blogs: Record<string, MetaData>) => {
    const [searchParams, setSearchParams] = useSearchParams()

    // ========= Filter functions =========
    const tagOptions: Set<string> = new Set(
        Object.values(blogs).flatMap((i) => i.tags)
    )
    const tagFilter = searchParams.getAll(URL_TAG_FILTER_KEY)
    const toggleTagsFilter = (newTag: string) => {
        if (tagFilter.includes(newTag)) {
            searchParams.delete(URL_TAG_FILTER_KEY, newTag)
        } else {
            searchParams.append(URL_TAG_FILTER_KEY, newTag)
        }
        setSearchParams(searchParams)
    }
    const clearTagsFilter = () => {
        searchParams.delete(URL_TAG_FILTER_KEY)
        setSearchParams(searchParams)
    }

    // ========= Sort functions =========
    const sortOptions: SortKey[] = sortKeySchema
        .array()
        .parse(Object.keys(sortKeySchema.Values))
    const sortDirections: SortDirection[] = sortDirectionKeySchema
        .array()
        .parse(Object.keys(sortDirectionKeySchema.Values))

    const sort: SortKey = ensureSortKey(searchParams.get(URL_SORT_KEY))
    const sortDirection: SortDirection = ensureSortDir(
        searchParams.get(URL_SORT_DIRECTION_KEY)
    )

    const setSort = (newSort: SortKey) => {
        if (sort !== newSort) {
            searchParams.delete(URL_SORT_KEY)
            searchParams.set(URL_SORT_KEY, newSort)
            searchParams.delete(URL_SORT_DIRECTION_KEY)
            searchParams.set(URL_SORT_DIRECTION_KEY, "desc")
        } else {
            searchParams.delete(URL_SORT_DIRECTION_KEY)
            searchParams.set(
                URL_SORT_DIRECTION_KEY,
                sortDirection === "asc" ? "desc" : "asc"
            )
        }
        setSearchParams(searchParams)
    }

    const toggleSortDirection = () => {
        searchParams.delete(URL_SORT_DIRECTION_KEY)
        searchParams.set(
            URL_SORT_DIRECTION_KEY,
            sortDirection === "asc" ? "desc" : "asc"
        )
        setSearchParams(searchParams)
    }

    const sortedBlogs = useMemo(() => {
        const directionMultiplier = sortDirection === "asc" ? 1 : -1
        return Object.entries(blogs)
            .filter(([, blog]) => {
                if (tagFilter.length < 1) return true
                return blog.tags.some((t) => tagFilter.includes(t))
            })
            .toSorted((a, b) => {
                if (["date"].includes(sort)) {
                    return (
                        (dayjs(a[1][sort]).isBefore(b[1][sort]) ? -1 : 1) *
                        directionMultiplier
                    )
                }
                if (["title"].includes(sort)) {
                    return (
                        (a[1][sort]
                            ?.toString()
                            .localeCompare(b[1][sort]?.toString() ?? "") ?? 1) *
                        directionMultiplier
                    )
                }

                return (
                    (a[1][sort]
                        ?.toString()
                        .localeCompare(b[1][sort]?.toString() ?? "") ?? 1) *
                    directionMultiplier
                )
            })
    }, [blogs, sort, sortDirection, tagFilter])

    return {
        sortedBlogs,
        sortOptions,
        sortDirections,
        sort,
        sortDirection,
        tagOptions,
        tagFilter,
        setSort,
        toggleSortDirection,
        toggleTagsFilter,
        clearTagsFilter,
        // setSortDirection
    }
}

export default useSortBlogs
