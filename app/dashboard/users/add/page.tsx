import Heading from "@/components/aetherium/Heading";
import Text from "@/components/aetherium/Text";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/UserForm";

const page = () => {
  return (
    <>
      <Heading as="h4" className="text-slate-700">
        Users
      </Heading>
      <Separator className="mt-4 mb-8" />
      <UserForm />
    </>
  );
};
export default page;
