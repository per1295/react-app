import React from "react";
import "../styles/TheMainBlog.scss";
import TheMainBlogColumn from "./TheMainBlogColumn";
import TheMainBlogBody from "./TheMainBlogBody";

export default function TheMainBlog() {
	return (
		<main className="mainBlog">
			<TheMainBlogBody/>
			<TheMainBlogColumn/>
		</main>	
	)
}