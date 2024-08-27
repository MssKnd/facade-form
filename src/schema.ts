import { array, object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
  nickname: string().default(""),
  type: string().oneOf(["admin", "user"]).default("user"),
  language: string().oneOf(["en", "ja"]).default("en"),
  tags: array(string()).default(['test', 'test2']),
});

export { profileSchema };