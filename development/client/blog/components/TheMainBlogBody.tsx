import React, { useState, useEffect, useMemo, createContext, Dispatch, SetStateAction, useRef } from "react";
import "../styles/TheMainBlogBody.scss";
import MainBlogBodyItem from "./MainBlogBodyItem";
import { useFetch } from "../../customHooks";
import { IBlog } from "../../../server/types/blog";
import { Response } from "../../../server/constructors";
import TheMainBlogBodyAllBlogs from "../components/TheMainBlogBodyAllBlogs";

interface IBlogsContext {
    blogs: IBlog[];
    setBlogs: Dispatch<SetStateAction<IBlog[]>>;
}

const defaultValue = {
    blogs: [],
    setBlogs: (blogs: IBlog[]) => blogs
} as IBlogsContext;

export const BlogsContext = createContext<IBlogsContext>(defaultValue);

interface IBlogsResponse {
    blogs: IBlog[];
    lastId: number;
}

export default function TheMainBlogBody() {
    const [ isAllBlogsState, setIsAllBlogsState ] = useState(false);
    const [ blogs, setBlogs ] = useState<IBlog[]>([]);
    const blogsContextValue = { blogs, setBlogs };

    const calmDown = useRef(0);
    const isAllBlogs = useRef<boolean>(false);
    const fetchPath = useRef("/blog/blogs");

    const fetch = useFetch<Response>(fetchPath.current, "json");

    async function getBlogs(path?: string) {
        const response = await fetch(path);

        if ( response ) {
            if ( typeof response.message === "string" ) {
                isAllBlogs.current = true;
                setIsAllBlogsState(true);
                return;
            }

            try {
                let { blogs, lastId } = response.message as IBlogsResponse;

                setBlogs(state => {
                    if ( state.length !== 0 ) blogs = blogs.filter((blog, index) => blog.id !== state[index].id);
                    return [ ...state, ...blogs ];
                });
                
                fetchPath.current = `/blog/blogs?lastId=${lastId}`;
            } catch (error) {
                console.log(error);
            }
        }
    }

    const scrollingBlogs = async () => {
        if ( isAllBlogs.current ) return;

        const nowTime = performance.now();

        if ( nowTime - calmDown.current < 2000 && calmDown.current !== 0) return;
        if ( document.documentElement.scrollHeight - scrollY > 1200 ) return;

        calmDown.current = Math.floor(nowTime);
        await getBlogs(fetchPath.current);
    }

    useEffect(() => {
        if ( blogs.length === 0 ) getBlogs();

        document.addEventListener("scroll", scrollingBlogs);

        return () => {
            document.removeEventListener("scroll", scrollingBlogs);
        }
    }, []);

    const blogsElement = useMemo(() => (
        <BlogsContext.Provider value={blogsContextValue}>
            <div className="mainBlog_body">
                {
                    blogs.map((blog, index) => (
                        <MainBlogBodyItem key={index} id={blog.id}/>
                    ))
                }
                { isAllBlogsState ? <TheMainBlogBodyAllBlogs/> : null }
            </div>
        </BlogsContext.Provider>
    ), [ blogs, isAllBlogsState ]);

    return blogsElement;
}