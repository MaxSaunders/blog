import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HiOutlineLink } from "react-icons/hi"
import { ExtraProps } from "react-markdown"
import useClipboard from "../helpers/useClipboard"
import "./CustomMarkdown.css"

type CustomComponentProps = React.ClassAttributes<HTMLHeadingElement> &
    React.HTMLAttributes<HTMLHeadingElement> &
    ExtraProps

const scrollToTop = (elementId?: string) =>
    elementId &&
    document.getElementById(elementId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })

const useCopyLinkAndScroll = (elementId?: string) => {
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

type CustomProps = {
    props: CustomComponentProps
}

const CustomH2 = ({ props }: CustomProps) => {
    const { children, ...rest } = props
    const id = children
        ?.toString()
        .toLowerCase()
        .replaceAll(":", "")
        .replaceAll(" ", "_")

    const copyAndScroll = useCopyLinkAndScroll(id)
    return (
        <h2 {...rest}>
            <div
                id={id}
                onClick={copyAndScroll}
                className="cm-flex-center cm-gap-2 cm-scroll-margin cm-shareable"
            >
                <HiOutlineLink className="share-icon" />
                {children}
            </div>
        </h2>
    )
}

const CustomComponents = {
    h2: (props: CustomComponentProps) => <CustomH2 props={props} />,
}

export default CustomComponents
