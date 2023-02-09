import React, { useState, Dispatch, SetStateAction } from "react";

import TheMainBlogColumnItemPostsTop from "./TheMainBlogColumnItemPostsTop";
import TheMainBlogColumnItemPostsLine from "./TheMainBlogColumnItemPostsLine";
import TheMainBlogColumnItemPostsMain from "./TheMainBlogColumnItemPostsMain";

export type CategoryType = "latest" | "popular" | "comments";
export type SetCategoryType = Dispatch<SetStateAction<CategoryType>>;

export default function TheMainBlogColumnItemPosts() {
    const [ category, setCategory ] = useState<CategoryType>("latest");

    return(
        <div className="mainBlog_column__item___posts">
            <TheMainBlogColumnItemPostsTop category={category} setCategory={setCategory}/>
            <TheMainBlogColumnItemPostsLine category={category}/>
            <TheMainBlogColumnItemPostsMain category={category}/>
        </div>
    )
}