import React from "react";

import MainBlogColumnItemTagsTag from "./MainBlogColumnItemTagsTag";

import "../styles/TheMainBlogColumnItemTags.scss";

export default function TheMainBlogColumnItemTags() {
    const tags = [
        "Css",
        "Javascript",
        "Jquery",
        "Html5",
        "Bootstrap",
        "Gap",
        "Css",
        "Javascript",
        "Jquery"
    ];

    return(
        <div className="mainBlog_column__item___tags">
            {
                tags.map((item, index) => (
                    item === "Gap"
                    ?
                    <div key={index} className={`mainBlog_column__item___tags____tag${item}`}></div>
                    :
                    <MainBlogColumnItemTagsTag key={index}>
                        { item }
                    </MainBlogColumnItemTagsTag>
                ))
            }
        </div>
    )
}