import React, { MouseEventHandler } from "react";
import { useBlogData, useIdOfBlog, useTypedSelector, useCommentVisible } from "../../customHooks";
import { useNavigate } from "react-router-dom";

import IonIcon from "@reacticons/ionicons";

import "../styles/MainBlogBodyItemUnderComments.scss";

export default function MainBlogBodyItemUnderComments() {
    const id = useIdOfBlog();
    const { blogData } = useBlogData(id);
    const { countComments } = blogData;
    const userData = useTypedSelector<"userData">(state => state.userData);
    const { isCommentVisible, setIsCommentVisible } = useCommentVisible();
    const navigate = useNavigate();

    const clickComment: MouseEventHandler<HTMLDivElement> = () => {
        if ( !userData ) return navigate("/contact us");

        setIsCommentVisible(!isCommentVisible);
    }

    return(
        <div className="mainBlog_body__item___under____comments" onClick={clickComment}>
            <IonIcon name="chatbox-ellipses" className="mainBlog_body__item___under____comments_____comment"/>
            <span className="mainBlog_body__item___under____comments_____countComments">
                { countComments }
            </span>
        </div>
    )
}