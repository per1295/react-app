import React, { useState, useEffect, useMemo, createContext, Dispatch, SetStateAction, useRef } from "react";
import "../styles/TheMainBlogBody.scss";
import MainBlogBodyItem from "./MainBlogBodyItem";
import { useFetch } from "../../customHooks";
import { getBaseURL } from "../../functions";
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

interface IRangeBlogs {
    startId: number;
    endId: number;
}

const rangeBlogsInit = { startId: 0, endId: 2 };

export default function TheMainBlogBody() {
    const [ rangeBlogs, setRangeBlogs ] = useState<IRangeBlogs>(rangeBlogsInit);
    const [ isAllBlogsState, setIsAllBlogsState ] = useState(false);
    const calmDown = useRef(0);
    const isAllBlogs = useRef<boolean>(false);
    const baseURL = getBaseURL(), path = encodeURI(`/blog/blogs?startId=${rangeBlogs.startId}&endId=${rangeBlogs.endId}`);
    const fetch = useFetch<Response>(`${baseURL}${path}`, "json");
    const [ blogs, setBlogs ] = useState<IBlog[]>([]);
    const blogsContextValue = { blogs, setBlogs };

    async function getBlogs() {
        const response = await fetch();
        if ( response ) {
            try {
                let newBlogs = JSON.parse(response.message) as IBlog[];
                setBlogs(state => {
                    if ( state.length !== 0 ) {
                        newBlogs = newBlogs.filter((blog, index) => blog.idOfBlog !== state[index].idOfBlog);
                    }
                    return [ ...state, ...newBlogs ];
                });
            } catch (error) {
                isAllBlogs.current = true;
                setIsAllBlogsState(true);
            }
        }
    }

    useEffect(() => {
        getBlogs();
    }, [ rangeBlogs ]);

    const scrollingBlogs = () => {
        if ( isAllBlogs.current ) return;

        const nowTime = performance.now();
        if ( nowTime - calmDown.current < 2000 && calmDown.current !== 0) return;

        if ( document.documentElement.scrollHeight - scrollY > 1200 ) return;
        calmDown.current = Math.floor(nowTime);
        setRangeBlogs(state => {
            const { startId, endId } = state;
            return {
                startId: startId + 3,
                endId: endId + 3
            }
        });
    }

    useEffect(() => {
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
                        <MainBlogBodyItem key={index} id={blog.idOfBlog}/>
                    ))
                }
                { isAllBlogsState ? <TheMainBlogBodyAllBlogs/> : null }
            </div>
        </BlogsContext.Provider>
    ), [ blogs, isAllBlogsState ]);

    return blogsElement;
}