import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const usersController = (() => {
  const getAllUsers = async (req, res) => {
    const { tokenHolder, filter, search } = req.query;
    if (tokenHolder === "true") {
      const user = await prisma.user.findMany({
        where: {
          id: req.user.id,
        },
      });
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: user,
      });
    } else if (search && filter) {
      let users = null;
      if (filter !== "ALL") {
        if (filter !== "OFFLINE") {
          users = await prisma.user.findMany({
            where: {
              status: filter,
              id: {
                not: req.user.id,
              },
              username: {
                contains: search,
              },
            },
          });
        } else {
          users = await prisma.user.findMany({
            where: {
              OR: [{ status: filter }, { status: null }],
              id: {
                not: req.user.id,
              },
              username: {
                contains: search,
              },
            },
          });
        }
      } else {
        users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
            username: {
              contains: search,
            },
          },
        });
      }
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else if (filter) {
      let users = null;
      if (filter !== "ALL") {
        if (filter !== "OFFLINE") {
          users = await prisma.user.findMany({
            where: {
              status: filter,
              id: {
                not: req.user.id,
              },
            },
          });
        } else {
          users = await prisma.user.findMany({
            where: {
              OR: [{ status: filter }, { status: null }],
              id: {
                not: req.user.id,
              },
            },
          });
        }
      } else {
        users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
          },
        });
      }
      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else if (search) {
      let users = null;

      users = await prisma.user.findMany({
        where: {
          id: {
            not: req.user.id,
          },
          username: {
            contains: search,
          },
        },
      });

      return res.status(200).json({
        code: "FETCH_SUCCESS",
        message: "User fetched successfuly",
        status: 200,
        data: users,
      });
    } else {
      try {
        const users = await prisma.user.findMany({
          where: {
            id: {
              not: req.user.id,
            },
          },
        });
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
          data: e,
        });
      }
    }
  };

  return { getAllUsers };
})();

export default usersController;
