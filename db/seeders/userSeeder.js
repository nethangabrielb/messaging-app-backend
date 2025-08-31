import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const users = [
  {
    email: "wanglo@gmail.com",
    username: "wanglo",
    password: "wanglo123",
    status: "ONLINE",
  },
  {
    email: "dio@gmail.com",
    username: "kono dio da!",
    password: "diosamathegoat",
    status: "BUSY",
  },
  {
    email: "alaboiegmail.com",
    username: "alaboie",
    password: "alaboie123",
    status: "OFFLINE",
  },
  {
    email: "nethberns23gmail.com",
    username: "neth",
    password: "nethangwapo",
  },
];

await prisma.user.createMany({
  data: users,
});
