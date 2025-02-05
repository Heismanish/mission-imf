import { Request, Response } from "express";
import {
  gadgetSchema,
  gadgetStatusSchema,
  updateGadgetSchema,
} from "../validation/gadgetValidation.js";
import { ZodError } from "zod";
import prisma from "../db/prisma.js";
import { generateCodename } from "../util/generateCodename.js";

export const getGadgets = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    let validStatus;

    // validate status
    if (status) {
      validStatus = gadgetStatusSchema.parse(
        status.toString().toUpperCase() as string
      );
    }

    // apply filter only if status exists
    const gadgets = await prisma.gadgets.findMany({
      where: validStatus ? { status: validStatus } : {},
      select: {
        id: true,
        name: true,
        status: true,
        codename: true,
      },
    });

    const gadgetsWithProbability = gadgets.map((gadget) => {
      const probablity = Math.floor(Math.random() * 100);
      const name = `${gadget.codename} - ${probablity}% success probability`;
      return { ...gadget, missionSuccessProbability: name };
    });

    res.status(200).json(gadgetsWithProbability);
  } catch (error) {
    console.log("Error in getGadgets controller", error);
    if (error instanceof ZodError) {
      res.status(500).json({ error: JSON.parse(error.message)[0].message });
      return;
    }
    res.status(500).json({ error: "Internal Server Error", message: error });
  }
};

export const addGadgets = async (req: Request, res: Response) => {
  try {
    const { name, status } = gadgetSchema.parse(req.body);

    const codename = await generateCodename();
    const gadget = await prisma.gadgets.create({
      data: {
        name,
        status,
        codename,
      },
    });

    res.status(201).json({
      message: "Gadget added successfully",
      gadget,
    });
    return;
  } catch (error) {
    console.log("Error in addGadgets controller", error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: JSON.parse(error.message)[0].message });
      return;
    }
    res.status(500).json({ error: "Internal Server Error", message: error });
  }
};

export const updateGadgets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = updateGadgetSchema.parse(req.body);
    const { name, status } = validatedData;

    // check if gadget exists
    const existingGadget = await prisma.gadgets.findUnique({ where: { id } });
    if (!existingGadget) {
      res.status(404).json({ error: "Gadget not found" });
      return;
    }

    // check if new name already exists(as we have name as a unique field)
    const isNameUsed = await prisma.gadgets.findFirst({
      where: { name },
    });

    if (isNameUsed) {
      res.status(404).json({ error: "This name has already been used" });
      return;
    }

    const updatedGadget = await prisma.gadgets.update({
      where: { id },
      data: { name: name || existingGadget.name, status: status },
    });

    res.status(201).json({ message: "Updated successfully", updatedGadget });
    return;
  } catch (error) {
    console.log("Error in updateGadgets controller", error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: JSON.parse(error.message)[0].message });
      return;
    }
    res.status(500).json({ error: "Internal Server Error", message: error });
    return;
  }
};

export const deleteGadgets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedGadget = await prisma.gadgets.update({
      where: { id },
      data: { status: "DECOMMISSIONED", decommissionedAt: new Date() },
    });
    res
      .status(200)
      .json({ message: "Gadget decommissioned successfully", updatedGadget });
  } catch (error) {
    console.error("Error in deleteGadgets controller:", error);

    res.status(500).json({ error: "Internal Server Error", message: error });
    return;
  }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6 digit confirmation code
    const updatedGadget = await prisma.gadgets.update({
      where: { id },
      data: { status: "DESTROYED" },
    });

    res.status(200).json({
      message: "Gadget decommissioned successfully",
      confirmationCode,
    });
  } catch (error) {
    console.error("Error in selfDestructGadget controller:", error);
    res.status(500).json({ error: "Internal Server Error", message: error });
    return;
  }
};
