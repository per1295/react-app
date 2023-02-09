import React, { useEffect, useRef } from "react";
import { useCommentVisible, useBlogData, useIdOfBlog, useTypedSelector } from "../../customHooks";
import { useFetcher, useNavigate } from "react-router-dom";
import type { Defered } from "../../../types";
import type { IContactData } from "../../../types/contact";

import MainBlogBodyItemWriteCommentCommentInput from "./MainBlogBodyItemWriteCommentCommentInput";
import IonIcon from "@reacticons/ionicons";

import "../styles/MainBlogBodyItemWriteComment.scss";

export default function MainBlogBodyItemWriteComment() {
    const { isCommentVisible } = useCommentVisible();
    const writeCommentRef = useRef<HTMLDivElement>(null);
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { comments, countComments } = blogData;
    const userData = useTypedSelector<"userData">(state => state.userData);
    const fetcher = useFetcher<Defered>();
    const navigate = useNavigate();

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
        if ( !userData ) return navigate("/contact us");

        const writeComment = writeCommentRef.current as HTMLDivElement;
        const inputComment = writeComment.children[0] as HTMLInputElement;

        const comment = inputComment.value.trim();
        const { email } = userData as IContactData;

        const updatedComments = [ ...comments, { email, comment } ];
        const updatedCountComments = countComments + 1;

        inputComment.value = "";

        setBlogData(blog => ({
            ...blog,
            comments: updatedComments,
            countComments: updatedCountComments
        }));

        const formData = new FormData();

        formData.set("comments", JSON.stringify(updatedComments));
        formData.set("countComments", `${updatedCountComments}`);

        fetcher.submit(formData, {
            method: "patch",
            action: `/api/blog/blogs?id=${id}&typeUpdate=comments`
        });
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