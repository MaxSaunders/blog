/* eslint-disable react-refresh/only-export-components */
import { HiOutlineLink } from "react-icons/hi"
import { ExtraProps } from "react-markdown"
import { useCopyLinkAndScroll } from "../helpers/utils"
import "./CustomMarkdown.css"

type CustomHTML<T> = React.ClassAttributes<T> &
    React.HTMLAttributes<T> &
    ExtraProps

type CustomListProps = CustomHTML<HTMLLIElement>
type CustomH2Props = CustomHTML<HTMLHeadingElement>

export const QuotesCustomComponents = {
    li: (props: CustomListProps) => (
        <div className="quote-speaker">{`- ${props.children}`}</div>
    ),
}

const CustomH2 = ({ props }: { props: CustomH2Props }) => {
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
    h2: (props: CustomH2Props) => <CustomH2 props={props} />,
}

export default CustomComponents
