"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogInIcon } from "lucide-react";

import { Button } from "./ui/button";

import { toast } from "sonner";

import { authenticateLogin } from "@/lib/utils";

import googleIcon from "@/public/icons/google.png";
import githubIcon from "@/public/icons/github.png";

import Container from "./aetherium/Container";
import LabelInput from "./aetherium/LabelInput";
import OAuthButton from "./aetherium/OAuthButton";

const LoginForm = ({ toggleLoading }: { toggleLoading: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleLoading();

    const response = await authenticateLogin(email, password);

    if (response.message) {
      handleReset();
      toggleLoading();
      toast.error("The credentials you entered don't match our records.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Container className="space-y-2">
        <LabelInput
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
          type="email"
          required
        />
      </Container>

      <Container className="space-y-2">
        <LabelInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="password"
          required
          minLength={8}
          maxLength={32}
        />
      </Container>

      <Link href="#" className="float-end underline text-sm">
        Forgot password?
      </Link>

      <Button variant="secondary" type="submit" className="w-full">
        <LogInIcon />
        Sign In
      </Button>

      <Container className="grid grid-cols-2 gap-2">
        <OAuthButton iconSrc={googleIcon.src} text="Sign in with Google" />
        <OAuthButton iconSrc={githubIcon.src} text="Sign in with GitHub" />
      </Container>
    </form>
  );
};

export default LoginForm;
