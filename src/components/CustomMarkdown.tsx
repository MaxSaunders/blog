import { HiOutlineLink } from "react-icons/hi"
import { ExtraProps } from "react-markdown"
import { useCopyLinkAndScroll } from "../helpers/utils"
import "./CustomMarkdown.css"

type CustomComponentProps = React.ClassAttributes<HTMLHeadingElement> &
    React.HTMLAttributes<HTMLHeadingElement> &
    ExtraProps

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
