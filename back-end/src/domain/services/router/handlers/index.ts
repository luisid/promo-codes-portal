import { NextFunction, Request, Response } from "express";
import joi from 'joi';
import { findServices } from "../../controller";

export type FindServicesQuery = {
  q?: string;
  take?: number;
  cursor?: number;
};

const ServiceQuerySchema = joi.object<FindServicesQuery>({
  q: joi.string().optional().allow(""),
  take: joi.number().default(30),
  cursor: joi.number().optional(),
})

export type FindServicesRequest = Request<
  never,
  never,
  never,
  FindServicesQuery,
  never
>;

/**
 *
 * @param req @type {FindServicesRequest}
 * @param res @type {Response}
 * @param next @type {NextFunction}
 * @returns {Promise<unknown>}
 */
export async function findServicesHandler(
  req: FindServicesRequest,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  const user = res.locals["user"];

  const schemaResult = ServiceQuerySchema.validate(req.query as FindServicesQuery);

  let value = { take: 20};

  if (!schemaResult.error) {
    value = schemaResult.value;
  }

  const { q, cursor, take } = value as FindServicesQuery;

  const result = await findServices({ userId: user.sub, name: q, take, cursor});

  if (result.error) {
    return next(result.error)
  }

  res.send(result.some);
}
