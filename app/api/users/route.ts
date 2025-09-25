import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { saveFile } from "@/lib/api/route/routeHelpers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //  Grab the form data from the request
    const formData = await req.formData();

    // Create a hashed password based on the passowrd string passed
    const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);

    //  Create the user
    const user = await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        hashedPassword: hashedPassword,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        role: "GUEST",
        permissions: formData.get("permissions") as string,
        address: {
          create: {
            street: formData.get("streetAddress") as string,
            city: formData.get("city") as string,
            province: formData.get("province") as string,
            postalCode: formData.get("postalCode") as string,
            country: "Canada",
            phoneNumber: formData.get("phoneNumber") as string,
          },
        },
        createdBy: "Admin",
      },
    });

    //  If an avatar was provided, rename and save the file while updating the user's avatar url string
    if (formData.get("avatar") as File) saveFile(formData.get("avatar") as File, "avatars", user.id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") return NextResponse.json({ message: "A user with that email already exists.", status: 201 });
    }

    return NextResponse.json({ message: "There was an error, please contact an admin.", status: 201 });
  }

  return NextResponse.json({ message: "User Created!", status: 200 });
}
