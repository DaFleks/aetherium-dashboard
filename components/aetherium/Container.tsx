"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Containers =
  | "div" | "header" | "nav" | "main" | "section"
  | "article" | "aside" | "footer";

type ContainerProps<T extends Containers = "div"> = {
  as?: T;
  padded?: boolean;
  center?: boolean;
  // including class name here and then omitting it so we can use our own prop. Apparently it’s cleaner if we’re merging class names with CN
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "ref" | "className">;

const Container = <T extends Containers = "div">({
  as,
  padded,
  center,
  className,
  ...rest
}: ContainerProps<T>) => {
  const Comp = (as ?? "div") as React.ElementType;

  return (
    <Comp
      {...rest}
      className={cn(className, padded && "p-4", center && "mx-auto")}
    />
  );
};

export default Container;