"use client";

import { ButtonHTMLAttributes } from "react";

import { LucideIcon } from "lucide-react";

import { Button } from "./ui/button";

type NavButtonProps = {
  icon?: LucideIcon;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const NavButton = ({ icon: Icon, children, ...props }: NavButtonProps) => {
  return (
    <Button {...props} variant="ghost" className="text-slate-600 h-fit">
      {Icon && <Icon className="!w-5 !h-5" />}
      {children}
    </Button>
  );
};

export default NavButton;
