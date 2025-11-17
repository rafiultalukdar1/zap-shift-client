import { createBrowserRouter } from "react-router";
import Root from "../components/Layouts/Root";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'be-a-rider',
                element: <h2>Be a Rider</h2>
            },
            {
                path: 'pricing',
                element: <h2>Pricing</h2>
            },
            {
                path: 'about-us',
                element: <h2>About Us</h2>
            },
            {
                path: 'services',
                element: <h2>Services</h2>
            }
        ]
    }
]);