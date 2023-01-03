import { Link } from 'react-router-dom';
import Nav from "./Nav";
import logo from "../../images/kp-logo.png";

export default function Header(props: any) {
   return (
   	<header className="flex justify-between items-center max-w-screen-2xl fixed left-0 right-0 z-40 mx-auto p-5 pt-8 md:pt-16 md:px-6 ">
      	<Link to="/">
         	<img className="w-16" src={logo} alt="KP Design" />
      	</Link>
        <Nav />
      </header>
   );
}