import React from "react";
import "../globalStyles/TheFooterConteiner.scss";
import TheFooterConteinerHrefs from "./TheFooterConteinerHrefs";
import TheFooterConteinerCopyRight from "./TheFooterConteinerCopyRight";
import TheFooterConteinerIcons from "./TheFooterConteinerIcons";

export default function TheFooterConteiner() {
    return(
        <div className="footer_conteiner">
            <TheFooterConteinerHrefs/>
            <TheFooterConteinerCopyRight/>
            <TheFooterConteinerIcons/>
        </div>
    )
}