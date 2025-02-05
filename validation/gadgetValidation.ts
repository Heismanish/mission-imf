import { z } from "zod";
import { GadgetStatus } from "@prisma/client"; // Import the enum from Prisma

// Validate Gadget Creation
export const gadgetSchema = z.object({
  name: z.string().min(3, "Gadget name must be at least 3 characters long"),
  status: z.nativeEnum(GadgetStatus).optional(), // Only allows enum values
});

// Validate Status Update
export const gadgetStatusSchema = z.enum([
  "AVAILABLE",
  "DEPLOYED",
  "DESTROYED",
  "DECOMMISSIONED",
]);
