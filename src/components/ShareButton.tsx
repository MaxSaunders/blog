import { useCallback, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdIosShare } from "react-icons/md"
import { IoLogoDiscord, IoLogoFacebook } from "react-icons/io5"
import { RiMailSendFill } from "react-icons/ri"
import { BsReddit } from "react-icons/bs"
import { FaLink, FaRegCopy, FaXTwitter } from "react-icons/fa6"
import useClipboard from "../helpers/useClipboard"
import Modal from "./Modal"
import "./ShareButton.css"

type ShareModalProps = {
    close: () => void
}

const ShareModal = ({ close }: ShareModalProps) => {
    const { copyToClipboard } = useClipboard()
    const url = window.location.href.split("#")[0]

    const copyUrl = useCallback(() => {
        copyToClipboard(url)
    }, [copyToClipboard, url])

    return (
        <Modal>
            <div className="share-button-modal">
                <div className="header">
                    <h2>Share Now</h2>
                    <button className="icon-button-inverse" onClick={close}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <div className="share-icon-row">
                    <span className="icon-wrapper icon-discord">
                        <IoLogoDiscord />
                    </span>
                    <span className="icon-wrapper icon-facebook">
                        <IoLogoFacebook />
                    </span>
                    <span className="icon-wrapper icon-email">
                        <RiMailSendFill />
                    </span>
                    <span className="icon-wrapper icon-twitter">
                        <FaXTwitter />
                    </span>
                    <span className="icon-wrapper icon-reddit">
                        <BsReddit />
                    </span>
                </div>
                <div className="copy-message">Or share using this link</div>
                <div className="copy-link-row">
                    <FaLink className="input-icon" />
                    <input
                        className="text-field copy-link input-w-icon"
                        readOnly
                        value={url}
                    />
                    <button className="button input-button" onClick={copyUrl}>
                        <span className="input-button-content">Copy</span>
                        <FaRegCopy className="input-button-content" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}

const ShareButton = () => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <>
            <button
                className="icon-button"
                title="Share This Blog"
                onClick={() => setShowModal(true)}
            >
                <MdIosShare size={24} />
            </button>
            {showModal && <ShareModal close={() => setShowModal(false)} />}
        </>
    )
}

export default ShareButton
