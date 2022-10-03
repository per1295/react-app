import React, { FunctionComponent } from "react";
import Img from "./Img";
import ItemOfGroupTitle from "./ItemOfGroupTitle";
import ItemOfGroupInf from "./ItemOfGroupInf";
import "../globalStyles/ItemOfGroup.scss";

interface ItemOfGroupProps {
    id: string;
    srcOfImage: URL | string;
    children: JSX.Element | string;
    columnOfInfItems: string[];
}

const ItemOfGroup: FunctionComponent<ItemOfGroupProps> = ({ id, srcOfImage, children, columnOfInfItems }) => {
    return(
        <div className="itemOfGroup">
            <Img src={srcOfImage} alt="itemOfGroup_img" className={"itemOfGroup_icon" + ` itemOfGroup_icon_${id}`}/>
            <ItemOfGroupTitle id={id}>
                { children }
            </ItemOfGroupTitle>
            <ItemOfGroupInf id={id} appendedClassName="firstGroup_body__left___itemOfGroup" columnOfInfItems={columnOfInfItems}/>
        </div>
    )
}

export default ItemOfGroup;