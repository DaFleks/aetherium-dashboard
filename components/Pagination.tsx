import { cn } from "@/lib/utils";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PaginationProps {
  className?: string;
}

const Pagination = (props: PaginationProps) => {
  return (
    <Container className={cn(props.className, "flex justify-between")}>
      <Select>
        <SelectTrigger className="w-fit overflow-hidden">
          <SelectValue placeholder="Page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Test">Test</SelectItem>
        </SelectContent>
      </Select>
      <Container className="space-x-4">
        <Button variant="outline" className="w-12">
          {"<<"}
        </Button>
        <Button variant="outline" className="w-12">
          {"<"}
        </Button>
        <Text as="span" className="font-semibold text-slate-600">
          1 / 10
        </Text>
        <Button variant="outline" className="w-12">
          {">"}
        </Button>
        <Button variant="outline" className="w-12">
          {">>"}
        </Button>
      </Container>
    </Container>
  );
};
export default Pagination;
