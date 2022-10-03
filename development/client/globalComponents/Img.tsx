import React, { FunctionComponent, forwardRef } from "react";

interface ImgProps {
    src: string | URL;
    alt: string;
    className?: string;
}

const Img = forwardRef<HTMLImageElement, ImgProps>(({ src, alt, className }, ref) => {
    if ( src instanceof URL ) src = src.toString();

    return(
        <img ref={ref} src={src} alt={alt} className={className}/>
    )
});

export default Img;