import { clsx, type ClassValue } from "clsx";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AuthenticateResponse = {
  error: string | undefined;
  code: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
  message?: string;
};

export async function authenticateLogin(email: string, password: string): Promise<AuthenticateResponse> {
  return new Promise(async (resolve) => {
    const response: AuthenticateResponse = await signIn("credentials", { email, password, redirect: false });

    if (response.error) resolve({ ...response, message: "There was an error, please contact an admin." });

    resolve(response);
  });
}
