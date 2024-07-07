import { PropsWithChildren } from "react"
import "./Modal.css"

const Modal = ({ children }: PropsWithChildren) => (
    <>
        <div className="modal-backdrop" />
        <div className="modal-content">{children}</div>
    </>
)

export default Modal
