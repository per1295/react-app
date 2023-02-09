import React, {
    useState,
    useMemo,
    createContext,
    Dispatch,
    SetStateAction,
    useRef,
    useEffect,
    useContext
} from "react";
import { useFetcher } from "react-router-dom";
import { blogLoaderDataContext } from "./TheMainBlog";
import type { IBlog, BlogsResponse } from "../../../types/blog";

import MainBlogBodyItem from "./MainBlogBodyItem";
import TheMainBlogBodyAllBlogs from "../components/TheMainBlogBodyAllBlogs";
import TheMainBlogBodyPlaceholders from "./TheMainBlogBodyPlaceholders";
import TheMainBlogBodyWaiting from "./TheMainBlogBodyWaiting";

import "../styles/TheMainBlogBody.scss";

interface IBlogsContext {
    blogs: IBlog[];
    setBlogs: Dispatch<SetStateAction<IBlog[]>>;
}

const defaultValue = {
    blogs: [],
    setBlogs: () => []
} as IBlogsContext;

export const BlogsContext = createContext<IBlogsContext>(defaultValue);

export default function TheMainBlogBody() {
    const blogLoaderData = useContext(blogLoaderDataContext);
    const fetcher = useFetcher<BlogsResponse | string>();
    const [ blogs, setBlogs ] = useState<IBlog[] | null>(null);
    const [ isAllBlogsState, setIsAllBlogsState ] = useState(false);
    const isAllBlogs = useRef(false);
    const lastIDRef = useRef<string | null>(null);
    const blogsContextValue = { blogs: blogs ?? [], setBlogs } as IBlogsContext;

    useEffect(() => {
        if ( blogLoaderData ) {
            const { blogs } = blogLoaderData;
            const { content, lastID } = blogs;
            setBlogs(content);
            lastIDRef.current = lastID;
        }
    }, [ blogLoaderData ]);

    useEffect(() => {
        const { data } = fetcher;

        if ( data ) {
            if ( typeof data === "string") {
                setIsAllBlogsState(true);
                isAllBlogs.current = true;
            } else {
                const { content, lastID } = data;
                setBlogs(oldBlogs => {
                    return oldBlogs ? [ ...oldBlogs, ...content ] : content
                });
                lastIDRef.current = lastID;
            }
        }
    }, [ fetcher.data ]);

    useEffect(() => {
        document.addEventListener("scroll", scrollingBlogs);

        return () => document.removeEventListener("scroll", scrollingBlogs);
    }, []);

    const scrollingBlogs = async () => {
        if ( isAllBlogs.current ) return;
        if ( document.documentElement.scrollHeight - scrollY > 1200 || fetcher.state !== "idle" ) return;
        
        if ( lastIDRef.current ) {
            fetcher.load(`/api/blog/blogs?lastID=${lastIDRef.current}`);
        }
    }

    const blogsElement = useMemo(() => (
        <BlogsContext.Provider value={blogsContextValue}>
            <div className="mainBlog_body">
                {
                    blogs
                    ?
                    blogs.map(blog => (
                        <MainBlogBodyItem key={blog.id} id={blog.id}/>
                    ))
                    :
                    <TheMainBlogBodyPlaceholders />
                }
                { isAllBlogsState ? <TheMainBlogBodyAllBlogs /> : null }
                { fetcher.state !== "idle" ? <TheMainBlogBodyWaiting /> : null }
            </div>
        </BlogsContext.Provider>
    ), [ blogs, isAllBlogsState, fetcher.state ]);

    return blogsElement;
}