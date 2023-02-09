import React, { lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom";
import { createAction, createLoader } from "./functions";

import Layout from "../client/globalComponents/Layout";

const Home = lazy(() => import("../client/home/index"));
const AboutUs = lazy(() => import("../client/about us/index"));
const Services = lazy(() => import("../client/services/index"));
const Contact = lazy(() => import("../client/contact/index"));
const Blog = lazy(() => import("../client/blog/index"));
const ErrorElement = lazy(() => import("./globalComponents/ErrorElement"));

import "./index.scss";

const getUser = createLoader({ pathname: "get user" });
const baseAction = createAction();
const baseLoader = createLoader();
const notDeferedLoader = createLoader({ isDefered: false });

export default function createApp() {
    const paths = [
        "email",
        "contact us/user",
        "blog/blogs",
        "blog/searchInput"
    ];

    const routes = createRoutesFromElements(
        <Route id="root" path="/" element={<Layout />} errorElement={<ErrorElement />} loader={getUser}>
            <Route id="home" path="home" element={<Home />} />
            <Route id="about us" path="about us" element={<AboutUs />} />
            <Route id="services" path="services" element={<Services />} />
            <Route id="contact us" path="contact us" element={<Contact />} />
            <Route id="blog" path="blog" element={<Blog />} loader={baseLoader} />
            <Route index element={<Navigate to="home" replace />} />
            
            <Route path="api">
                {paths.map((path, index) => (
                    <Route
                        key={index}
                        path={path}
                        action={baseAction}
                        loader={notDeferedLoader}
                    />
                ))}
            </Route>
        </Route>
    );

    const router = createBrowserRouter(routes);
    
    return function App() {
        return(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        )
    }
}