import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useBlogData, useIdOfBlog, useNowUser, useFetch } from "../../customHooks";
import IonIcon from "@reacticons/ionicons";
import "../styles/MainBlogBodyItemUnderLikes.scss";
import { getBaseURL } from "../../functions";
import { Response } from "../../../server/constructors";

export default function MainBlogBodyItemUnderLikes() {
    const id = useIdOfBlog();
    const { blogData, setBlogData } = useBlogData(id);
    const { countLikes, usersWhoLiked } = blogData;
    const userData = useNowUser();
    const likeRef = useRef<HTMLDivElement>(null);

    const likeURL = `${getBaseURL()}/blog/blogs?idOfBlog=${id}&typeUpdate=likes`;
    const fetch = useFetch<Response>(likeURL, "json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ countLikes, usersWhoLiked })
    });

    async function putLikes() {
        const response = await fetch();
        if ( response ) console.log(response.message);
    }

    useEffect(() => {
        putLikes();
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
        if ( !userData ) return alert("Please register in contacts")
        const { id, email, isVerified } = userData;
        if ( !isVerified ) return alert("Please verify your email");
        
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
                email,
                isVerified
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