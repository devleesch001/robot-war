import { Router } from 'express';
// import RobotRoute from './RobotRoute.js';

const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

// router.use('/robot', RobotRoute);
export default router;
