import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import Home from "./home";
import AboutUs from "./about us";
import Services from "./services";
import Contact from "./contact";
import Blog from "./blog";
import "@fontsource/montserrat";
import "@fontsource/open-sans";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { pathname } = location;
        if ( pathname === "/" ) navigate("/home");

        if ( pathname !== "/" ) {
            let titleArray = pathname.replace(/^\//, "").split("");
            titleArray[0] = titleArray[0].toUpperCase();
            document.title = decodeURIComponent(titleArray.join(""));
        }
    }, [ location ]);

    const paths = [ "home", "about us", "services", "contact us", "blog" ];
    const components = [ <Home/>, <AboutUs/>, <Services/>, <Contact/>, <Blog/> ];

    return(
        <Routes>
            {
                components.map((item, index) => (
                    <Route key={index} path={encodeURIComponent(paths[index])} element={item}/>
                ))
            }
        </Routes>
    )
}

export default function UpperApp() {
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}