import { Router } from "express";
import { CreateFarmsController } from "@modules/farms/useCases/createFarms/CreateFarmsController";

const farmRoutes = Router();

const createFarmsController = new CreateFarmsController();
farmRoutes.post( "/backup", createFarmsController.handle );

export { farmRoutes };
