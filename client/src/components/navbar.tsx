import { Link, Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import { FileEdit, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Navbar = () => {
	const { t } = useTranslation();

	const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

	const handleShowSearchBox = () => {
		setSearchBoxVisibility((val) => !val);
	};

	return (
		<>
			<nav className="navbar">
				<Link to="/" className="w-10 flex-none">
					<img src={logo} className="w-full cursor-pointer" alt="" />
				</Link>

				<div
					className={cn(
						"absolute left-0 top-full mt-0 w-full border border-grey bg-white px-[5vw] py-4 duration-100 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0",
						searchBoxVisibility ? "block" : "hidden",
					)}>
					<input
						type="text"
						placeholder={t("search")}
						className="w-full rounded-full bg-grey p-4 pl-6 pr-[12%] placeholder:text-dark-grey md:w-auto md:pl-12 md:pr-6"
					/>
					<Search className="absolute right-[10%] top-1/2 h-6 w-6 -translate-y-3 text-2xl text-dark-grey md:pointer-events-none md:left-5" />
				</div>

				<div className="ml-auto flex items-center gap-x-2">
					<Button variant="ghost" onClick={handleShowSearchBox} className="md:hiddeen">
						<Search className="default-icon" />
					</Button>

					<Link to="/editor" className="link hidden rounded md:flex">
						<Button variant="ghost" className="gap-2">
							<FileEdit className="default-icon" />
							<p className="text-sm">{t("write")}</p>
						</Button>
					</Link>

					<Link to="/signin" className="btn-dark">
						<Button variant="ghost" size="sm">
							{t("user.signIn")}
						</Button>
					</Link>

					<Link to="/signup" className="btn-light hidden md:block">
						<Button size="sm">{t("user.signUp")}</Button>
					</Link>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default Navbar;
