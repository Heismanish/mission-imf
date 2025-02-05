import { faker } from "@faker-js/faker";
import prisma from "../db/prisma.js";

export const generateCodename = async (): Promise<string> => {
  let codename: string = "";
  let isUnique = false;

  while (!isUnique) {
    codename = `The ${faker.word.adjective()} ${faker.animal.type()}`;

    const exists = await prisma.gadgets.findFirst({
      where: { codename: codename },
    });

    if (!exists) isUnique = true;
  }
  console.log(codename);
  return codename;
};
