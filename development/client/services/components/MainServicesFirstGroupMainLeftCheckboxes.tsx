import React, { FunctionComponent } from "react";

import CheckboxLine from "./CheckboxLine";

import "../styles/MainServicesFirstGroupMainLeftCheckboxes.scss";

interface TheMainServicesFirstGroupMainLeftCheckboxesProps {
    titles: string[];
}

const TheMainServicesFirstGroupMainLeftCheckboxes: FunctionComponent<TheMainServicesFirstGroupMainLeftCheckboxesProps> = ({ titles }) => {

    return(
        <div className="mainServices_firstGroup__main___left____checkboxes">
            {
                titles.map((item, index) => (
                    <CheckboxLine key={index}>
                        { item }
                    </CheckboxLine>
                ))
            }
        </div>
    )
}

export default TheMainServicesFirstGroupMainLeftCheckboxes;