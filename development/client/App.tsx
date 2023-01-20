import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Layout from "./globalComponents/Layout";
import Home from "./home";
import AboutUs from "./about us";
import Services from "./services";
import Contact from "./contact";
import Blog from "./blog";

import "./index.scss";

const App = () => {
    const paths = [ "home", "about us", "services", "contact us", "blog" ];
    const components = [ <Home />, <AboutUs />, <Services />, <Contact />, <Blog /> ];

    return(
        <Provider store={store}>
            <Layout>
                <Routes>
                    {
                        components.map((item, index) => (
                            <Route key={index} path={`/${paths[index]}`} element={item}/>
                        ))
                    }
                </Routes>
            </Layout>
        </Provider>
    )
}

export default App;