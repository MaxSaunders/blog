import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useClipboard from "./useClipboard"

export const scrollToTop = (elementId?: string) =>
    elementId &&
    document.getElementById(elementId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })

export const useCopyLinkAndScroll = (elementId?: string) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()

    const { copyToClipboard } = useClipboard()
    const url = window.location.href

    const copyUrl = useCallback(() => {
        copyToClipboard(url)
    }, [copyToClipboard, url])

    const copyLinkAndScroll = () => {
        scrollToTop(elementId)
        navigate({
            pathname: pathname,
            search: search,
            hash: elementId,
        })
        copyUrl()
    }

    return copyLinkAndScroll
}
