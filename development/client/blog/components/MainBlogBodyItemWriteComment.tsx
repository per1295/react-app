import React, { useEffect, useRef } from "react";
import "../styles/MainBlogBodyItemWriteComment.scss";
import MainBlogBodyItemWriteCommentCommentInput from "./MainBlogBodyItemWriteCommentCommentInput";
import IonIcon from "@reacticons/ionicons";
import { useCommentVisible, useNowUser, useBlogData, useIdOfBlog, useFetch } from "../../customHooks";
import { Response } from "../../../server/constructors";
import { getBaseURL } from "../../functions";

export default function MainBlogBodyItemWriteComment() {
    const { isCommentVisible } = useCommentVisible();
    const writeCommentRef = useRef<HTMLDivElement>(null);
    const nowUser = useNowUser();
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { comments, countComments } = blogData;

    const writeCommentURL = `${getBaseURL()}/blog/blogs?idOfBlog=${id}&typeUpdate=comments`
    const fetch = useFetch<Response>(writeCommentURL, "json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comments, countComments })
    });

    async function putComments() {
        const response = await fetch();
        if ( response ) console.log(response.message);
    }

    useEffect(() => {
        putComments();
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
        if ( !nowUser ) return;
        const writeComment = writeCommentRef.current as HTMLDivElement;
        const inputComment = writeComment.children[0] as HTMLInputElement;
        const comment = inputComment.value;
        const { email } = nowUser;
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