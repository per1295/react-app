import React from "react";
import "../styles/MainBlogBodyItemUnder.scss";
import MainBlogBodyItemUnderDate from "./MainBlogBodyItemUnderDate";
import MainBlogBodyItemUnderComments from "./MainBlogBodyItemUnderComments";
import MainBlogBodyItemUnderLikes from "./MainBlogBodyItemUnderLikes";

export default function MainBlogBodyItemUnder() {
    return(
        <div className="mainBlog_body__item___under">
            <MainBlogBodyItemUnderDate/>
            <MainBlogBodyItemUnderComments/>
            <MainBlogBodyItemUnderLikes/>
        </div>
    )
}