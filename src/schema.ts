import { array, object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
  nickname: string().default(""),
  type: string().oneOf(["admin", "user"]).default("user"),
  tags: array(string()).default(['test', 'test2']),
});

export { profileSchema };