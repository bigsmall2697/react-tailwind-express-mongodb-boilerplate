import { Request, Response } from "express";
import Target from "../../models/target";

export async function getUrls(req: Request, res: Response) {
  try {
    const targets = await Target.find();
    res.status(200).json({ targets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching targets" });
  }
}
