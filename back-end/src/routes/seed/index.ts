import { NextFunction, Request, Response, Router } from "express";
import faker from 'faker'
import { PrismaClient } from '@prisma/client'
import { findServices } from "../../domain/services/controller";
const seedRouter = Router();

const prisma = new PrismaClient()

type Service = {
  name: string;
  description: string;
  userId: string;
}

function generateServices({ userId }: { userId: string }) {
  const services: Service[] = [];

  const names: Set<string> = new Set();

  for (let i = 0; i < 150; i++) {
    names.add(faker.internet.domainName());
  }

  names.forEach(() => {
    services.push({
      name: faker.internet.domainName(),
      description: faker.lorem.sentence(),
      userId: userId
    })
  })

  return services;
}

async function seed(req: Request, res: Response, next: NextFunction) {
  const user = res.locals["user"];

  const result = await findServices({ userId: user.sub });

  if (result.error) {
    return next(result.error);
  }

  if (result.some.length === 0) {
    const services = generateServices({ userId: user.sub });

    try {
      // Not in the controller since it isn't needed for the application - It is just a hack for demo purposes
      await prisma.service.createMany({
        data: services,
        skipDuplicates: true
      })
    } catch (e) {
      return next(e);
    }

    res.status(201);
  }

  res.send();
}

seedRouter.post("/", seed);

export { seedRouter };
