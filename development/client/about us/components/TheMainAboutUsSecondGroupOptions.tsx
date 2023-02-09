import React from "react";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

import MainAboutUsSecondGroupOptionsItem from "./MainAboutUsSecondGroupOptionsItem";

import "../styles/TheMainAboutUsSecondGroupOptions.scss"

export default function TheMainAboutUsSecondGroupOptions() {
    const titles = [ "FULLY RESPONSIVE", "UNLIMITED OPTIONS", "WORDPRESS", "e-commerce", "CUSTOMIZABLE DESIGN", "SUPPORT" ];
    const iconNames = [
        "phone-portrait-outline",
        "infinite-outline",
        "logo-wordpress",
        "cart-outline",
        "options-outline",
        "hammer-outline"
    ] as unknown as (keyof typeof IconList)[];

    return(
        <div className="mainAboutUs_secondGroup__options">
            { iconNames.map((item, index) => (
                <MainAboutUsSecondGroupOptionsItem key={index} iconName={item} title={titles[index]}/>
            )) }
        </div>
    )
}