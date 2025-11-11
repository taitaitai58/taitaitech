import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "お名前を入力してください。" })
    .max(100, { message: "お名前は100文字以内で入力してください。" }),
  email: z
    .string()
    .trim()
    .email({ message: "有効なメールアドレスを入力してください。" })
    .max(320, { message: "メールアドレスは320文字以内で入力してください。" }),
  organization: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => value.length <= 120, {
      message: "所属は120文字以内で入力してください。",
    }),
  message: z
    .string()
    .trim()
    .min(1, { message: "ご相談内容を入力してください。" })
    .max(4000, { message: "ご相談内容は4000文字以内で入力してください。" }),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

