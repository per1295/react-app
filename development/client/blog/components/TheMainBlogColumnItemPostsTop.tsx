import React, { FunctionComponent, MouseEventHandler } from "react";
import { CategoryType, SetCategoryType } from "./TheMainBlogColumnItemPosts";
import "../styles/TheMainBlogColumnItemPostsTop.scss";

interface TheMainBlogColumnItemPostsTopProps {
    category: CategoryType;
    setCategory: SetCategoryType;
}

const TheMainBlogColumnItemPostsTop: FunctionComponent<TheMainBlogColumnItemPostsTopProps> = ({ category, setCategory }) => {
    const postsCategory = [ "latest", "popular", "comments" ];

    const clickCategory: MouseEventHandler<HTMLSpanElement> = (event) => {
        const { category } = event.currentTarget.dataset as Pick<TheMainBlogColumnItemPostsTopProps, "category">;
        setCategory(category);
    };

    return(
        <div className="mainBlog_column__item___posts____top">
            {
                postsCategory.map((item, index) => (
                    <span
                    key={index}
                    data-category={item}
                    className={
                        category === item
                        ?
                        "mainBlog_column__item___posts____top_____category mainBlog_column__item___posts____top_____categoryActive"
                        :
                        "mainBlog_column__item___posts____top_____category"
                    }
                    onClick={clickCategory}>
                        { item }
                    </span>
                ))
            }
        </div>
    )
}

export default TheMainBlogColumnItemPostsTop;