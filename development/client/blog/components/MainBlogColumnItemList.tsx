import React, { FunctionComponent } from "react";
import "../styles/MainBlogColumnItemList.scss";
import MainBlogColumnItemListItem from "./MainBlogColumnItemListItem";

interface MainBlogColumnItemListProps {
    titleList: string[];
    countList: number[];
}

const MainBlogColumnItemList: FunctionComponent<MainBlogColumnItemListProps> = ({ titleList, countList }) => {
    return(
        <ul className="mainBlog_column__item__list">
            {
                titleList.map((title, index) => (
                    <MainBlogColumnItemListItem key={index} title={title} count={countList[index]}/>
                ))
            }
        </ul>
    )
}

export default MainBlogColumnItemList;