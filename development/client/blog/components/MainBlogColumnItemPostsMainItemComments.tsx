import React, { forwardRef } from "react";
import "../styles/MainBlogColumnItemPostsMainItemComments.scss";

const MainBlogColumnItemPostsMainItemComments = forwardRef<HTMLDivElement>((_props, ref) => (
    <div ref={ref} className="mainBlog_column__item___posts____main_____item______comments">
        No comments...
    </div>
));

export default MainBlogColumnItemPostsMainItemComments;