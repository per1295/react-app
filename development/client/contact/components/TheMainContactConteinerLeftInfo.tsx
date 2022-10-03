import React from "react";
import Information from "../../globalComponents/Information";
import TheFooterConteinerIcons from "../../globalComponents/TheFooterConteinerIcons";
import "../styles/TheMainContactConteinerLeftInfo.scss";

export default function TheMainContactConteinerLeftInfo() {
    const arrData = [
        "13D, Functional apartment, Unique colony,",
        "Agadir 86360",
        "+212 124-566-780", 
        "+212 124-566-780",
        "email@website.com"
    ];

    return(
        <div className="mainContact_conteiner__left___info">
            <span className="mainContact_conteiner__left___info____title">
                CONTACT INFO
            </span>
            <Information appendedClassName="mainContact_conteiner__left___info">
                Lorem ipsum dolor sit amet, conse adipisicing elit. Libero incidunt quod ab mollitia quia dolorum conse.
            </Information>
            <div className="mainContact_conteiner__left___info____data">
                {
                    arrData.map((item, index) => (
                        <Information key={index} appendedClassName="mainContact_conteiner__left___info____data">
                            { item }
                        </Information>
                    ))
                }
            </div>
            <TheFooterConteinerIcons/>
        </div>
    )
}