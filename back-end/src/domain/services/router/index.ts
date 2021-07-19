import { Router } from 'express'
import { findServicesHandler } from './handlers'

const servicesRouter = Router();

servicesRouter.get('/', findServicesHandler);

export { servicesRouter }
