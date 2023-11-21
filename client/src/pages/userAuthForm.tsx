import InputBox from "@/components/input";
import { KeyRound, Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";

type UserAuthFormProps = {
	type: "signIn" | "signUp";
};

const UserAuthForm = ({ type }: UserAuthFormProps) => {
	const { t } = useTranslation();

	return (
		<section className="h-cover flex items-center justify-center">
			<form className="w-[80%] max-w-[400px]">
				<h1 className="mb-24 font-gelasio text-4xl capitalize">
					{t(type === "signIn" ? "welcome" : "joinUs")}
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

				<button className="btn-dark center mt-14">{t(`user.${type}`)}</button>
			</form>
		</section>
	);
};

export default UserAuthForm;
