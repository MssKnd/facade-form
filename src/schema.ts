import { array, object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
  nickname: string().default(""),
  type: string().oneOf(["admin", "user"]).default("user"),
  language: string().oneOf(["en", "ja"]).default("en"),
  tags: array(string()).default(['tag1', 'tag2']),
});

export { profileSchema };