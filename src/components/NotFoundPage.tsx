import { TbMoodSadDizzy } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div style={{ height: "90vh", alignContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TbMoodSadDizzy size={300} />
            </div>
            <div
                style={{
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "25px",
                }}
            >
                <h1>404</h1>
                <div>The page you are looking for does not exist.</div>
                <div>
                    <span
                        style={{
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Go back,
                    </span>
                    <span>{` or navigate to the `}</span>
                    <span
                        style={{ fontWeight: 700, cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Home Page
                    </span>
                    <span>{` to choose a new direction`}</span>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
