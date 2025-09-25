import path from "path";
import { promises as fs } from "fs";
import prisma from "@/lib/prisma";

export async function saveFile(file: File, folderName: string, id: string) {
  // Generate unique file name
  const fileName = `${folderName}-${id.substring(5)}.${file.name.split(".")[1]}`;
  const filePath = path.join(process.cwd(), "public", folderName, fileName);

  // Save file locally
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  //  Update the DB with the URL of the file
  switch (folderName) {
    case "avatars":
      await prisma.user.update({
        where: { id: id },
        data: {
          avatarUrl: `/${folderName}/${fileName}`,
        },
      });
      break;
  }
}
