import React from "react";

import ItemOfGroup from "../../globalComponents/ItemOfGroup";

import "../styles/TheMainFirstGroupBodyLeft.scss";
import "../styles/LeftItemOfGroupImg.scss";

import inf_icon from "../images/inf_icon.png";
import arrows_icon from "../images/arrows_icon.png";
import shop_icon from "../images/shop_icon.png";
import range_icon from "../images/range_icon.png";

export default function TheMainFirstGroupBodyLeft() {
    const arrayOfSrc = [ inf_icon, arrows_icon, shop_icon, range_icon ];
    const arrayOfTitles = [ "unlimited options", "DESIGN & DEVELOPMENT", "e-commerce", "CUSTOMIZABLE DESIGN" ];
    const arrayColumnOfInfItems = [
        [
            "Branding",
            "Design & Copywriting",
            "Concept development",
            "User Experience"
        ],
        [
            "Information architecture",
            "Interface design",
            "Product Design",
            "Integrated ad Companies",
        ],
        [
            "Prototyping",
            "Technical Consulting",
            "Web applications",
            "Quality testing"
        ],
        [
            "Information architecture",
            "Interface design",
            "Product Design",
            "Integrated ad Companies"
        ]
    ];

    return(
        <div className="main_firstGroup__body___left">
            {arrayOfSrc.map((item, index) => (
                <ItemOfGroup key={index} id={`${index}`} srcOfImage={item} columnOfInfItems={arrayColumnOfInfItems[index]}>
                    { arrayOfTitles[index] }
                </ItemOfGroup>
            ))}
        </div>
    )
}