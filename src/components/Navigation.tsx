import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/m-logo.svg"
import "./Navigation.css"

const pages = [
    { label: "Home", route: "/" },
    { label: "Dev Blog", route: "/dev" },
    { label: "Media Blog", route: "/media" },
    { label: "Quotes", route: "/quotes" },
]

// TODO: maybe add props for the react router
const Navigation = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <div className="logo-box" onClick={() => navigate("/")}>
                <img alt="max-logo" className="nav-logo" src={logo} />
            </div>
            {pages.map((page) => (
                <Link
                    to={page.route}
                    key={page.label}
                    className={`nav-link ${
                        pathname === page.route && "nav-link-active"
                    }`}
                >
                    {page.label}
                </Link>
            ))}
        </div>
    )
}

export default Navigation
