import React from "react";
import "../styles/TheMainAboutUsSecondGroupOptions.scss"
import MainAboutUsSecondGroupOptionsItem from "./MainAboutUsSecondGroupOptionsItem";

export default function TheMainAboutUsSecondGroupOptions() {
    const titles = [ "FULLY RESPONSIVE", "UNLIMITED OPTIONS", "WORDPRESS", "e-commerce", "CUSTOMIZABLE DESIGN", "SUPPORT" ];
    const iconNames = [
        "phone-portrait-outline",
        "infinite-outline",
        "logo-wordpress",
        "cart-outline",
        "options-outline",
        "hammer-outline"
    ];

    return(
        <div className="mainAboutUs_secondGroup__options">
            { iconNames.map((item, index) => (
                <MainAboutUsSecondGroupOptionsItem key={index} iconName={item} title={titles[index]}/>
            )) }
        </div>
    )
}