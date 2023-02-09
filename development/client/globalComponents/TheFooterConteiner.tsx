import React from "react";

import TheFooterConteinerHrefs from "./TheFooterConteinerHrefs";
import TheFooterConteinerCopyRight from "./TheFooterConteinerCopyRight";
import TheFooterConteinerIcons from "./TheFooterConteinerIcons";

import "../globalStyles/TheFooterConteiner.scss";

export default function TheFooterConteiner() {
    return(
        <div className="footer_conteiner">
            <TheFooterConteinerHrefs/>
            <TheFooterConteinerCopyRight/>
            <TheFooterConteinerIcons/>
        </div>
    )
}