import React from "react";
import { useBlogData, useIdOfBlog } from "../../customHooks";
import "../styles/MainBlogBodyItemUnderDate.scss";

export default function MainBlogBodyItemUnderDate() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { dateCreation } = blogData;

    return(
        <div className="mainBlog_body__item___under____date">
            { dateCreation }
        </div>
    )
}