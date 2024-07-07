import { BrowserRouter, Route, Routes } from "react-router-dom"
import ToastContainer from "./components/ToastContainer"
import Navigation from "./components/Navigation"
import ErrorPage from "./pages/ErrorPage"
import MediaBlog from "./pages/MediaBlog"
import DevBlog from "./pages/DevBlog"
import Home from "./pages/Home"

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
            <ToastContainer />
        </div>
    </BrowserRouter>
)

export default App
