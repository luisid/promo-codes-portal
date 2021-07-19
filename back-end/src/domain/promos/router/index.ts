import { Router } from 'express'
import { CreatePromoHandler } from './handlers'

const promosRouter = Router();

promosRouter.post('/', CreatePromoHandler);

export { promosRouter }
