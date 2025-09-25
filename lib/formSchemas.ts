import z from "zod";

const AVATAR_MAX_FILE_SIZE = 5_000_000; // 5 MB
const AVATAR_ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"];
// const ALLOWED_FILE_TYPES_DOC = ["application/pdf", "image/png", "image/jpeg"];

export const userSchema = z.object({
  email: z.email().min(1, { error: "A valid email address is required." }),
  password: z
    .string()
    .min(8, { error: "Password must be 8 or more characters." })
    .max(32, { error: "Password must be 32 or less characters." }),
  firstName: z.string().min(1, { error: "First name must have at least 1 letter." }).max(50),
  lastName: z.string().min(1, { error: "Last name must have at least 1 letter." }).max(50),
  role: z.enum(["ADMIN", "MODERATOR", "GUEST"]),
  permissions: z.string().optional(),
  streetAddress: z.string().max(50, { error: "Street address must be 50 or less characters" }).optional(),
  city: z.string().max(28, { error: "City must be 28 or less characters" }).optional(),
  province: z.string().max(28, { error: "Province must be 28 or less characters" }).optional(),
  postalCode: z.string().max(7, { error: "Postal Code must be 7 or less characters" }).optional(),
  phoneNumber: z.string().max(32, { error: "Phone number must be 32 or less characters." }).optional(),
  avatar: z
    .any()
    .refine((f) => (f instanceof File ? f.size <= AVATAR_MAX_FILE_SIZE : true), {
      message: `Avatar must be <= ${AVATAR_MAX_FILE_SIZE / 1_000_000} MB`,
    })
    .refine((f) => (f instanceof File ? AVATAR_ALLOWED_FILE_TYPES.includes(f.type) : true), {
      message: "Avatar PNG or JPG",
    })
    .optional(),
});
