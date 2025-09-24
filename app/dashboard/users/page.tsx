import Container from "@/components/aetherium/Container";
import Heading from "@/components/aetherium/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <Container>
      <Heading as="h2" className="text-slate-700">
        Users
      </Heading>
      <Button>
        <Link href="./users/add">Add New User</Link>
      </Button>
    </Container>
  );
};
export default page;
