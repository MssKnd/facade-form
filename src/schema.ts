import { object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
  type: string().oneOf(["admin", "user"]).default("user"),
});

export { profileSchema };