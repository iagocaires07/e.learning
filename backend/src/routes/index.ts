import { Router } from 'express';

import usersRoute from './users.route';
import session from './session.route';
import courseRoutes from './course.route';
import lessonRoutes from './lesson.route';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/session', session);
routes.use('/course', courseRoutes);
routes.use('/lesson', lessonRoutes);

export default routes;
