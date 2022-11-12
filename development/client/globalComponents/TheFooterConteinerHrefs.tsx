import React from "react";
import { Link } from "react-router-dom";
import "../globalStyles/TheFooterConteinerHrefs.scss";

const TheFooterConteinerHrefs = () => {
    const hrefs = [ "Home", "-", "about us", "-", "services", "-", "blog", "-", "contact us" ];

    return(
        <div className="footer_conteiner__hrefs">
            { hrefs.map((item, index) => (
                item === "-"
                ?
                <span key={index} className="footer_conteiner__hrefs___dash">
                    { item }
                </span>
                :
                <Link key={index} to={`/${item.toLowerCase()}`} className="footer_conteiner__hrefs___href">
                    { item }
                </Link>
            )) }
        </div>
    )
}

export default TheFooterConteinerHrefs;