import React from "react";
import { useBlogData, useIdOfBlog } from "../../customHooks";
import "../styles/MainBlogBodyItemDescription.scss";

export default function MainBlogBodyItemDescription() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { description } = blogData;

    return(
        <span className="mainBlog_body__item___description">
            { description }
        </span>
    )
}