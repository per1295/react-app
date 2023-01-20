import React, { MouseEventHandler, useEffect, useRef, useContext } from "react";
import { CategoryContext } from "./TheMainSecondGroupCaterory";

import "../styles/TheMainSecondGroupCategoryLeftOptions.scss";

const TheMainSecondGroupCategoryLeftOptions = () => {
    const { category, setCategory } = useContext(CategoryContext);
    const ulElement = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ul = ulElement.current as HTMLUListElement;
        const childrenLi = ul.children as HTMLCollectionOf<HTMLLIElement>;

        Array.from(childrenLi).forEach(item => {
            const option = item.dataset.option as string;
            if ( option !== category ) item.classList.remove("main_secondGroup__category___left____options_____optionActive"); 
        });
    }, [ category ]);

    const options = [ "All", "webdesign", "graphic design", "fashion", "logo design", "advertising" ];

    const onClickOption: MouseEventHandler<HTMLLIElement> = (event) => {
        const liElement = event.currentTarget;
        const option = liElement.dataset.option;
        if ( option ) {
            setCategory(option);
            liElement.classList.add("main_secondGroup__category___left____options_____optionActive");
        }
    }

    return(
        <ul ref={ulElement} className="main_secondGroup__category___left____options">
            { options.map(( item, index ) => (
                <li
                key={index}
                className={
                    index === 0
                    ?
                    "main_secondGroup__category___left____options_____option main_secondGroup__category___left____options_____optionActive"
                    :
                    "main_secondGroup__category___left____options_____option"
                }
                data-option={item.toLowerCase()}
                onClick={onClickOption}>
                    { item }
                </li>
            )) }
        </ul>
    )
}

export default TheMainSecondGroupCategoryLeftOptions;