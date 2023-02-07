import { Router } from 'express';
import RobotRoute from './RobotRoute.js';

const router = Router();

router.use('/robot', RobotRoute);
export default router;
