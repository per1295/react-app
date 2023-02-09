import React from "react";

import TheMainSecondGroupCategoryRightItem from "./TheMainSecondGroupCategoryRightItem";

import "../styles/TheMainSecondGroupCategoryRight.scss";

import category_item__1 from "../images/category_item__1.png";
import category_item__2 from "../images/category_item__2.png";
import category_item__3 from "../images/category_item__3.png";
import category_item__4 from "../images/category_item__4.png";
import category_item__5 from "../images/category_item__5.png";
import category_item__6 from "../images/category_item__6.png";
import category_item__7 from "../images/category_item__7.png";
import category_item__8 from "../images/category_item__8.png";
import category_item__9 from "../images/category_item__9.png";

const TheMainSecondGroupCategoryRight = () => {
    const categoryItems = [
        category_item__1,
        category_item__2,
        category_item__3,
        category_item__4,
        category_item__5,
        category_item__6,
        category_item__7,
        category_item__8,
        category_item__9
    ];

    const categoryItemsRange = [
        [ "all", "graphic design", "webdesign", "fashion", "logo design" ],
        [ "all", "graphic design", "fashion", "advertising" ],
        [ "all", "webdesign", "graphic design", "fashion", "logo design", "advertising" ],
        [ "all", "graphic design", "logo design", "advertising" ],
        [ "all", "webdesign", "fashion", "advertising" ],
        [ "all", "webdesign", "graphic design", "logo design" ],
        [ "all", "webdesign", "graphic design", "fashion", "logo design", "advertising" ],
        [ "all", "fashion", "logo design", "advertising" ],
        [ "all", "graphic design", "fashion", "logo design" ]
    ];

    return(
        <div className="main_secondGroup__category___right">
            { categoryItems.map(( item, index ) => (
                <TheMainSecondGroupCategoryRightItem
                showForCategories={categoryItemsRange[index]}
                key={index}
                src={item}
                alt={`category_item__${index}`}
                className="category_item"/>
            )) }
        </div>
    )
}

export default TheMainSecondGroupCategoryRight;