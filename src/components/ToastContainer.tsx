import { ToastContainer as ToastifyContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastContainer = () => (
    <ToastifyContainer position="bottom-left" closeOnClick pauseOnHover theme="dark" />
)

export default ToastContainer
