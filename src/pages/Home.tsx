import { useRef, useEffect } from 'react';
import heroImage from '../dancer_red_1400x700.jpg';
import Container from '../components/Container';
import { gsap } from 'gsap';

/** Hero Section Pixels */
const heroPixelRow = 7;
const heroPixelCol = ( heroPixelRow * 2 ) * heroPixelRow;

const pixel: JSX.Element[] = [];
for( let col = 0; col < heroPixelCol; col++ ) pixel.push( <div key={col} className="pixel bg-neutral-900"/> );

/** Animated Text */
const headings = [
   'Energy',
   'Beauty',
   'Clarity',
   'Creativity',
];
const animatedHeadings: JSX.Element[] = [];

for( let i = 0; i < headings.length; i++ ) {
   animatedHeadings.push(
      <span key={i} style={{ position: `${( i !== 0 ) ? 'absolute': 'static'}`}} className="inline-block animate-container" aria-label={headings[i]}>
         { headings[i].split('').map( ( text, k ) => <span className="inline-block" aria-hidden="true" key={k}>{text}</span> ) }
      </span> );
}

export default function Home()  {
   const pixelContainer = useRef<any>();
   const headingAnimationContainer = useRef<any>();

   useEffect( () => {
      const gsapCtx = gsap.context( () => {
         const gsapTimeline = gsap.timeline();
         gsapTimeline.repeat( -1 );
         const txt = headingAnimationContainer.current.querySelectorAll( '.animate-container' );
         const delay = 3;

         txt.forEach( ( item: HTMLElement ) => {
            gsapTimeline.fromTo( item.querySelectorAll( 'span' ), { y: '-100%', opacity: 0, }, { y: 0, opacity: 1, stagger: .1, duration: .6, repeat: 1, yoyo: true, delay: -.6, repeatDelay: ( delay / 2 ) - .6, ease: "circ.out" });
         });

         const pixels = pixelContainer.current?.querySelectorAll( '.pixel' ) as NodeListOf<HTMLElement>;
         if( !pixels ) return;

         pixels.forEach( ( item, i ) => {
            gsap.fromTo( item, { opacity: .2, }, { opacity: .5, repeat: -1, delay: gsap.utils.random( 1, i ), yoyo: true, duration: 1.5 } );
         });

      }, [headingAnimationContainer, pixelContainer] );

      return () => {
         gsapCtx.revert();
      }
   }, []);

   return(
      <section>
         <Container className="px-6 md:px-12">
            <div className="relative h-[700px] bg-cover bg-no-repeat bg-center flex items-end" 
            style={{ backgroundImage: `url(${heroImage})` }}>
               <div className={`absolute bg-neutral-900 bg-opacity-40 inset-0 grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(7,1fr)]`} 
               ref={pixelContainer}>
               { pixel }
               </div>
               <div className="relative z-10 flex-grow text-center overflow-hidden">
                  <h1 className="text-5xl font-bold pb-2">Seeking{ ' ' }
                     <span className="text inline-block">
                        <div className="flex flex-col" ref={headingAnimationContainer}>{animatedHeadings}</div>
                     </span>
                  </h1>
                  <h2 className="my-1 text-xl">Amidst Chaos</h2>
               </div>
            </div>
         </Container>
      </section>
   );
}