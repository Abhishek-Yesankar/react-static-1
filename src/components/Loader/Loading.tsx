import { createPortal } from "react-dom";
const loadingContainer = document.getElementById( 'loading' ) as HTMLElement;
//72
const totalPixels = 12 * 6;
const pixel: any = [];

for( let i = 1; i <= totalPixels; i++ ) {
	pixel.push( <div className={`pixel ${i}`} key={i} /> );
}

export default function Loading( props: any )  {
  return(
    createPortal( <div id="preload" className={`grid fixed z-50 inset-0 grid-cols-6 md:grid-cols-12 md:grid-rows-6${ props.active ? ' active': ' invisible' }`}>
     { pixel }
    </div>, loadingContainer )
  );
}