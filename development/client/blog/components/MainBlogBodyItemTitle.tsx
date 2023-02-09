import React from "react";
import { useBlogData, useIdOfBlog } from "../../customHooks";

import "../styles/MainBlogBodyItemTitle.scss";

export default function MainBlogBodyItemTitle() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { title } = blogData;

    return(
        <span className="mainBlog_body__item___title">
            { title }
        </span>
    )
}