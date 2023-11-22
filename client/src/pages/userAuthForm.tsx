import InputBox from "@/components/input";
import { KeyRound, Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import googleIcon from "../images/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "@/common/pageAnimation";

type UserAuthFormProps = {
	type: "signIn" | "signUp";
};

const UserAuthForm = ({ type }: UserAuthFormProps) => {
	const { t } = useTranslation();

	return (
		<AnimationWrapper keyValue={type}>
			<section className="h-cover flex items-center justify-center">
				<form className="w-[80%] max-w-[400px]">
					<h1 className="font-gelasio mb-24 text-4xl capitalize">
						{t(type === "signIn" ? "welcome" : "account.joinUs")}
					</h1>

					{type !== "signIn" && (
						<InputBox name="fullname" type="text" placeholder={t("user.fullName")} icon={User} />
					)}

					<InputBox name="email" type="email" placeholder={t("user.email")} icon={Mail} />

					<InputBox
						name="password"
						type="password"
						placeholder={t("user.password")}
						icon={KeyRound}
					/>

					<button className="btn-dark center mt-14" type="submit">
						{t(`user.${type}`)}
					</button>

					<div className="relative my-10 flex w-full items-center gap-2 font-bold uppercase text-black opacity-10">
						<hr className="w-1/2 border-black" />
						<p>{t("or")}</p>
						<hr className="w-1/2 border-black" />
					</div>

					<button className="btn-dark center flex w-[90%] items-center justify-center gap-4">
						<img src={googleIcon} className="h-5 w-5" alt="" />
						{t("account.google")}
					</button>

					{type === "signIn" ? (
						<p className="text-dark-grey mt-6 text-center text-xl">
							{t("account.havaAccount")}? &nbsp;
							<Link to="/signUp" className="ml-1 text-xl text-black underline">
								{t("account.joinUs")}
							</Link>
						</p>
					) : (
						<p className="text-dark-grey mt-6 text-center text-xl">
							{t("account.alreadyMember")}? &nbsp;
							<Link to="/signIn" className="ml-1 text-xl text-black underline">
								{t("account.signHere")}
							</Link>
						</p>
					)}
				</form>
			</section>
		</AnimationWrapper>
	);
};

export default UserAuthForm;
