import Container from "@/components/aetherium/Container";
import Heading from "@/components/aetherium/Heading";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/UsersTable";
import Link from "next/link";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Text from "@/components/aetherium/Text";
import SearchFilterSort from "@/components/SearchFilterSort";
import Pagination from "@/components/Pagination";
import DataTableWrapper from "@/components/DataTableWrapper";

const page = async () => {
  const response = await fetch("http://localhost:3000/api/users", { method: "GET" });
  const data = await response.json();

  return (
    <Container className="grow flex flex-col overflow-y-hidden gap-4">
      <SearchFilterSort />
      <Pagination />
      <DataTableWrapper>
        <UsersTable users={data} />
      </DataTableWrapper>
    </Container>
  );
};

export default page;
