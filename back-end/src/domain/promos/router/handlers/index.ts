import { NextFunction, Request, Response } from "express";
import joi from 'joi';
import { createPromo, ServiceNotFound } from "../../controller";

export type CreatePromoBody = {
  serviceId: number;
  code: string;
}

export type CreatePromoRequest = Request<
  never,
  never,
  CreatePromoBody,
  never,
  never
>;

const CreatePromoSchema = joi.object<CreatePromoBody>({
  serviceId: joi.number(),
  code: joi.string(),
})

/**
 *
 * @param req @type {FindServicesRequest}
 * @param res @type {Response}
 * @param next @type {NextFunction}
 * @returns {Promise<unknown>}
 */
export async function CreatePromoHandler(
  req: CreatePromoRequest,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  const user = res.locals["user"];

  const {value: promo, error } = CreatePromoSchema.validate(req.body as CreatePromoBody);

  if (error) {

    res.status(400);
    res.send({
      status: 400,
      message: "Invalid Request",
      details: error.details
    })

    return;
  }


  const result = await createPromo({ userId: user.sub, promo });

  if (result.error) {
    if (result.error.name === ServiceNotFound) {
      res.status(404);
      res.send({
        status: 404,
        message: "Service Not found"
      })

      return;
    }

    return next(result.error)
  }

  res.send(result.some);
}
