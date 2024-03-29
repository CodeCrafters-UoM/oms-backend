const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(data) {
  console.log("data", data);
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: data.user.username,
      },
    });
    console.log(existingUser);
    if (existingUser) {
      throw new Error("Username already exists");
    }
    console.log("data.user", data.user);
    const newUser = await prisma.user.create({
      data: {
        username: data.user.username,
        password: data.user.password,
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
      },
    });
    console.log("New user created:", newUser);
    if (!newUser) {
      throw new Error("Error creating user");
    }

    if (newUser.role === Role.ADMIN) {
      const admin = await prisma.admin.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });

      if (!admin) {
        throw new Error("Error creating admin");
      }

      return admin;
    }

    if (newUser.role === Role.SELLER) {
      const seller = await prisma.seller.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
          businessName: data.seller.businessName,
          contactNumber: data.seller.contactNumber,
        },
      });

      if (!seller) {
        throw new Error("Error creating seller");
      }

      return seller;
    }
  } catch (error) {
    throw new Error("Error creating user:", error);
  }
}
async function getAllUsers() {
  return prisma.user.findMany();
}

async function login(req) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.username,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(req.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "20s",
      });

      const formattedUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        image: user.image,
      };

      return { token, user: formattedUser };
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    throw new Error("Error logging in:", error);
  }
}

module.exports = {
  getAllUsers,
  register,
  login,
};
