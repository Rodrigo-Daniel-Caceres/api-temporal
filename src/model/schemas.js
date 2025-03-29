import { object, string } from "yup";

export const registerBodySchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  image: string().url().required(),
  backgroundImage: string().required(),
})
  .noUnknown(true)
  .strict();

export const loginBodySchema = object({
  email: string().email().required(),
  password: string().required(),
})
  .noUnknown(true)
  .strict();
