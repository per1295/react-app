import React, { FunctionComponent } from "react";
import "../styles/MainBlogColumnItemPostsMainItemPost.scss";
import Img from "../../globalComponents/Img";
import { PostData } from "./MainBlogColumnItemPostsMainItem";

interface MainBlogColumnItemPostsMainItemPostProps {
    postData: PostData;
}

const MainBlogColumnItemPostsMainItemPost: FunctionComponent<MainBlogColumnItemPostsMainItemPostProps> = ({ postData }) => {
    const { title, dateCreation, imgURL } = postData;

    return(
        <div className="item_post">
            <Img src={imgURL} alt="columnPost_img" className="item_post__img"/>
            <div className="item_post__data">
                <span className="item_post__data___title">
                    { title }
                </span>
                <span className="item_post__data___dateCreation">
                    { dateCreation }
                </span>
            </div>
        </div>
    )
}

export default MainBlogColumnItemPostsMainItemPost;