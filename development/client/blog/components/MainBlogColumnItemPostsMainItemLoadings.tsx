import React from "react";

import InfLoading from "../../globalComponents/InfLoading";

import "../styles/MainBlogColumnItemPostsMainItemLoadings.scss";

export default function MainBlogColumnItemPostsMainItemLoadings() {
    return(
        <div className="mainBlog_column__item___posts____main_____item______loading">
            {
                Array.from({ length: 3 }).map((_i, index) => <InfLoading key={index} />)
            }
        </div>
    )
}