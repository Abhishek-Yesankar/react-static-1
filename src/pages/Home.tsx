import heroImage from '../dancer_red_1400x700.jpg';
import Container from '../components/Container';

const heroPixelRow = 7;
const heroPixelCol = ( heroPixelRow * 2 ) * heroPixelRow;

let pixel: JSX.Element[] = [];
for( let col = 0; col < heroPixelCol; col++ ) pixel.push( <div key={col} className="pixel"/> );

export default function Home()  {

   return(
      <section>
         <Container className="px-6 md:px-12">
            <div className="overflow-hidden relative">
               <img className="mx-auto w-full h-[700px] object-cover" src={heroImage} alt="" />
               <div className={`absolute inset-0 grid grid-cols-[repeat(${( heroPixelCol / 7 )},1fr)] grid-rows-[repeat(${( heroPixelCol / 7 ) / 2},1fr)]`}>
               { pixel }
               </div>
            </div>
         </Container>
      </section>
   );
}