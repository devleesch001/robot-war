import { Router } from 'express';
import RobotRoute from './RobotRoute.js';
import CombatRoute from './CombatRoute.js';
import TournoiRoute from './TournoiRoute.js';

const router = Router();

router.use('/robot', RobotRoute);
router.use('/battle', CombatRoute);
router.use('/tournament', TournoiRoute);

export default router;
