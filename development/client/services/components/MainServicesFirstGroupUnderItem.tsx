import React, { FunctionComponent } from "react";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

import IonIcon from "@reacticons/ionicons";
import GreenBlock from "../../globalComponents/GreenBlock";
import Information from "../../globalComponents/Information";

import "../styles/MainServicesFirstGroupUnderItem.scss";

interface MainServicesFirstGroupUnderItemProps {
    iconName: keyof typeof IconList;
    title: string;
}

const MainServicesFirstGroupUnderItem: FunctionComponent<MainServicesFirstGroupUnderItemProps> = ({ iconName, title }) => {
    return(
        <div className="mainServices_firstGroup__under___item">
            <div className="mainServices_firstGroup__under___item____top">
                <IonIcon
                    name={iconName}
                    className="mainServices_firstGroup__under___item____top_____icon"
                />
                <GreenBlock className="mainServices_firstGroup__under___item____top_____greenBlock"/>
            </div>
            <span className="mainServices_firstGroup__under___item____title">
                { title }
            </span>
            <Information appendedClassName="mainServices_firstGroup__under___item">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt .
            </Information>
        </div>
    )
}

export default MainServicesFirstGroupUnderItem;