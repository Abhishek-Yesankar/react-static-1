import { useRef, useEffect, MouseEventHandler } from 'react';
import heroImage from '../images/dancer_red_1400x700.jpg';
import section2Image from '../images/bird-image.png';
import img1 from '../images/flip-tech.jpg';
import img1Pix from '../images/flip-tech-pixelated.jpg';
import img2 from '../images/nama.jpg';
import img2Pix from '../images/nama-pixelated.jpg';
import img3 from '../images/rebc.jpg';
import img3Pix from '../images/rebc-pixelated.jpg';
import img4 from '../images/bullmonk.jpg';
import img4Pix from '../images/bullmonk-pixelated.jpg';
import img5 from '../images/pexels-tobias-bjørkli-2113566.jpg';
import img6 from '../images/pexels-sam-kolder-2387873.jpg';
import homeLast from '../images/home-last.jpg';
import Container from '../components/Container';
import { ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';

gsap.registerPlugin( ScrollTrigger );

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
      <span key={i} style={{ position: `${( i !== 0 ) ? 'absolute': 'static'}`}} className="inline-block animate-container font-Coconat" aria-label={headings[i]}>
         { headings[i].split('').map( ( text, k ) => <span className="inline-block font-Coconat" aria-hidden="true" key={k}>{text}</span> ) }
      </span> );
}

function sectionAdjustMargin( el: HTMLElement )  {
   const maxWidth = el.dataset?.maxwidth ? +( el.dataset.maxwidth ) : 0;
   const bodyWidth = document.body.getBoundingClientRect().width;
   if( maxWidth > bodyWidth ) {
      el.style.marginLeft = '0';
      return;
   }

   el.style.marginRight = '0';
   el.style.paddingRight = '0';
   el.style.marginLeft = ( ( bodyWidth - maxWidth ) / 2 ) + 'px';
   el.style.maxWidth = 'unset';
}


export default function Home()  {
   const pixelContainer = useRef<any>();
   const headingAnimationContainer = useRef<any>();
   const section2Ref = useRef<any>();
   const section5Ref = useRef<any>();

   const distanceOfAnotherImgToRender = 120;
   let hoverImages: null | NodeListOf<HTMLElement> = null;
   let currentImageIndex = 0;
   let prevX: undefined | number = undefined;
   let prevY: undefined | number = undefined;

   function imagesHoverEffect( e: React.MouseEvent ): void  {
      const rect = e.currentTarget.getBoundingClientRect();
      if( hoverImages === null )  {
         hoverImages = e.currentTarget.querySelectorAll( 'img' );
         if( !hoverImages ) return;
      }

      const x = e.clientX - rect.x;
      const y = e.clientY - rect.y;
      if( prevX === undefined || prevY === undefined || Math.abs( x - prevX ) > distanceOfAnotherImgToRender || Math.abs( y - prevY ) > distanceOfAnotherImgToRender ) {
         const i = currentImageIndex;
         prevX = x;
         prevY = y;

         ///doing this because of if image is active
         ///and that same image is called then the 
         ///image will instantly disappear
         ///it will still give the instantly disappear effect
         ///but little less
         if( hoverImages[i].dataset.active === 'true' ) {
            hoverImages[i].classList.remove( 'active' );
         }

         hoverImages[i].setAttribute( 'data-active', 'true' );
         hoverImages[i].classList.add( 'active' );

         setTimeout( () => {
            if( !hoverImages ) return;
            hoverImages[i].classList.remove( 'active' );
            hoverImages[i].setAttribute( 'data-active', 'false' );
         }, 400 );

         hoverImages[i].style.left = `${x}px`;
         hoverImages[i].style.top = `${y}px`;

         if( currentImageIndex < ( hoverImages.length - 1 ) ) {
            currentImageIndex++;
         } else if( currentImageIndex >= ( hoverImages.length - 1 ) ) {
            currentImageIndex = 0;
         }
      }
   }

   useEffect( () => {
      const gsapCtx = gsap.context( () => {
         const gsapTimeline = gsap.timeline();
         gsapTimeline.repeat( -1 );
         const txt = headingAnimationContainer.current.querySelectorAll( '.animate-container' );
         const delay = 5;

         txt.forEach( ( item: HTMLElement ) => {
            gsapTimeline.fromTo( item.querySelectorAll( 'span' ), { y: '-100%', opacity: 0, scrollTrigger: {
               trigger: section5Ref.current,
               toggleActions: "resume resume resume pause"
            }}, 
            { y: 0, opacity: 1, stagger: .1, duration: .6, repeat: 1, yoyo: true, delay: -.6, repeatDelay: ( delay / 2 ) - .6, ease: "circ.out" });
         });

         const pixels = pixelContainer.current?.querySelectorAll( '.pixel' ) as NodeListOf<HTMLElement>;
         if( pixels ) {
            pixels.forEach( ( item, i ) => {
               gsap.fromTo( item, { opacity: .2, 
                  scrollTrigger: {
                  trigger: section5Ref.current,
                  toggleActions: "resume resume resume pause"
               }}, 
               { opacity: .5, repeat: -1, delay: gsap.utils.random( 1, i ), yoyo: true, duration: 1.7 } );
            });
         }

         const section2Container = section2Ref.current.querySelector( 'div' ) as HTMLElement;
         if( section2Container )  {
            const maxWidth = Number.parseInt( window.getComputedStyle( section2Container )["maxWidth"] );
            if( maxWidth ) {
               section2Container.setAttribute( 'data-maxWidth', `${maxWidth}` );
            }
            sectionAdjustMargin( section2Container );
            window.onresize = () => {
               sectionAdjustMargin( section2Container );
            }
         }

         gsap.from( section5Ref.current, {
            scrollTrigger: {
               trigger: section5Ref.current,
               scrub: .5,
               toggleActions: "resume resume resume pause"
            },
            backgroundPositionY: 120,
         });

      }, [headingAnimationContainer, pixelContainer, section5Ref] );

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
                  <h1 className="text-3xl md:text-6xl font-bold pb-2 font-Coconat">Seeking{ ' ' }
                     <span className="text inline-block font-Coconat">
                        <div className="flex flex-col" ref={headingAnimationContainer}>{animatedHeadings}</div>
                     </span>
                  </h1>
                  <h2 className="my-1 text-xl font-Coconat">Amidst Chaos</h2>
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
               <div className="h-36 w-[1.75px] rounded bg-white mx-auto mt-8 mb-6 md:mb-16" />
            </div>
         </Container>
      </section>

      {/* section 2 */}
      <section ref={section2Ref}>
         <Container className="flex flex-wrap items-center text-gray-300">
            <div className="md:w-3/5 max-w-3xl">
               <h2 className="text-xs tracking-[.2em] text-zinc-400 font-Coconat">INTRODUCTION</h2>
               <h1 className="gradient-heading text-4xl leading-[1.25] font-bold mt-2 text-transparent font-Coconat">
                  We're a full service creative collective
                  that embraces chaos, blurring the lines
                  between Design & Code to create
                  work that inspires delight.
               </h1>
               <div className="mt-28 flex flex-wrap gap-6 md:gap-20">
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-5">DIGITAL</h3>
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
                     <h3 className="text-sm text-zinc-400 mb-5">ONLINE MARKETING</h3>
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
                     <h3 className="text-sm text-zinc-400 mb-5">BRANDING</h3>
                     <ul className="text-xs space-y-2">
                        <li>BRAND IDENTITY & STATIONERY</li>
                        <li>EDITORIAL & PRINT DESIGN</li>
                        <li>PRINT AD DESIGN</li>
                     </ul>
                  </div>
                  <div className="md:w-1/4">
                     <h3 className="text-sm text-zinc-400 mb-5">MOTION</h3>
                     <ul className="text-xs space-y-2">
                        <li>3D</li>
                        <li>ANIMATION</li>
                        <li>MOTION GRAPHICS</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="md:w-2/5 ml-6 flex-grow hidden md:block">
               <img className="w-full" src={section2Image} alt=""/>
            </div>
         </Container>
      </section>

      {/* Section 3 */}
      <section>
         <Container>
            <div className="md:w-10/12 relative img-pixelated-con">
               <img className="w-full" src={img1} alt=""/>
               <img className="absolute inset-0 pixelated z-10 opacity-0 w-full h-full transition-opacity duration-700" src={img1Pix} alt="" />
               <h2 className="absolute -translate-y-2/4 left-0 right-0 top-2/4 pixelated z-20 opacity-0 transition-opacity duration-700 text-3xl md:text-8xl text-center font-bold font-Coconat">
                  Changing Perspectives</h2>
            </div>
            <div className="mt-12 md:mt-32 flex flex-wrap md:flex-nowrap md:gap-24">
               <div className="md:w-2/5">
                  <div className="relative img-pixelated-con">
                     <img className="w-full" src={img2} alt=""/>
                     <img className="absolute inset-0 pixelated z-10 opacity-0 w-full h-full transition-opacity duration-700" src={img2Pix} alt="" />
                     <h2 className="absolute -translate-y-2/4 left-0 right-0 top-2/4 pixelated z-20 opacity-0 transition-opacity duration-700 text-3xl md:text-8xl text-center font-bold font-Coconat">
                        Name</h2>
                  </div>
               </div>
               <div className="md:w-3/5 md:pt-32 mt-12 md:mt-0">
                  <div className="relative img-pixelated-con">
                        <img className="w-full" src={img3} alt=""/>
                        <img className="absolute inset-0 pixelated z-10 opacity-0 w-full h-full transition-opacity duration-700" src={img3Pix} alt="" />
                        <h2 className="absolute -translate-y-2/4 left-0 right-0 top-2/4 pixelated z-20 opacity-0 transition-opacity duration-700 text-3xl md:text-8xl text-center font-bold font-Coconat">
                           Rebc</h2>
                  </div>
                  <div className="relative img-pixelated-con mt-12 md:mt-24">
                        <img className="w-full" src={img4} alt=""/>
                        <img className="absolute inset-0 pixelated z-10 opacity-0 w-full h-full transition-opacity duration-700" src={img4Pix} alt="" />
                        <h2 className="absolute -translate-y-2/4 left-0 right-0 top-2/4 pixelated z-20 opacity-0 transition-opacity duration-700 text-3xl md:text-8xl text-center font-bold font-Coconat">
                           Bullmonk</h2>
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* Section 4 */}
      <section id="home-section-4" className="relative flex min-h-screen">
         <div id="hover-container" className="absolute inset-0 overflow-hidden" onMouseMove={imagesHoverEffect}>
            <img className="w-full absolute opacity-0 object-cover" src={img1} alt="" />
            <img className="w-full absolute opacity-0 object-cover" src={img2} alt="" />
            <img className="w-full absolute opacity-0 object-cover" src={img3} alt="" />
            <img className="w-full absolute opacity-0 object-cover" src={img4} alt="" />
            <img className="w-full absolute opacity-0 object-cover" src={img5} alt="" />
            <img className="w-full absolute opacity-0 object-cover" src={img6} alt="" />
         </div>
         <Container className="flex flex-col justify-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-Coconat">Discover The Work</h2>
            <p className="mt-6 text-md font-light sm:w-1/2 mx-auto">we take a thoughtful considered approach to
               create designs with real depth and relevance
               that stand the test of time.
            </p>
         </Container>
      </section>
      {/* Section 5 */}
      <section id="home-section-5" ref={section5Ref} className="min-h-screen" style={{background: `url('${homeLast}')`}}>
         <Container className="md:flex md:py-32">
            <div className="w-1/2">
               <p className="font-medium text-sm mb-2 tracking-widest">BLOG</p>
               <h3 className="text-3xl md:text-5xl font-semibold font-Coconat">When Ideas Meet Reality</h3>
            </div>
         </Container>
      </section>
      <section id="home-section-5" className="min-h-screen">
         <Container>
         </Container>
      </section>
      </>
   );
}