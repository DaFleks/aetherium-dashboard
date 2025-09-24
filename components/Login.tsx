"use client";

import { useToggle } from "@/hooks/useToggle";

import Container from "./aetherium/Container";
import Heading from "./aetherium/Heading";
import Text from "./aetherium/Text";
import Loading from "./aetherium/Loading/Loading";
import LoginForm from "./LoginForm";

interface LoginProps {
  backgroundSrc: string;
  logo: React.ReactNode;
  infoText?: string;
}

const Login = (props: LoginProps) => {
  const [isLoading, toggleLoading] = useToggle(false);

  return (
    <Container className="grid grid-cols-2 mx-auto rounded-xl shadow-2xl overflow-hidden">
      <Container className="bg-cover" style={{ backgroundImage: `url('${props.backgroundSrc}')`, backgroundPosition: "35% 50%" }} />

      <Container className="space-y-8 p-8 bg-white/15 flex flex-col justify-center relative">
        {isLoading && <Loading />}
        <Container padded center className="bg-slate-950/50 rounded-xl flex items-center w-fit">
          {props.logo}
        </Container>

        <Heading as="h3">Welcome Back!</Heading>
        <Text className="text-sm">{props.infoText}</Text>

        <LoginForm toggleLoading={toggleLoading} />
      </Container>
    </Container>
  );
};

export default Login;
