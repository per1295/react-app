import React, { useEffect, useRef } from "react";
import MainBlogBodyItemWriteCommentCommentInput from "./MainBlogBodyItemWriteCommentCommentInput";
import { useCommentVisible, useBlogData, useIdOfBlog, useFetch } from "../../customHooks";
import { useTypedSelector } from "../../customHooks";

import IonIcon from "@reacticons/ionicons";

import "../styles/MainBlogBodyItemWriteComment.scss";

export default function MainBlogBodyItemWriteComment() {
    const { isCommentVisible } = useCommentVisible();
    const writeCommentRef = useRef<HTMLDivElement>(null);
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { comments, countComments } = blogData;
    const userData = useTypedSelector<"userData">(state => state.userData);

    const fetch = useFetch<string>(`/blog/blogs?id=${id}&typeUpdate=comments`, "text", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comments, countComments })
    });

    const patchComments = async () => await fetch();

    useEffect(() => {
        patchComments();
    }, [ comments, countComments ]);

    const writeCommentDisappear = ( event: TransitionEvent ) => {
        const writeComment = event.currentTarget as HTMLDivElement;
        writeComment.classList.remove("mainBlog_body__item___writeCommentVisible");
    } 

    useEffect(() => {
        const writeComment = writeCommentRef.current as HTMLDivElement;

        if ( isCommentVisible ) {
            writeComment.removeEventListener("transitionend", writeCommentDisappear);
            writeComment.classList.add("mainBlog_body__item___writeCommentVisible");
            setTimeout(() => writeComment.classList.add("mainBlog_body__item___writeCommentActive"));
        } else {
            writeComment.addEventListener("transitionend", writeCommentDisappear);
            writeComment.classList.remove("mainBlog_body__item___writeCommentActive");
        }

        return () => {
            writeComment.removeEventListener("transitionend", writeCommentDisappear);
        }
    }, [ isCommentVisible ]);

    const ckickIcon = async () => {
        if ( !userData ) return;

        const writeComment = writeCommentRef.current as HTMLDivElement;
        const inputComment = writeComment.children[0] as HTMLInputElement;
        const comment = inputComment.value;

        const { email } = userData;
        const newComment = { email, comment };

        setBlogData({
            ...blogData,
            countComments: countComments + 1,
            comments: [ newComment, ...comments ]
        });

        inputComment.value = "";
    }

    return(
        <div ref={writeCommentRef} className="mainBlog_body__item___writeComment">
            <MainBlogBodyItemWriteCommentCommentInput/>
            <IonIcon
            name="arrow-forward-circle-outline"
            className="mainBlog_body__item___writeComment____submit"
            onClick={ckickIcon}/>
        </div>
    )
}