import { useRef, useEffect } from 'react';
import heroImage from '../dancer_red_1400x700.jpg';
import Container from '../components/Container';
import { gsap } from 'gsap';

/** Hero Section Pixels */
const heroPixelRow = 7;
const heroPixelCol = ( heroPixelRow * 2 ) * heroPixelRow;

let pixel: JSX.Element[] = [];
for( let col = 0; col < heroPixelCol; col++ ) pixel.push( <div key={col} className="pixel bg-neutral-900"/> );

function startPixelAnimation( el: HTMLElement )  {
   const pixels = el?.querySelectorAll( '.pixel' ) as NodeListOf<HTMLElement>;
   if( !pixels ) return;

   pixels.forEach( ( item, i ) => {
      gsap.fromTo( item, { opacity: .2, }, { opacity: .5, repeat: -1, delay: gsap.utils.random( 1, i ) , yoyo: true, duration: 1.5 } );
   });
}

/** Animated Text */
const animateText = [
   [ 'E', 'n', 'e', 'r', 'g', 'y' ],
   [ 'B', 'e', 'a', 'u', 't', 'y' ],
   [ 'C', 'l', 'a', 'r', 'i', 't', 'y' ],
   [ 'C', 'r', 'e', 'a', 't', 'i', 'v', 'i', 't', 'y' ],
]
const energy: JSX.Element[] = [];

for( let i = 0; i < animateText.length; i++ ) {
   energy.push( <span key={i} className="inline-block animate-container">
         { animateText[i].map( ( text, k ) => <span key={k}>{text}</span> ) }
      </span> );
}

export default function Home()  {
   const pixelContainer = useRef<any>();
   const textAnimationContainer = useRef<any>();

   useEffect( () => {

   const gsapCtx = gsap.context( () => {
      gsap.fromTo(".text .animate-container", { y: '-30px' }, { y: 0, duration: 1 });  
      gsap.fromTo(".text .animate-container span", { y: '-60px', opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .3, delay: 1 });  
   }, textAnimationContainer);

   return () => {
      startPixelAnimation( pixelContainer.current );
      gsapCtx.revert();
   }

   }, []);

   return(
      <section>
         <Container className="px-6 md:px-12">
            <div className="relative h-[700px] bg-cover bg-no-repeat bg-center flex items-end" 
            style={{ backgroundImage: `url(${heroImage})` }}>
               <div className={`absolute bg-neutral-900 bg-opacity-50 inset-0 grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(7,1fr)]`} 
               ref={pixelContainer}>
               { pixel }
               </div>
               <div className="relative z-10 flex-grow text-center">
                  <h1 className="text-5xl py-12 font-bold" ref={textAnimationContainer}>Seeking <span className="text">{energy}</span></h1>
               </div>
            </div>
         </Container>
      </section>
   );
}