"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Container from "./Container";

interface OAuthButtonProps {
  iconSrc?: string;
  text?: string;
}

const OAuthButton = ({ iconSrc = "", text }: OAuthButtonProps) => {
  return (
    <Button variant="secondary" type="submit" className="flex items-center gap-2">
      <Container className="relative w-4 aspect-square">
        <Image src={iconSrc} alt="Github Icon" fill />
      </Container>
      {text}
    </Button>
  );
};

export default OAuthButton;
