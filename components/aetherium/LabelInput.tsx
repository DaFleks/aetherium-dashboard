"use client;";

import { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Container from "./Container";

import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { useToggle } from "@/hooks/useToggle";

type LabelInputProps = {
  id: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const LabelInput = ({ id, label, ...props }: LabelInputProps) => {
  const [showPassword, handleShowPassword] = useToggle(false);

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {id !== "password" ? (
        <Input id={id} name={id} {...props} className="bg-white/50 text-slate-800 font-semibold" />
      ) : (
        <Container className="relative">
          <Input
            id={id}
            name={id}
            {...props}
            type={showPassword ? "text" : "password"}
            className={`${showPassword ? "bg-slate-800" : "bg-white/50"} ${showPassword ? "text-white" : "text-slate-800"} font-semibold`}
          />
          <Button
            type="button"
            onClick={handleShowPassword}
            variant="ghost"
            className={`absolute top-0 right-0  hover:bg-transparent ${showPassword ? "text-white hover:text-white" : "text-slate-800"}`}>
            <EyeIcon />
          </Button>
        </Container>
      )}
    </>
  );
};

export default LabelInput;
