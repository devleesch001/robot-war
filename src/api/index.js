import { Router } from 'express';
import RobotRoute from './RobotRoute.js';
import CombatRoute from './CombatRoute.js';
import TournoiRoute from './TournoiRoute.js';
import RobotStatRoute from './RobotStatRoute.js';
import OrdealRoute from './OrdealRoute.js';

const router = Router();

router.use('/robot', RobotRoute);
router.use('/robot/stat', RobotStatRoute);
router.use('/battle', CombatRoute);
router.use('/tournament', TournoiRoute);

router.use('/ordeal', OrdealRoute);

export default router;
