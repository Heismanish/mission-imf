import { faker } from "@faker-js/faker";
import prisma from "../db/prisma.js";

export const generateCodename = async (): Promise<string> => {
  let codename: string = "";
  let isUnique = false;

  while (!isUnique) {
    const partOne = faker.word.adjective();
    const partTwo = faker.animal.type();

    const finalOne = partOne.charAt(0).toUpperCase() + partOne.slice(1);
    const finalTwo = partTwo.charAt(0).toUpperCase() + partTwo.slice(1);
    codename = `The ${finalOne} ${finalTwo}`;

    const exists = await prisma.gadgets.findFirst({
      where: { codename: codename },
    });

    if (!exists) isUnique = true;
  }
  console.log(codename);
  return codename;
};
