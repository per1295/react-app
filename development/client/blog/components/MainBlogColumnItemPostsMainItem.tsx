import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useMemo,
    useContext,
    UIEventHandler,
    useState
} from "react";
import { blogLoaderDataContext } from "./TheMainBlog";

import MainBlogColumnItemPostsMainItemPost from "./MainBlogColumnItemPostsMainItemPost";
import MainBlogColumnItemPostsMainItemComments from "./MainBlogColumnItemPostsMainItemComments";
import type { CategoryType } from "./TheMainBlogColumnItemPosts";
import type { IColumnPost } from "../../../types/blog";

import MainBlogColumnItemPostsMainItemLoadings from "./MainBlogColumnItemPostsMainItemLoadings";

import "../styles/MainBlogColumnItemPostsMainItem.scss";

export interface MainBlogColumnItemPostsMainItemProps {
    category: CategoryType;
    ownCategory: CategoryType;
}

const MainBlogColumnItemPostsMainItem: FunctionComponent<MainBlogColumnItemPostsMainItemProps> =
({ category, ownCategory }) =>
{
    const blogLoaderData = useContext(blogLoaderDataContext);
    const [ columnPosts, setColumnPosts ] = useState<IColumnPost[] | null>(null);
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

    useEffect(() => {
        if ( blogLoaderData ) {
            const { columnPosts } = blogLoaderData;
            if ( columnPosts && typeof columnPosts !== "string" && ownCategory !== "comments" ) {
                setColumnPosts(columnPosts.concat(columnPosts));
            }
        }
    }, [ blogLoaderData ]);

    const scrollColumnPosts: UIEventHandler<HTMLDivElement> = (event) => {
        const elemOfPosts = event.currentTarget as HTMLDivElement;
        const { scrollTop, clientHeight, scrollHeight } = elemOfPosts;
        const restToScroll = Math.floor(scrollHeight - clientHeight - scrollTop);
        if ( restToScroll < 20 ) {
            setColumnPosts(posts => {
                return posts ? posts.concat(posts) : posts
            });
        }
    }

    const posts = useMemo(() => (
        <div ref={postsItemRef} className="mainBlog_column__item___posts____main_____item" onScroll={scrollColumnPosts}>
            {
                columnPosts
                ?
                columnPosts.map((postData, index) => (
                    <MainBlogColumnItemPostsMainItemPost key={`${postData.id}-${index}`} postData={postData} />
                ))
                :
                <MainBlogColumnItemPostsMainItemLoadings />
            }
        </div>
    ), [ columnPosts ]);

    return ownCategory === "comments" ? <MainBlogColumnItemPostsMainItemComments ref={postsItemRef} /> : posts;
}

export default MainBlogColumnItemPostsMainItem;