import { PrismaClient, Promo } from '@prisma/client'
import { Result } from '../../../utils/types';


const prisma = new PrismaClient()

type RequiredPromoFields = {
  serviceId: number;
  code: string;
}

export type CreatePromo = {
  userId: string;
  promo: RequiredPromoFields;
}

export const ServiceNotFound = "@Promo/service-not-found";

export async function createPromo({ userId, promo }: CreatePromo): Promise<Result<Promo, Error>> {

  try {
    const service = await prisma.service.findUnique({
      where: {
        serviceId: promo.serviceId,
      }
    })

    if (!service || service.userId !== userId) {
      return {
        error: {
          name: ServiceNotFound,
          message: "Service not found"
        }
      }
    }

    const createdPromo = await prisma.promo.create({
      data: {
        code: promo.code,
        serviceId: promo.serviceId
      }
    });

    return {
      some: createdPromo
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
