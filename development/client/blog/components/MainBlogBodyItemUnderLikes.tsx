import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useBlogData, useIdOfBlog, useTypedSelector } from "../../customHooks";
import { useNavigate, useFetcher } from "react-router-dom";
import type { Defered, IEmailData } from "../../../types";
import type { IContactData } from "../../../types/contact";

import IonIcon from "@reacticons/ionicons";

import "../styles/MainBlogBodyItemUnderLikes.scss";

export default function MainBlogBodyItemUnderLikes() {
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { countLikes, usersWhoLiked } = blogData;
    const userData = useTypedSelector<"userData">(state => state.userData);
    const likeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const fetcher = useFetcher<Defered>();

    useEffect(() => {
        const like = likeRef.current as HTMLDivElement;
        const likeIcon = like.children[0] as HTMLElement;

        if ( !likeIcon ) return;
        if ( !userData ) return;

        const { email } = userData;

        const isNowUserLiked = usersWhoLiked.some(user => user.email === email);

        if ( isNowUserLiked ) likeIcon.classList.add("mainBlog_body__item___under____likes_____likeActive");
        else likeIcon.classList.remove("mainBlog_body__item___under____likes_____likeActive");
    }, [ usersWhoLiked ]);

    const setLike: MouseEventHandler<HTMLDivElement> = () => {
        if ( !userData ) return navigate("/contact us");

        const { id: userId, email } = userData as IContactData;
        const { id: blogId } = blogData;
        
        const isUserLiked = usersWhoLiked.find(user => user.email === email);
        let updatedUsersWhoLiked: IEmailData[];
        let updatedCountLikes: number;

        if ( isUserLiked ) {
            updatedUsersWhoLiked = usersWhoLiked.filter(user => user.email !== email);
            updatedCountLikes = countLikes - 1;
        } else {
            const newUserWhoLiked = { id: userId, email };
            updatedUsersWhoLiked = [ ...usersWhoLiked, newUserWhoLiked ];
            updatedCountLikes = countLikes + 1;
        }

        setBlogData(blog => ({
            ...blog,
            usersWhoLiked: updatedUsersWhoLiked,
            countLikes: updatedCountLikes
        }));

        const formData = new FormData();

        formData.set("countLikes", `${updatedCountLikes}`);
        formData.set("usersWhoLiked", JSON.stringify(updatedUsersWhoLiked));

        fetcher.submit(formData, {
            method: "patch",
            action: `api/blog/blogs?id=${blogId}&typeUpdate=likes`
        });
    }

    return(
        <div ref={likeRef} className="mainBlog_body__item___under____likes" onClick={setLike}>
            <IonIcon
            name="heart"
            className={
                `mainBlog_body__item___under____likes_____like mainBlog_body__item___under____likes_____like${id}`
            }/>
            <span className="mainBlog_body__item___under____likes_____countLikes">
                { countLikes }
            </span>
        </div>
    )
}