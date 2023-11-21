import * as z from "zod";

const userFormSchema = z.object({
	username: z.string().min(2).max(50),
});

export default userFormSchema;
