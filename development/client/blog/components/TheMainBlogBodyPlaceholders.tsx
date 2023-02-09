import React from "react";

import Placeholder from "../../globalComponents/PlaceHolder";

import "../styles/TheMainBlogBodyPlaceholders.scss";

export default function TheMainBlogBodyPlaceholders() {
    return(
        <div className="mainBlog_body__placeholders">
            {
                Array.from({ length: 3 }).map((_i, index) => <Placeholder key={index} />)
            }
        </div>
    )
}