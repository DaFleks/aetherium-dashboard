"use client";

import Container from "./aetherium/Container";

interface DataTableWrapperProps {
  children: React.ReactNode;
}

const DataTableWrapper = (props: DataTableWrapperProps) => {
  return (
    <Container className="grow overflow-y-auto relative">
      {props.children}
      <Container className="sticky bottom-0 w-full h-[75px] -mt-[25px] bg-gradient-to-t from-white to-transparent" />
    </Container>
  );
};

export default DataTableWrapper;
