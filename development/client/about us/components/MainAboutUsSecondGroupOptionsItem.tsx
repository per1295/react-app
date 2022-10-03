import React, { FunctionComponent } from "react";
import Information from "../../globalComponents/Information";
import "../styles/MainAboutUsSecondGroupOptionsItem.scss";
import OptionsItemHead from "./OptionsItemHead";

interface MainAboutUsSecondGroupOptionsItemProps {
    iconName: string
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