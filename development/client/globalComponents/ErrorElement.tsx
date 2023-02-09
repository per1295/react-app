import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Button from "./Button";

import "../globalStyles/ErrorElement.scss";

export default function ErrorElement() {
    const error = useRouteError() as Error;

    return(
        <div className="error">
            <h1 className="error_title">
                Opps, looks like you have an error...
            </h1>
            <ul className="error_list">
                {
                    isRouteErrorResponse(error)
                    ?
                    <>
                        <li className="error_list__item">
                            Status: {error.status}
                        </li>
                        <li className="error_list__item">
                            Status text: {error.statusText}
                        </li>
                        <li className="error_list__item">
                            {error.data}
                        </li>
                    </>
                    :
                    <>
                        <li className="error_list__item">
                            {error.toString()}
                        </li>
                    </>
                }
            </ul>
            <Button startColor="white" className="error_button" onClick={() => location.reload()}>
                Reload the page
            </Button>
        </div>
    )
}