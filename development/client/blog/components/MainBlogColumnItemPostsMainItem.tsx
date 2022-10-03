import React, { FunctionComponent, useEffect, useRef, useMemo, useState, UIEventHandler } from "react";
import { CategoryType } from "./TheMainBlogColumnItemPosts";
import "../styles/MainBlogColumnItemPostsMainItem.scss";
import MainBlogColumnItemPostsMainItemPost from "./MainBlogColumnItemPostsMainItemPost";
import MainBlogColumnItemPostsMainItemComments from "./MainBlogColumnItemPostsMainItemComments";
import { useFetch } from "../../customHooks";
import { getBaseURL } from "../../functions";
import { Response } from "../../../server/constructors";

export interface MainBlogColumnItemPostsMainItemProps {
    category: CategoryType;
    ownCategory: CategoryType;
}

export interface PostData {
    _id: string;
    title: string;
    dateCreation: string;
    imgURL: string;
}

const MainBlogColumnItemPostsMainItem: FunctionComponent<MainBlogColumnItemPostsMainItemProps> = ({ category, ownCategory }) => {
    const baseURL = getBaseURL(), path = encodeURI("/blog/columnPosts");
    const columnPostsURL = `${baseURL}${path}`;

    const fetch = useFetch<Response>(columnPostsURL, "json");
    const [ columnPosts, setColumnPosts ] = useState<PostData[]>([]);
    const postsItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const postsItem = postsItemRef.current;
        if ( postsItem ) {
            switch (category) {
                case "latest":
                    postsItem.style.transform = "translatex(0)";
                    break;
                case "popular":
                    postsItem.style.transform = "translatex(-100%)";
                    break;
                case "comments":
                    postsItem.style.transform = "translatex(-200%)";
                    break;
            };
        }
    }, [ category ]);

    async function getColumnPosts() {
        if ( ownCategory !== "comments" && category === ownCategory ) {
            const response = await fetch();
            if ( response ) {
                const newColumnPosts = JSON.parse(response.message) as PostData[];
                setColumnPosts(newColumnPosts.concat(newColumnPosts));
            }
        }
    }

    useEffect(() => {
        if ( columnPosts.length === 0 ) getColumnPosts();
    }, [ category ]);

    const scrollColumnPosts: UIEventHandler<HTMLDivElement> = (event) => {
        const elemOfPosts = event.currentTarget as HTMLDivElement;
        const { scrollTop, clientHeight, scrollHeight } = elemOfPosts;
        const restToScroll = Math.floor(scrollHeight - clientHeight - scrollTop);
        if ( restToScroll < 20 ) setColumnPosts(state => state.concat(state));
    }

    const posts = useMemo(() => (
        <div ref={postsItemRef} className="mainBlog_column__item___posts____main_____item" onScroll={scrollColumnPosts}>
            {
                columnPosts.map((item, index) => (
                    <MainBlogColumnItemPostsMainItemPost
                    key={index}
                    postData={item}
                    />
                ))
            }
        </div>
    ), [ columnPosts ]);

    return ownCategory === "comments" ? <MainBlogColumnItemPostsMainItemComments ref={postsItemRef}/> : posts;
}

export default MainBlogColumnItemPostsMainItem;