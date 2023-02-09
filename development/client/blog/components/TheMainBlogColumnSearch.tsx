import React, { useRef, FormEventHandler, EventHandler, MouseEvent } from "react";
import { useDatalist, useFormValidation } from "../../customHooks";
import { useFetcher } from "react-router-dom";

import IonIcon from "@reacticons/ionicons";

import "../styles/TheMainBlogColumnSearch.scss";

export default function TheMainBlogColumnSearch() {
	const datalist = useDatalist("search-input");
	const fetcher = useFetcher();
	const formRef = useRef<HTMLFormElement>(null);
	const { formElements } = useFormValidation(formRef);

	const clickForm: FormEventHandler<HTMLFormElement> = () => {
		const formElem = formRef.current;

		if ( formElem ) {
			const input = formElem.children[0] as HTMLInputElement;
			input.focus();
		}
	};

	const clickIcon: EventHandler<MouseEvent> = async (event) => {
		event.stopPropagation();
		submitSearch();
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		submitSearch();
	};

	function submitSearch() {
		const formElem = formRef.current;
		const isError = formElements.some(formElement => formElement.isError);

		if ( formElem && !isError ) {
			fetcher.submit(formElem, {
				method: "post",
				action: "/api/blog/searchInput"
			});

			const inputElem = formElem.children[0] as HTMLInputElement;
			inputElem.value = "";
		}
	}

	return (
		<fetcher.Form
			ref={formRef}
			className="mainBlog_column__search"
			onClick={clickForm}
			onSubmit={submitForm}
		>
			<input
			list="search-input"
			type="text"
			name="searchInput"
			id="searchInput"
			className="mainBlog_column__search___input"
			placeholder="search..."
			/>
			<IonIcon name="search-outline" className="mainBlog_column__search___icon" onClick={clickIcon} />
			{ datalist }
		</fetcher.Form>
	)
}