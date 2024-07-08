import { useCallback } from "react"
import { toast } from "react-toastify"
import { strings } from "./constants"

const useClipboard = () => {
    const copyToClipboard = useCallback((copyText: string) => {
        if (copyText) {
            navigator.clipboard.writeText(copyText)
            toast(strings.toast.clipboard, { type: "success" })
        }
    }, [])

    return {
        copyToClipboard,
    }
}

export default useClipboard
