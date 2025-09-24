"use client";

import { CSSProperties } from "react";

type Texts = "p" | "span";

interface ContainerProps {
  children?: React.ReactNode;
  as?: Texts;
  className?: string;
  style?: CSSProperties;
}

const Text = ({ children, as: Tag = "p", className, style }: ContainerProps) => {
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
