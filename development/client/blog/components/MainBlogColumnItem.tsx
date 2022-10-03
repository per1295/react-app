import React, { FunctionComponent } from "react";
import "../styles/MainBlogColumnItem.scss";

interface MainBlogColumnItemProps {
	title: string;
	children: JSX.Element;
}

const MainBlogColumnItem: FunctionComponent<MainBlogColumnItemProps> = ({ title, children }) => {
	return (
		<div className="mainBlog_column__item">
			<span className="mainBlog_column__item___title">
				{ title }
			</span>
			{ children }
		</div>	
	)
}

export default MainBlogColumnItem;