import React, { FunctionComponent, useEffect, useRef } from "react";
import "../styles/MainBlogBodyItemCommentsComment.scss";

interface MainBlogBodyItemCommentsCommentProps {
    email: string;
    comment: string;
    timeoutMs: number;
}

const MainBlogBodyItemCommentsComment: FunctionComponent<MainBlogBodyItemCommentsCommentProps> = ({
    email, comment, timeoutMs
}) =>
{
    const commentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const comment = commentRef.current as HTMLDivElement;
        const timeout = setTimeout(() => {
            comment.classList.add("mainBlog_body__item___comments____commentActive");
        }, timeoutMs);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return(
        <div ref={commentRef} className="mainBlog_body__item___comments____comment">
            <span className="mainBlog_body__item___comments____comment_____email">
                Email: { email }
            </span>
            <span className="mainBlog_body__item___comments____comment_____comment">
                Comment: { comment }
            </span>
        </div>
    )
}

export default MainBlogBodyItemCommentsComment;