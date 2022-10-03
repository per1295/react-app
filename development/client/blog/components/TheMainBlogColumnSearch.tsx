import React, { useRef, FormEventHandler, EventHandler, MouseEvent } from "react";
import IonIcon from "@reacticons/ionicons";
import "../styles/TheMainBlogColumnSearch.scss";
import { useDatalist, useFetch, useInputValidation } from "../../customHooks";
import { getBaseURL } from "../../functions";

export default function TheMainBlogColumnSearch() {
	const inputRef = useRef<HTMLInputElement>(null);
	const datalist = useDatalist("searchInput");

	const baseURL = getBaseURL(), path = encodeURI("/blog/searchInput");
	const { value, error } = useInputValidation(inputRef);
	const fetch = useFetch<Response>(`${baseURL}${path}`, "json", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ value })
	});

	const clickForm: FormEventHandler<HTMLFormElement> = () => {
		const input = inputRef.current as HTMLInputElement;
		input.focus();
	};

	const clickIcon: EventHandler<MouseEvent> = async (event) => {
		const input = inputRef.current as HTMLInputElement;
		const form = input.parentElement as HTMLFormElement;
		event.stopPropagation();
		const response = await fetch();
		if ( response ) console.log(response);
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		if ( error ) return;
		const response = await fetch();
		if ( response ) console.log(response);
	};

	return (
		<form method="post" className="mainBlog_column__search" onClick={clickForm} onSubmit={submitForm}>
			<input
			ref={inputRef}
			list="searchInput"
			type="text"
			name="searchInput"
			id="searchInput"
			className="mainBlog_column__search___input"
			placeholder="search..."
			/>
			<IonIcon name="search-outline" className="mainBlog_column__search___icon" onClick={clickIcon} />
			{ datalist }
		</form>
	)
}