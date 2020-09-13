// src/routes/index.ts
import { Router } from 'express';
import appoitmentsRouter from './appointments.routes'
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appoitments', appointmentsRouter)

export default routes;
