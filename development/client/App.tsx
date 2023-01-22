import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {
    RouterProvider,
    createBrowserRouter,
    createMemoryRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom";

import Layout from "../client/globalComponents/Layout";
import Home from "../client/home";
import AboutUs from "../client/about us";
import Services from "../client/services";
import Contact from "../client/contact";
import Blog from "../client/blog";
import ErrorElement from "./globalComponents/ErrorElement";

import "./index.scss";

export default function createApp() {
    const routes = createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorElement />}>
            <Route path="home" element={<Home />} />
            <Route path="about us" element={<AboutUs />} />
            <Route path="services" element={<Services />} />
            <Route path="contact us" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route index element={<Navigate to="home" replace />} />
        </Route>
    );
    
    const router = typeof window !== "undefined"
    ?
    createBrowserRouter(routes)
    :
    createMemoryRouter(routes, {
        initialEntries: [ process.env.__START_PATH__ as string ]
    });
    
    const App = () => {
        return(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        )
    }

    return App;
}