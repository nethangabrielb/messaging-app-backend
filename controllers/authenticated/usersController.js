import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const usersController = (() => {
  const getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "Users fetched successfuly",
        status: 200,
        data: users,
      });
    } catch (e) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "There was a problem fetching users",
        status: 500,
      });
    }
  };

  return { getAllUsers };
})();

export default usersController;
