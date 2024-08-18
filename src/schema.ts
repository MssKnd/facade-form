import { object, string } from "yup";

const profileSchema = object({
  name: string().required().default(""),
});

export { profileSchema };