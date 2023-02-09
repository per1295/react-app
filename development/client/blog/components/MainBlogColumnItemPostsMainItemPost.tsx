import React, { FunctionComponent } from "react";
import type { IColumnPost } from "../../../types/blog";

import Img from "../../globalComponents/Img";

import "../styles/MainBlogColumnItemPostsMainItemPost.scss";

interface MainBlogColumnItemPostsMainItemPostProps {
    postData: IColumnPost;
}

const MainBlogColumnItemPostsMainItemPost: FunctionComponent<MainBlogColumnItemPostsMainItemPostProps> = ({ postData }) => {
    const { title, dateOfCreation, img } = postData;

    return(
        <div className="item_post">
            <Img src={img} alt="columnPost_img" className="item_post__img"/>
            <div className="item_post__data">
                <span className="item_post__data___title">
                    { title }
                </span>
                <span className="item_post__data___dateCreation">
                    { dateOfCreation }
                </span>
            </div>
        </div>
    )
}

export default MainBlogColumnItemPostsMainItemPost;