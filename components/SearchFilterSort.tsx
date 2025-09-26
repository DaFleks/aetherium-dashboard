"use client";

import { cn } from "@/lib/utils";
import Container from "./aetherium/Container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SearchFilterSortProps {
  className?: string;
}

const SearchFilterSort = (props: SearchFilterSortProps) => {
  return (
    <Container className={cn(props.className, "grid grid-cols-6 gap-4")}>
      <Input className="col-span-4" placeholder="Search by ID, Name or Email" />
      <Button variant="outline">Filters</Button>
      <Select>
        <SelectTrigger className="w-full overflow-hidden">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Test">Test</SelectItem>
        </SelectContent>
      </Select>
    </Container>
  );
};

export default SearchFilterSort;
