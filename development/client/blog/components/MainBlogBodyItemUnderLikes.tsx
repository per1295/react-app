import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useBlogData, useIdOfBlog, useFetch } from "../../customHooks";
import { useTypedSelector } from "../../customHooks";
import { useNavigate } from "react-router-dom";

import IonIcon from "@reacticons/ionicons";

import "../styles/MainBlogBodyItemUnderLikes.scss";

export default function MainBlogBodyItemUnderLikes() {
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { countLikes, usersWhoLiked } = blogData;
    const userData = useTypedSelector<"userData">(state => state.userData);
    const likeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const fetch = useFetch<string>(`/blog/blogs?id=${id}&typeUpdate=likes`, "text", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ countLikes, usersWhoLiked })
    });

    const patchLikes = async () => await fetch();

    useEffect(() => {
        patchLikes();
    }, [ countLikes, usersWhoLiked ]);

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

        const { id, email } = userData;
        
        const isUserLiked = usersWhoLiked.find(user => user.email === email);

        if ( isUserLiked ) {
            const restUsersWhoLiked = usersWhoLiked.filter(user => user.email !== email);

            setBlogData({
                ...blogData,
                usersWhoLiked: restUsersWhoLiked,
                countLikes: countLikes - 1
            });
        } else {
            const newUser = {
                id,
                email
            };
            
            setBlogData({
                ...blogData,
                usersWhoLiked: [ ...usersWhoLiked, newUser ],
                countLikes: countLikes + 1
            });
        }
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