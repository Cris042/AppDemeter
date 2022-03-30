import "@shared/container/providers";

import { container } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { IPicketRepository } from "@modules/farms/repositories/IPicketRepository";
import { PicketRepository } from "@modules/farms/infra/typeorm/repositories/PicketRepository";

import { ICowRepository } from "@modules/cow/repositories/ICowRepository";
import { CowRepository } from "@modules/cow/infra/typeorm/repositories/CowRepository";

import { IPicketUsedRepository } from "@modules/farms/repositories/IPicketUsedRepository";
import { PicketUsedRepository } from "@modules/farms/infra/typeorm/repositories/PicketUsedRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPicketRepository>(
  "PicketRepository",
   PicketRepository
);

container.registerSingleton<ICowRepository>(
  "CowRepository",
   CowRepository
);

container.registerSingleton<IPicketUsedRepository>(
  "PicketUsedRepository",
   PicketUsedRepository
);