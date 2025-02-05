import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/generateToken.js";
import { loginSchema, registerSchema } from "../validation/userValidation.js";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, role } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      res.status(400).send("Username is already taken");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const assignedRole = role || "agent";

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        role: assignedRole,
      },
    });

    if (user) {
      generateToken(user.id, res);

      res.status(201).json({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      return;
    } else {
      res.status(500).send("Invalid user data");
      return;
    }
  } catch (error: unknown) {
    console.error("Error signing up user:", error);
    res.status(500).send({ error: "Internal Server Error" });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: "Password is incorrect" });
      return;
    }

    generateToken(user.id, res); // sets cookies before response

    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return;
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie("imfAgent");
    res.status(200).json({ message: "Logout successful" });
    return;
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
