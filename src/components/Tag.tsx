import { CSSProperties } from "react"
import "./Tag.css"

type TagProps = {
    tag: string
    style?: CSSProperties
}

const Tag = ({ tag, style }: TagProps) => (
    <span key={tag} className="tag-item" style={style}>
        {tag}
    </span>
)

export default Tag
