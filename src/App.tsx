import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DevBlog from "./pages/DevBlog"
import MediaBlog from "./pages/MediaBlog"
import ErrorPage from "./pages/ErrorPage"
import Navigation from "./components/Navigation"

const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dev",
        element: <DevBlog />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/media",
        element: <MediaBlog />,
        errorElement: <ErrorPage />,
    },
]

const App = () => (
    <BrowserRouter>
        <div style={{ height: "100vh", width: "100vw", overflowY: "auto" }}>
            <Navigation />
            <div style={{ paddingInline: "2rem", paddingTop: "1rem" }}>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </div>
        </div>
    </BrowserRouter>
)

export default App
