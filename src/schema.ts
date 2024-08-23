import { object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
  nickname: string().default(""),
  type: string().oneOf(["admin", "user"]).default("user"),
});

export { profileSchema };