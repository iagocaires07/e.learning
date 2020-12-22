import { Router } from 'express';

import verifyAuthentication from '../middlewares/verifyAuthentication';

import CreateLessonService from '../services/CreateLessonService';

const lessonRoutes = Router();
lessonRoutes.use(verifyAuthentication);

lessonRoutes.post('/', async (request, response) => {
  try {
    const { name, duration, description, course_id, video_id } = request.body;

    const createLesson = new CreateLessonService();

    const lesson = await createLesson.execute({
      name,
      duration,
      description,
      course_id,
      video_id,
    });

    return response.status(200).json(lesson);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default lessonRoutes;
