import { Router } from "express";
import checkTargetController from "../controllers/check-target";

const checkTargetRouter = Router();

checkTargetRouter.post("/", checkTargetController.createUrl);
checkTargetRouter.get("/", checkTargetController.getUrls);

export default checkTargetRouter;
