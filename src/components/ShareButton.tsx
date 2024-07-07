import { useCallback, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdIosShare } from "react-icons/md"
import useClipboard from "../helpers/useClipboard"
import Modal from "./Modal"
import "./ShareButton.css"
import { FaLink, FaRegCopy } from "react-icons/fa6"

type ShareModalProps = {
    close: () => void
}

const ShareModal = ({ close }: ShareModalProps) => {
    const { copyToClipboard } = useClipboard()
    const url = window.location.href

    const copyUrl = useCallback(() => {
        copyToClipboard(url)
    }, [copyToClipboard, url])

    return (
        <Modal>
            <div className="share-button-modal">
                <div className="header">
                    <h2>Share Now</h2>
                    <button className="icon-button" onClick={close}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <div className="copy-message">Share using this link</div>
                <div className="copy-link-row">
                    <FaLink className="input-icon" />
                    <input className="text-field copy-link input-w-icon" readOnly value={url} />
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
