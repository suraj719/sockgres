import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export async function createUser(email: string, password: string) {
  await client.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}

export async function getUser(email: string) {
  const user = await client.user.findFirst({
    where: {
      email: email,
    },
  });
  console.log(user);
}
