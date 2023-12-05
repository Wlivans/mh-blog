import { UserContext } from "@/App";
import AnimationWrapper from "@/common/pageAnimation";
import { removeSession } from "@/common/session";
import { FileEdit, Info, LogIn, Settings, UserCircle2 } from "lucide-react";
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
			<div className="absolute right-0 w-48 rounded border border-grey bg-white duration-200">
				<Link to={`/user/${username}`} className="link flex items-center gap-2 pl-8">
					<UserCircle2 className="h-5 w-5" />
					{t("profile")}
				</Link>

				<Link to="/editor" className="link flex items-center gap-2 pl-8">
					<FileEdit className="h-5 w-5" />
					<p>{t("write")}</p>
				</Link>

				<Link to={`/dashboard/blog`} className="link flex items-center gap-2 pl-8">
					<Info className="h-5 w-5" />
					{t("bashboard")}
				</Link>

				<Link to={`/settings/edit-profile`} className="link flex items-center gap-2 pl-8">
					<Settings className="h-5 w-5" />
					{t("settings")}
				</Link>

				<span className="absolute w-[100%] border-t border-grey"></span>
				<button className="w-full p-4 pl-8 text-left hover:bg-grey" onClick={signOutUser}>
					<h1 className="flex items-center gap-2 text-xl font-bold">
						<LogIn className="h-5 w-5" />
						{t("user.logout")}
					</h1>
					<p className="text-dark-grey">@{username}</p>
				</button>
			</div>
		</AnimationWrapper>
	);
};

export default UserNavigationPanel;
