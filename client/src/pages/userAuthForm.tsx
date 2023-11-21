import InputBox from "@/components/input";
import { KeyRound, Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import userFormSchema from "./userFormSchema";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type UserAuthFormProps = {
	type: "signIn" | "signUp";
};

const UserAuthForm = ({ type }: UserAuthFormProps) => {
	const { t } = useTranslation();

	const form = useForm<z.infer<typeof userFormSchema>>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			username: "",
		},
	});

	const onSubmit = (values: z.infer<typeof userFormSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	};

	return (
		<section className="h-full pt-10">
			<div className="flex min-h-full flex-col">
				<div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10">
					<div className="space-y-4">
						<h1 className="font-gelasio mb-24 w-full text-3xl font-bold capitalize sm:text-4xl md:text-5xl">
							{t(type === "signIn" ? "welcome" : "joinUs")}
						</h1>

						{/* {type !== "signIn" && (
					<InputBox name="fullname" type="text" placeholder={t("user.fullName")} icon={User} />
				)}

				<InputBox name="email" type="email" placeholder={t("user.email")} icon={Mail} />

				<InputBox
					name="password"
					type="password"
					placeholder={t("user.password")}
					icon={KeyRound}
				/>

				<button className="btn-dark center mt-14">{t(`user.${type}`)}</button> */}
						<div className="w-full ">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
									<FormField
										control={form.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Fullname</FormLabel>
												<FormControl>
													<Input placeholder="shadcn" {...field} required={true} />
												</FormControl>
												<FormDescription>This is your public display name.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserAuthForm;
