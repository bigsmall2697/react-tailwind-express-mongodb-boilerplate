import { Request, Response } from "express";
import axios from "axios";
import Target from "../../models/target";

export async function createUrl(req: Request, res: Response) {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    const xFrameOptions = response.headers["x-frame-options"];
    const hsts = response.headers["strict-transport-security"];
    const csp = response.headers["content-security-policy"];

    const target = new Target({ url, xFrameOptions, hsts, csp });
    await target.save();

    res.status(200).json({ message: "Target checked and saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error checking target" });
  }
}
