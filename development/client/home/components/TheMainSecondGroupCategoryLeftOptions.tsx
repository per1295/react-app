import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch, useTypedSelector } from "../../customHooks";
import { setOption } from "../../store/slices/categoryOption";
import "../styles/TheMainSecondGroupCategoryLeftOptions.scss";

const TheMainSecondGroupCategoryLeftOptions = () => {
    const categoryOption = useTypedSelector((state) => state.categoryOption) as string;
    const dispatch = useDispatch();
    const ulElement = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ul = ulElement.current as HTMLUListElement;
        const childrenLi = ul.children as HTMLCollectionOf<HTMLLIElement>;

        Array.from(childrenLi).forEach(item => {
            const option = item.dataset.option as string;
            if ( option !== categoryOption ) item.classList.remove("main_secondGroup__category___left____options_____optionActive"); 
        });
    }, [ categoryOption ]);

    const options = [ "All", "webdesign", "graphic design", "fashion", "logo design", "advertising" ];

    const onClickOption: MouseEventHandler<HTMLLIElement> = (event) => {
        const liElement = event.currentTarget;
        const option = liElement.dataset.option;
        if ( option ) {
            dispatch( setOption(option) );
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