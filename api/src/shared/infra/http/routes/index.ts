import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { farmRoutes } from "./farm.routes";
import { cowRoutes } from "./cow.routes";

const router = Router();

router.use( "/users", usersRoutes );
router.use( "/farms", farmRoutes );
router.use( "/cow", cowRoutes );

router.use( "/authenticate", authenticateRoutes );

export { router };
