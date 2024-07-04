import { CALENDAR_DATE_FORMAT_DASHES } from "../helpers/constants"
import { MetaData } from "../types/Blog"
import devIcon from "../assets/dev-icon.jpg"
import blogIcon from "../assets/blog-icon.png"
import mediaIcon from "../assets/media-icon.png"
import "./PostListEntry.css"
import Tag from "./Tag"

type stringDict = {
    [key: string]: string
}

const icons: stringDict = {
    dev: devIcon,
    media: mediaIcon,
    other: blogIcon,
}

type PostListEntryProps = {
    metaData: MetaData
    onClick: () => void
}

const PostListEntry = ({ metaData, onClick }: PostListEntryProps) => {
    const getIcon = () => {
        const matchingTag = metaData.tags.find((i) => i.toLowerCase() in icons)

        return [icons[matchingTag ?? "other"], matchingTag ?? "Default Blog Icon"]
    }

    const [icon, alt] = getIcon()

    return (
        <div key={metaData.title} onClick={onClick} className="post-list-entry">
            <div className="post-info-col">
                <img alt={alt} className="blog-icon" src={icon} />
                <div className="post-info">
                    <h3>{metaData.title}</h3>
                    <div className="list-tags">
                        {metaData.tags.map((tag) => (
                            <Tag key={tag} tag={tag} />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h3>{!!metaData.author.length && `Author: ${metaData.author}`}</h3>
                <h3>{metaData.date?.format(CALENDAR_DATE_FORMAT_DASHES) ?? ""} </h3>
            </div>
        </div>
    )
}

export default PostListEntry
