import React, { FunctionComponent } from "react";
import "../styles/MainServicesFirstGroupMainLeftCheckboxes.scss";
import CheckboxLine from "./CheckboxLine";

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