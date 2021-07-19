import { PrismaClient, Service  } from '@prisma/client'
import { Result } from '../../../utils/types';


const prisma = new PrismaClient()

export interface FindAllServices {
  userId: string;
  name?: string;
  cursor?: number;
  take?: number;
}

export async function findServices({ userId, name, cursor, take = 15 }: FindAllServices): Promise<Result<Service[], Error>> {
  let cursorParams: {
    name?: string;
    serviceId?: number;
  } | undefined;

  if (cursor) {
    cursorParams = cursorParams || {};
    cursorParams.serviceId = cursor;
  }

  try {
    const services = await prisma.service.findMany({
      skip: cursor ? 1 : 0,
      take,
      cursor: cursorParams,
      where: {
        userId: userId,
        name: {
          contains: name
        }
      },
      include: {
        promo: true
      }
    });

    return {
      some: services
    }
  } catch (e) {
    const error: Error = e;
    return {
      error: {
        name: error.name,
        message: error.message
      }
    }
  }
}
