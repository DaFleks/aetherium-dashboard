"use client";

import { ButtonHTMLAttributes } from "react";

import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { Button } from "./ui/button";

type SidebarBtnProps = {
  icon?: LucideIcon;
  text?: string;
  collapse: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SidebarBtn = ({ icon: Icon, text, collapse, href = "", ...props }: SidebarBtnProps) => {
  return (
    <Button
      variant="ghost"
      {...props}
      className={`mx-auto flex items-center justify-start py-6
                ${collapse ? "w-fit !hover:bg-transparent hover:text-slate-400" : "w-full hover:bg-slate-500 hover:text-white"}`}>
      <Link href={href} className="flex items-center gap-2">
        {Icon && <Icon className="!w-5 !h-5" />}
        {!collapse && text}
      </Link>
    </Button>
  );
};

export default SidebarBtn;
