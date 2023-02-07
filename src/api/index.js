import { Router } from 'express';
import RobotRoute from './RobotRoute.js';
import CombatRoute from './CombatRoute.js';

const router = Router();

router.use('/robot', RobotRoute);
router.use('/combat', CombatRoute);
export default router;
