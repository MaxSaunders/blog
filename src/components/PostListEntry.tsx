import { CSSProperties } from "react"
import { CALENDAR_DATE_FORMAT_DASHES } from "../helpers/constants"
import { MetaData } from "../types/Blog"
import devIcon from "../assets/dev-icon.jpg"
import blogIcon from "../assets/blog-icon.png"
import mediaIcon from "../assets/media-icon.png"
import awsIcon from "../assets/aws-icon.png"
import avatar from "../assets/avatar.svg"
import animeIcon from "../assets/crunchyroll.png"
import movieIcon from "../assets/popcorn.jpg"
import Tag from "./Tag"
import "./PostListEntry.css"

type iconInfo = {
    url: string
    style?: CSSProperties
}

const defaultIcon: iconInfo = {
    url: blogIcon,
    style: {
        padding: ".5rem",
    },
}

const icons: Record<string, iconInfo> = {
    default: defaultIcon,
    lesson: defaultIcon,
    dev: { url: devIcon },
    media: { url: mediaIcon },
    movie: { url: movieIcon },
    anime: { url: animeIcon },
    personal: {
        url: avatar,
        style: {
            background: "#2196f3",
        },
    },
    aws: { url: awsIcon },
    development: { url: awsIcon },
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
    const getIcon = (): [string, string, CSSProperties] => {
        const matchingTag = metaData.tags
            .map((i) => i.toLowerCase())
            .find((i) => i in icons)

        const { url, style } = icons[matchingTag ?? "default"]
        return [url, matchingTag ?? "Default Blog Icon", style ?? {}]
    }

    const [icon, alt, iconStyle] = getIcon()

    return (
        <div key={metaData.title} onClick={onClick} className="post-list-entry">
            <div className="post-info-col">
                <img
                    alt={alt}
                    className="blog-icon"
                    src={icon}
                    style={iconStyle}
                />
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
