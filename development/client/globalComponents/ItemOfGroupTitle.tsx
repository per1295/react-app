import React, { FunctionComponent } from "react";

import "../globalStyles/ItemOfGroupTitle.scss";

interface ItemOfGroupTitleProps {
    id: string;
    children: JSX.Element | string;
}

const ItemOfGroupTitle: FunctionComponent<ItemOfGroupTitleProps> = ({ id, children }) => {
    return(
        <span className={"itemOfGroup_title " + "itemOfGroup_title_" + id}>
            { children }
        </span>
    )
}

export default ItemOfGroupTitle;