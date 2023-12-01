import { UserContext } from "@/App";
import AnimationWrapper from "@/common/pageAnimation";
import { removeSession } from "@/common/session";
import { FileEdit } from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {
	const { t } = useTranslation();

	const {
		userAuth: { username },
		setUserAuth,
	} = useContext(UserContext) as any;

	const signOutUser = () => {
		removeSession("user");
		setUserAuth({ access_token: null });
	};

	return (
		<AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50">
			<div className="absolute right-0 w-60 border border-grey bg-white duration-200">
				<Link to="/editor" className="link flex gap-2 py-4 pl-8 md:hidden">
					<FileEdit />
					<p>{t("write")}</p>
				</Link>

				<Link to={`/user/${username}`} className="link py-4 pl-8">
					Profile
				</Link>

				<Link to={`/dashboard/blog`} className="link py-4 pl-8">
					Dashboard
				</Link>

				<Link to={`/settings/edit-profile`} className="link py-4 pl-8">
					Settings
				</Link>

				<span className="absolute w-[100%] border-t border-grey"></span>
				<button className="w-full p-4 py-4 pl-8 text-left hover:bg-grey" onClick={signOutUser}>
					<h1 className="text-xl font-bold">Log Out</h1>
					<p className="text-dark-grey">@{username}</p>
				</button>
			</div>
		</AnimationWrapper>
	);
};

export default UserNavigationPanel;
