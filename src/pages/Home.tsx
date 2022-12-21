import { useRef, useEffect } from 'react';
import heroImage from '../dancer_red_1400x700.jpg';
import Container from '../components/Container';
import { gsap } from 'gsap';

const heroPixelRow = 7;
const heroPixelCol = ( heroPixelRow * 2 ) * heroPixelRow;

let pixel: JSX.Element[] = [];
for( let col = 0; col < heroPixelCol; col++ ) pixel.push( <div key={col} className="pixel bg-black"/> );

function startPixelAnimation( el: HTMLElement )  {
   if( !el ) return;
   const pixels = el.querySelectorAll( '.pixel' ) as NodeListOf<HTMLElement>;
   if( !pixels ) return;

   pixels.forEach( ( item, i ) => {
      gsap.fromTo( item, { opacity: .1, }, { opacity: .3, repeat: -1, delay: gsap.utils.random( 1, i * 1.2 ) , yoyo: true, duration: 2.5 } );
   });
}

export default function Home()  {
   const pixelContainer = useRef<any>();

   useEffect( () => {
   //   console.log( pixelContainer.current );
   return () => {
      startPixelAnimation( pixelContainer.current );
   }

   }, []);

   return(
      <section>
         <Container className="px-6 md:px-12">
            <div className="overflow-hidden relative">
               <img className="mx-auto w-full h-[700px] object-cover" src={heroImage} alt="" />
               <div className={`absolute bg-black bg-opacity-40 inset-0 grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(7,1fr)]`} ref={pixelContainer}>
               { pixel }
               </div>
            </div>
         </Container>
      </section>
   );
}