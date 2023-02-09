import React, { FunctionComponent } from "react";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

import Information from "../../globalComponents/Information";
import OptionsItemHead from "./OptionsItemHead";

import "../styles/MainAboutUsSecondGroupOptionsItem.scss";

interface MainAboutUsSecondGroupOptionsItemProps {
    iconName: keyof typeof IconList;
    title: string;
}

const MainAboutUsSecondGroupOptionsItem: FunctionComponent<MainAboutUsSecondGroupOptionsItemProps> = ({ iconName, title }) => {
    return(
        <div className="mainAboutUs_secondGroup__options___item">
            <OptionsItemHead iconName={iconName} title={title}/>
            <Information appendedClassName="mainAboutUs_secondGroup__options___item">
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eleifend suscipit enim, eu commodo neque molestie vitae.
            </Information>
        </div>
    )
}

export default MainAboutUsSecondGroupOptionsItem;