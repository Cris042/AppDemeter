import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { picketUsed } from "./picketUsed.routes";
import { usersRoutes } from "./users.routes";
import { farmRoutes } from "./farm.routes";
import { cowRoutes } from "./cow.routes";

const router = Router();

router.use( "/cow", cowRoutes );
router.use( "/farms", farmRoutes );
router.use( "/users", usersRoutes );
router.use( "/picketUsed",picketUsed )
router.use( "/authenticate", authenticateRoutes );

export { router };
