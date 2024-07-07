import { CALENDAR_DATE_FORMAT_DASHES } from "../helpers/constants"
import { MetaData } from "../types/Blog"
import devIcon from "../assets/dev-icon.jpg"
import blogIcon from "../assets/blog-icon.png"
import mediaIcon from "../assets/media-icon.png"
import awsIcon from "../assets/aws-icon.png"
import avatar from "../assets/avatar.svg"
import animeIcon from "../assets/crunchyroll.png"
import Tag from "./Tag"
import "./PostListEntry.css"

type stringDict = {
    [key: string]: string
}

const icons: stringDict = {
    default: blogIcon,
    dev: devIcon,
    media: mediaIcon,
    anime: animeIcon,
    personal: avatar,
    aws: awsIcon,
    lesson: blogIcon,
    development: awsIcon,
    /*
     TODO:
     add anime, personal, aws, react, development, software, work
    */
}

type PostListEntryProps = {
    metaData: MetaData
    onClick: () => void
    showExcerpt?: boolean
}

const PostListEntry = ({
    metaData,
    onClick,
    showExcerpt,
}: PostListEntryProps) => {
    const getIcon = () => {
        const matchingTag = metaData.tags
            .map((i) => i.toLowerCase())
            .find((i) => i in icons)

        return [
            icons[matchingTag ?? "default"],
            matchingTag ?? "Default Blog Icon",
        ]
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
                    <div>{showExcerpt && metaData.excerpt}</div>
                </div>
            </div>
            <div>
                <h3>
                    {!!metaData.author.length && `Author: ${metaData.author}`}
                </h3>
                <h3>
                    {metaData.date?.format(CALENDAR_DATE_FORMAT_DASHES) ?? ""}{" "}
                </h3>
            </div>
        </div>
    )
}

export default PostListEntry
