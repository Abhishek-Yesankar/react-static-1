import { useRef, useEffect } from 'react';
import heroImage from '../images/dancer_red_1400x700.jpg';
import section2Image from '../images/bird-image.png';
import Container from '../components/Container';
import { gsap } from 'gsap';

/** Hero Section Pixels */
const heroPixelRow = 7;
const heroPixelCol = ( heroPixelRow * 2 ) * heroPixelRow;

const pixel: JSX.Element[] = [];
for( let col = 0; col < heroPixelCol; col++ ) pixel.push( <div key={col} className="pixel bg-neutral-900"/> );

/** Animated Text */
const animatedHeadings: JSX.Element[] = [];
const headings = [
   'Energy',
   'Beauty',
   'Clarity',
   'Creativity',
];

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
         const delay = 5;

         txt.forEach( ( item: HTMLElement ) => {
            gsapTimeline.fromTo( item.querySelectorAll( 'span' ), { y: '-100%', opacity: 0, }, { y: 0, opacity: 1, stagger: .1, duration: .6, repeat: 1, yoyo: true, delay: -.6, repeatDelay: ( delay / 2 ) - .6, ease: "circ.out" });
         });

         const pixels = pixelContainer.current?.querySelectorAll( '.pixel' ) as NodeListOf<HTMLElement>;
         if( pixels ) {
            pixels.forEach( ( item, i ) => {
               gsap.fromTo( item, { opacity: .2, }, { opacity: .5, repeat: -1, delay: gsap.utils.random( 1, i ), yoyo: true, duration: 1.7 } );
            });
         }

      }, [headingAnimationContainer, pixelContainer] );

      return () => {
         gsapCtx.revert();
      }
   }, []);

   return(
      <>
      <section>
         <Container className="py-0 md:py-0">
            <div className="relative min-h-[80vh] bg-cover bg-no-repeat bg-center flex items-end" 
            style={{ backgroundImage: `url(${heroImage})` }}>
               <div className={`absolute bg-neutral-900 bg-opacity-30 inset-0 grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(7,1fr)]`} 
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
            <div className="py-6">
               <p className="text-center leading-tight text-xs uppercase text-zinc-400">
                  Akin to a dancer, we find stillness at the core, the true essence of your brand
                  <br />
                  creating new ways to communicate this, making all the right moves
                  <br />
                  to cut through the digital noise and captivate your audience.
               </p>
               <div className="h-36 w-[1.75px] rounded bg-white mx-auto mt-8 mb-16" />
            </div>
         </Container>
      </section>

      <section>
         <Container className="flex flex-wrap items-center">
            <div className="md:w-3/5">
               <h2 className="text-xs tracking-[.2em] text-zinc-400">INTRODUCTION</h2>
               <h1 className="gradient-heading text-4xl leading-[1.25] font-bold mt-2 text-transparent">
                  We're a full service creative collective
                  that embraces chaos, blurring the lines
                  between Design & Code to create
                  work that inspires delight.
               </h1>
               <div className="mt-28 flex flex-wrap gap-6 md:gap-20">
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-3">DIGITAL</h3>
                     <ul className="text-xs space-y-2">
                        <li>UI/UX</li>
                        <li>E-COMMERCE</li>
                        <li>WEB DESIGN & DEV</li>
                        <li>CONTENT MGT. SYSTEMS</li>
                        <li>MOBILE APPS (IOS & ANDROID)</li>
                        <li>AWS CLOUD HOSTING & CDN SETUP</li>
                        <li>CUSTOM SOFTWARE DEV. (CRM, ERP)</li>
                     </ul>
                  </div>
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-3">ONLINE MARKETING</h3>
                     <ul className="text-xs space-y-2">
                        <li>ART DIRECTION</li>
                        <li>CONTENT WRITING</li>
                        <li>EMAIL NEWSLETTERS</li>
                        <li>SOCIAL MEDIA MARKETING (SMM)</li>
                        <li>SEARCH ENGINE OPTIMIZATION (SEO)</li>
                        <li>DIGITAL AD DESIGNS (FACEBOOK, INSTA)</li>
                     </ul>
                  </div>
               </div>
               <div className="mt-16 flex flex-wrap gap-6 md:gap-20">
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-3">BRANDING</h3>
                     <ul className="text-xs space-y-2">
                        <li>BRAND IDENTITY & STATIONERY</li>
                        <li>EDITORIAL & PRINT DESIGN</li>
                        <li>PRINT AD DESIGN</li>
                     </ul>
                  </div>
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-3">MOTION</h3>
                     <ul className="text-xs space-y-2">
                        <li>3D</li>
                        <li>ANIMATION</li>
                        <li>MOTION GRAPHICS</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="md:w-2/5">
               <img className="w-full" src={section2Image} alt=""/>
            </div>
         </Container>
      </section>
      </>
   );
}