import Container from "@/components/aetherium/Container";
import Heading from "@/components/aetherium/Heading";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/UsersTable";
import Link from "next/link";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth(); // reads cookie directly
  const response = await fetch("http://localhost:3000/api/users", { method: "GET" });
  const data = await response.json();

  return (
    <Container className="space-y-4">
      <Heading as="h2" className="text-slate-700">
        Users
      </Heading>
      <Button>
        <Link href="./users/add">Add New User</Link>
      </Button>
      <UsersTable users={data} />
    </Container>
  );
};

export default page;
