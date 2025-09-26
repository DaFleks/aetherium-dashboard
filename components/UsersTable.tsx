"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Text from "./aetherium/Text";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { deleteUser } from "@/lib/api/fetch/fetchUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UsersTableProps {
  users: unknown;
}

const UsersTable = (props: UsersTableProps) => {
  if (props.users === undefined) props.users = [];

  const router = useRouter();

  const handleDeleteUser = async (id: string) => {
    deleteUser(id);
    router.refresh();
    toast.success("User deleted!");
  };

  return (
    <Table>
      <TableCaption>A list of the users in the database.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox className="mx-auto block" />
            </TableCell>
            <TableCell>
              <Avatar className="mx-auto">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              <Text>
                {user.avatar}
                {user.firstName} {user.lastName}
              </Text>
            </TableCell>
            <TableCell>
              <Text>
                <Link className="underline" href={`mailto:${user.email}`}>
                  {user.email}
                </Link>
              </Text>
            </TableCell>
            <TableCell className="text-center">
              <Text>{user.role}</Text>
            </TableCell>
            <TableCell>
              <Button variant="outline" className="flex mx-auto">
                <PencilIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="flex mx-auto"
                onClick={() => {
                  handleDeleteUser(user.id);
                }}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
