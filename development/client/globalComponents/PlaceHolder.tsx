import React, { useEffect, useRef } from "react";

import "../globalStyles/Placeholder.scss";

export default function Placeholder() {
    const placeholderRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const placeholderElem = placeholderRef.current;
        const timeoutStep = 16.6;
        const step = 6;

        let timeout = setTimeout(requestAnimationFrame, timeoutStep, function frame() {
            if ( placeholderElem ) {
                const { background } = getComputedStyle(placeholderElem);
                const percentsMatch = background.match(/(?<=\)\s)\d{1,3}(?=(%|px)?)/g);
                
                if ( percentsMatch ) {
                    let firstPercent = +percentsMatch[0];
                    let secondPercent = +percentsMatch[1];
                    let thirdPercent = +percentsMatch[2];
                    
                    if ( !isNaN(firstPercent) && !isNaN(secondPercent) && !isNaN(thirdPercent) ) {
                        thirdPercent += step;
                        
                        if ( thirdPercent > 25 ) secondPercent += step;
                        if ( thirdPercent > 50 ) firstPercent += step;

                        if ( firstPercent > 100 ) firstPercent = 100;
                        if ( secondPercent > 100 ) secondPercent = 100;
                        if ( thirdPercent > 100 ) thirdPercent = 100;

                        if ( firstPercent === 100 && secondPercent === 100 && thirdPercent === 100 ) {
                            firstPercent = secondPercent = thirdPercent = 0;
                        }

                        placeholderElem.style.background = `
                            linear-gradient(45deg, rgba(236,236,236,1) ${firstPercent}%, rgba(123,238,199,1) ${secondPercent}%, rgba(236,236,236,1) ${thirdPercent}%)
                        `;

                        timeout = setTimeout(requestAnimationFrame, timeoutStep, frame);
                    }
                }
            }
        });

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return(
        <div ref={placeholderRef} className="placeholder"></div>
    )
}