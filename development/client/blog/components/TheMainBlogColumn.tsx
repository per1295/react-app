import React from "react";
import "../styles/TheMainBlogColumn.scss";
import TheMainBlogColumnSearch from "./TheMainBlogColumnSearch";
import MainBlogColumnItem from "./MainBlogColumnItem";
import TheMainBlogColumnItemPosts from "./TheMainBlogColumnItemPosts";
import MainBlogColumnItemList from "./MainBlogColumnItemList";
import TheMainBlogColumnItemTags from "./TheMainBlogColumnItemTags";

export default function TheMainBlogColumn() {
	const titleList = [ "Business", "Photography", "Journal", "Web devlopment" ];
	const countList = [ 15, 17, 22, 30 ];

	return (
		<div className="mainBlog_column">
			<TheMainBlogColumnSearch/>
			<MainBlogColumnItem title="posts">
				<TheMainBlogColumnItemPosts/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title="categories">
				<MainBlogColumnItemList titleList={titleList} countList={countList}/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title="tags">
				<TheMainBlogColumnItemTags/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title="archives">
				<MainBlogColumnItemList titleList={titleList} countList={countList}/>
			</MainBlogColumnItem>
		</div>	
	)
}