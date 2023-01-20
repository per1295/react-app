import React, { useState, useEffect, useRef } from "react";
import TheMainBlog from "./components/TheMainBlog";
import TheMainThirdGroup from "../globalComponents/TheMainThirdGroup";
import { useTypedSelector } from "../customHooks";
import TheMobileChanger from "./components/TheMobileChanger";

export default function Blog() {
	const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
	const mobileScrollRef = useRef<number>(0);
	const [ isShowChanger, setIsShowChanger ] = useState(true);

	const mobileScrolling = () => {
		const y = Math.floor(scrollY);
		if ( y > mobileScrollRef.current ) {
			setIsShowChanger(false);
		}
		else {
			setIsShowChanger(true)
		};
		mobileScrollRef.current = y;
	}

	useEffect(() => {
		if ( isMobile ) document.addEventListener("scroll", mobileScrolling);

		return () => {
			document.removeEventListener("scroll", mobileScrolling);
		}
	}, [ isMobile ]);

	return (
		<>
			<TheMainBlog/>
			<TheMainThirdGroup/>
			{ isMobile ? <TheMobileChanger isShow={isShowChanger}/> : null }
		</>
	)
}