import React from 'react';
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
    const { pathname } = useLocation();
    
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>No match for <code>{ pathname }</code></p>
        </div>
    );
}

export default React.memo(ErrorPage);