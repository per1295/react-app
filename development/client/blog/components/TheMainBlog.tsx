import React, { createContext } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import { useTransformedResponse } from "../../customHooks";
import type { Defered } from "../../../types";
import type { BlogLoaderReturn } from "../../../types/blog";

import TheMainBlogColumn from "./TheMainBlogColumn";
import TheMainBlogBody from "./TheMainBlogBody";

import "../styles/TheMainBlog.scss";

export const blogLoaderDataContext = createContext<BlogLoaderReturn | null>(null);

export default function TheMainBlog() {
	const { response } = useRouteLoaderData("blog") as Defered;
	const { data: blogLoaderData } = useTransformedResponse<BlogLoaderReturn>(response);
	
	return (
		<main className="mainBlog">
			<blogLoaderDataContext.Provider value={blogLoaderData}>
				<TheMainBlogBody />
				<TheMainBlogColumn />
			</blogLoaderDataContext.Provider>
		</main>	
	)
}