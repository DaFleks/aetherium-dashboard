"use client";

import { cn } from "@/lib/utils";
import Container from "../Container";
import Text from "../Text";
import "./Loading.css";

type LoadingVariant = "absolute" | "fixed";

interface LoadingProps {
  variant?: LoadingVariant;
  className?: string;
}

const Loading = ({ variant = "fixed", className, ...props }: LoadingProps) => {
  return (
    <Container
      {...props}
      className={cn(variant, className, "h-full w-full bg-black/75 top-0 left-0 z-50 flex items-center justify-center")}>
      <Text as="span" className="loader"></Text>
    </Container>
  );
};

export default Loading;
