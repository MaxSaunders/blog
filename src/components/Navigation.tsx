import { Link, useLocation } from "react-router-dom"
import "./Navigation.css"

const pages = [
    { label: "Home", route: "/" },
    { label: "Dev Blog", route: "/dev" },
    { label: "Media Blog", route: "/media" },
]

// TODO: maybe add props for the react router
const Navigation = () => {
    const { pathname } = useLocation()
    return (
        <div className="navbar">
            {pages.map((page) => (
                <Link
                    to={page.route}
                    key={page.label}
                    className={`nav-link ${pathname === page.route && "nav-link-active"}`}
                >
                    {page.label}
                </Link>
            ))}
        </div>
    )
}

export default Navigation
