import React, { useRef, FormEventHandler, EventHandler, MouseEvent } from "react";
import IonIcon from "@reacticons/ionicons";
import "../styles/TheMainBlogColumnSearch.scss";
import { useDatalist, useFetch, useInputValidation } from "../../customHooks";

export default function TheMainBlogColumnSearch() {
	const inputRef = useRef<HTMLInputElement>(null);
	const datalist = useDatalist("search-input");

	const { value, error } = useInputValidation(inputRef);

	const fetch = useFetch<Response>("/blog/searchInput", "json", {
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
		event.stopPropagation();
		await fetch();
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		if ( error && !value ) return;
		await fetch();
	};

	return (
		<form method="post" className="mainBlog_column__search" onClick={clickForm} onSubmit={submitForm}>
			<input
			ref={inputRef}
			list="search-input"
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