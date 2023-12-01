import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { FileEdit, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { cn } from "@/libs/utils";

const Navbar = () => {
	const { t } = useTranslation();
	const location = useLocation();

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

				<div className="ml-auto flex items-center gap-3 md:gap-6">
					<button
						onClick={handleShowSearchBox}
						className="md:hiddeen flex h-12 w-12 items-center justify-center rounded-full bg-grey">
						<Search className="h-6 w-6 text-2xl" />
					</button>

					<Link to="/editor" className="link hidden gap-2 rounded md:flex">
						<FileEdit />
						<p>{t("write")}</p>
					</Link>

					<Link
						to="/login"
						className={cn("btn-dark py-2", location.pathname.substring(1) === "login" && "hidden")}>
						{t("user.login")}
					</Link>

					<Link
						to="/register"
						className={cn(
							"btn-light hidden py-2 md:block",
							location.pathname.substring(1) === "login" && "block",
						)}>
						{t("user.register")}
					</Link>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default Navbar;
