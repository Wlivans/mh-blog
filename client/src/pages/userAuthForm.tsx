import InputBox from "@/components/input";
import { KeyRound, Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import googleIcon from "../images/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "@/common/pageAnimation";
import { FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/libs/types";
import axios from "axios";
import { setSession } from "@/common/session";

type UserAuthFormProps = {
	type: "login" | "register";
};

const UserAuthForm = ({ type }: UserAuthFormProps) => {
	const { t } = useTranslation();

	const useAuthThroughServer = (serverRoot: string, formData: { [key: string]: string }) => {
		axios
			.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoot, formData)
			.then(({ data }) => {
				setSession("user", JSON.stringify(data.data));
				toast.success(data.message);
			})
			.catch((err) => {
				const { response } = err;
				const { data } = response;
				toast.error(data.message);
			});
	};

	const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const serverRoute = type === "login" ? "/login" : "/register";

		const formELe = document.getElementById("authForm") as HTMLFormElement;
		const form = new FormData(formELe!);
		const formData: any = {};

		for (let [key, value] of form.entries()) {
			formData[key] = value;
		}

		const { fullname, email, password } = formData;

		if (type === "register" && fullname.length < 3) {
			return toast.error(t("regex.fullname_length"));
		}

		if (!email?.length) {
			return toast.error(t("regex.email_length"));
		}

		if (!EMAIL_REGEX.test(email)) {
			return toast.error(t("regex.email"));
		}

		if (!PASSWORD_REGEX.test(password)) {
			return t("regex.password");
		}

		useAuthThroughServer(serverRoute, formData);
	};

	return (
		<AnimationWrapper keyValue={type}>
			<section className="h-cover flex items-center justify-center">
				<Toaster />
				<form id="authForm" className="w-[80%] max-w-[400px]">
					<h1 className="mb-24 font-gelasio text-4xl capitalize">
						{t(type === "login" ? "welcome" : "account.joinUs")}
					</h1>

					{type !== "login" && (
						<InputBox name="fullname" type="text" placeholder={t("user.fullName")} icon={User} />
					)}

					<InputBox name="email" type="email" placeholder={t("user.email")} icon={Mail} />

					<InputBox
						name="password"
						type="password"
						placeholder={t("user.password")}
						icon={KeyRound}
					/>

					<button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
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

					{type === "login" ? (
						<p className="mt-6 text-center text-xl text-dark-grey">
							{t("account.havaAccount")}? &nbsp;
							<Link to="/register" className="ml-1 text-xl text-black underline">
								{t("account.joinUs")}
							</Link>
						</p>
					) : (
						<p className="mt-6 text-center text-xl text-dark-grey">
							{t("account.alreadyMember")}? &nbsp;
							<Link to="/login" className="ml-1 text-xl text-black underline">
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
