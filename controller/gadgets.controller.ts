import { Request, Response } from "express";
import {
  gadgetSchema,
  gadgetStatusSchema,
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
    });

    const gadgetsWithProbability = gadgets.map((gadget) => {
      const probablity = Math.floor(Math.random() * 100);
      const name = `${gadget.codename} - ${probablity}% success probability`;
      return { ...gadget, missionSuccessProbability: name };
    });

    console.log(gadgetsWithProbability);
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
