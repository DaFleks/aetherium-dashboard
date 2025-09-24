"use client";

import {
  ChartBarIncreasingIcon,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PackageIcon,
  TagIcon,
  UserCircle2Icon,
} from "lucide-react";
import Container from "./aetherium/Container";
import SidebarBtn from "./SidebarBtn";
import { useToggle } from "@/hooks/useToggle";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [collapse, handleCollapse] = useToggle(true);
  return (
    <Container
      as="aside"
      className={` ${
        !collapse && "w-1/4 px-4"
      } py-4 grow bg-slate-100 text-slate-500 font-semibold relative space-y-6  shadow-xl shadow-slate-300`}>
      <Button variant="ghost" className="absolute top-[49.75%] -right-5 hover:bg-transparent hover:text-slate-400" onClick={handleCollapse}>
        {collapse ? (
          <ChevronRightCircleIcon className="bg-slate-100 rounded-full" />
        ) : (
          <ChevronLeftCircleIcon className="bg-slate-100 rounded-full" />
        )}
      </Button>

      <SidebarBtn href="/dashboard/products" icon={LayoutDashboardIcon} text="Dashboard" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={TagIcon} text="Products" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={CreditCardIcon} text="Customers" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={UserCircle2Icon} text="Users" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={PackageIcon} text="Orders" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={CircleDollarSignIcon} text="Sales" collapse={collapse} />
      <SidebarBtn href="/dashboard/products" icon={ChartBarIncreasingIcon} text="Analytics" collapse={collapse} />
      <Separator className={`bg-slate-300 mx-auto ${collapse ? "!w-[50%]" : "!w-[90%]"}`} />
      <SidebarBtn
        icon={LogOutIcon}
        text="Sign Out"
        collapse={collapse}
        onClick={() => {
          signOut();
        }}
      />
    </Container>
  );
};

export default Sidebar;
