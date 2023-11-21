import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { useState } from "react";

type InputBoxProps = {
	id: string;
	name: string;
	type?: string;
	value: string;
	placeholder?: string;
	icon?: LucideIcon;
};

const InputBox = ({ id, name, type = "text", value, placeholder, icon: Icon }: InputBoxProps) => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const reversePasswordVisibility = () => {
		setPasswordVisible((prev) => !prev);
	};

	return (
		<div className="relative mb-4 w-[100%]">
			<input
				id={id}
				name={name}
				type={type === "password" ? (passwordVisible ? "text" : "password") : type}
				placeholder={placeholder}
				defaultValue={value}
				className="input-box"
			/>

			{Icon && <Icon className="input-icon" />}

			{type === "password" ? (
				passwordVisible ? (
					<EyeOff
						onClick={reversePasswordVisibility}
						className="input-icon left-[auto] right-4 cursor-pointer"
					/>
				) : (
					<Eye
						onClick={reversePasswordVisibility}
						className="input-icon left-[auto] right-4 cursor-pointer"
					/>
				)
			) : (
				""
			)}
		</div>
	);
};

export default InputBox;
