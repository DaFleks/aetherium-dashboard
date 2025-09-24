import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import Container from "@/components/aetherium/Container";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });

  return (
    <Container className="bg-gradient-to-r from-gray-300 to-slate-400 h-full flex items-center">
      <Container center className="w-2/3 h-[90%] bg-white/25 border-slate-300 border p-2 rounded-xl shadow-xl shadow-slate-400">
        <Container center className="border w-full h-full rounded-xl  relative overflow-hidden flex flex-col border-slate-300">
        <Navbar name={`${user!.firstName} ${user!.lastName}`} email={user!.email} />

        <Container className="flex grow">
          <Sidebar />
          <Container className="bg-white/90 grow w-full !p-6">{children}</Container>
        </Container>
      </Container>
      </Container>
    </Container>
  );
};

export default layout;
