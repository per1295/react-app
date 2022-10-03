import React from "react";
import "../globalStyles/TheHeaderTopMenu.scss";
import { useTypedSelector, useDispatch } from "../customHooks";
import { setMenuOpen, setMenuClose } from "../store/slices/isMenuOpen";

const TheHeaderTopMenu = () => {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const dispatch = useDispatch();

    const onClick = () => dispatch( isMenuOpen ? setMenuClose() : setMenuOpen() );

    return(
        <div className="header_top__menu" onClick={onClick}>
            <div className="header_top__menu___line"></div>
            <div className="header_top__menu___line"></div>
            <div className="header_top__menu___line"></div>
        </div>
    )
}

export default TheHeaderTopMenu;