import { MouseEvent, useState, useRef, RefObject } from "react";
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import FocusTrap from "focus-trap-react";

const tile:any[] = [];

for( let i = 0; i < 16; i++ ) {
	tile.push( <div className="tile" key={i} /> );
}

export default function Nav( props: any ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const trailer = useRef<RefObject<HTMLButtonElement> | any>();

  	const toggleMenu = ( e: MouseEvent ) => {
  		setIsMenuOpen( ( state ) => {
			if( state ) {
				trailer.current.style.visibility = 'hidden';
      		trailer.current.classList.remove( 'active' );
	   	}
	  		return !state;
		});
   }

  	const enterTrail = ( e: MouseEvent ) => {
		const x = e.clientX,
	      	y = e.clientY;
	    // console.log( 'x', x, 'y', y );

		if( !trailer.current ) return;
		trailer.current.style.visibility = 'visible';
		trailer.current.classList.add( 'active' );
		trailer.current.style.left = `${x}px`
		trailer.current.style.top = `${y}px`
  	}

  	const existTrail = ( e: MouseEvent ) => {
		if( !trailer.current ) return;
		trailer.current.style.display = 'none';
		setTimeout(() => {
			trailer.current.style.display = '';
			trailer.current.style.visibility = 'hidden';
			trailer.current.classList.remove( 'active' );
		}, 0);
  	}

  return (
	<FocusTrap active={isMenuOpen}>
		<div className="relative">
			<div id="trail" onClick={toggleMenu} onMouseMove={enterTrail} onMouseLeave={existTrail} aria-hidden="true" className={`fixed inset-0 transition-all duration-300 ease-in bg-black/70 opacity-0${isMenuOpen ? " active" : " invisible"}`}>
				<button id="trailer" className="absolute text-black text-3xl flex justify-center items-center" aria-label="close menu" ref={trailer}>{<RxCross2 />}</button>
			</div>
			<div id="menu-tile-container" className={`absolute right-[-5px] top-[-20px] md:top-[-40px] md:right-[-25px] lg:right[-40px] pt-28 px-12 md:px-20 pb-12${isMenuOpen ? " active" : " invisible"}`}>
				<div className={`menu-tile absolute right-0 top-0 h-full`}>	
					{tile}
				</div>
				<div id="menu-container" className="relative z-10 text-black">
					<ul className="text-4xl md:text-5xl font-medium space-y-5 pb-10 border-b border-gray-300">
						<li>
							<Link className="w-full inline-block" to="/" onClick={toggleMenu}>Home</Link>
						</li>
						<li>
							<Link className="w-full inline-block" to="/about" onClick={toggleMenu}>About</Link>
						</li>
						<li>
							<Link className="w-full inline-block" to="/work" onClick={toggleMenu}>Work</Link>
						</li>
						<li>
							<Link className="w-full inline-block" to="#" onClick={toggleMenu}>Blog</Link>
						</li>
					</ul>
					<p className="mt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
					Lorem, ipsum sit amet.</p>
				</div>
			</div>
			<button
			id="menu-btn"
			className="flex flex-wrap relative right-[10px] md:right-0"
			title="menu button"
			aria-label="menu button"
			onClick={toggleMenu}>
			<div className="tile"></div>
			<div className="tile"></div>
			<div className="tile"></div>
			<div className="tile"></div>
		</button>
		</div>
	</FocusTrap>
  );
}
