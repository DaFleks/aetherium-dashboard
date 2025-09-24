"use client";

import Container from "../Container";
import Text from "../Text";
import "./Loading.css";

const Loading = () => {
  return (
    <Container className="absolute h-full w-full bg-black/75 top-0 left-0 z-50 flex items-center justify-center">
      <Text as="span" className="loader"></Text>
    </Container>
  );
};

export default Loading;
