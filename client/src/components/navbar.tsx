import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="w-10 flex-none">
				<img src={logo} className="w-full cursor-pointer" alt="" />
			</Link>

			<div className="absolute left-0 top-full mt-0 w-full border-b border-grey bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0">
				<input
					type="text"
					placeholder="Search"
					className="w-full rounded-full bg-grey p-4 pl-6 pr-[12%] placeholder:text-dark-grey md:w-auto md:pl-12 md:pr-6"
				/>
				<Search className="absolute right-[10%] top-1/2 h-6 w-6 -translate-y-3 text-2xl text-dark-grey md:pointer-events-none md:left-5" />
			</div>
		</nav>
	);
};

export default Navbar;
