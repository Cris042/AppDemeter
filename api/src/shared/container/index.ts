import { container } from "tsyringe";

import "@shared/container/providers";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { IPicketRepository } from "@modules/farms/repositories/IPicketRepository";
import { PicketRepository } from "@modules/farms/infra/typeorm/repositories/PicketRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPicketRepository>(
  "PicketRepository",
   PicketRepository
);