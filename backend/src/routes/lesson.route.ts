import { Router } from 'express';

import verifyAuthentication from '../middlewares/verifyAuthentication';
import CreateLessonService from '../services/CreateLessonService';
import UpdateLessonService from '../services/UpdateLessonService';

const lessonRoutes = Router();
lessonRoutes.use(verifyAuthentication);

lessonRoutes.post('/', async (request, response) => {
  try {
    const { name, duraction, description, course_id, video_id } = request.body;

    const createLesson = new CreateLessonService();

    const lesson = await createLesson.execute({
      name,
      duraction,
      description,
      course_id,
      video_id,
    });

    return response.status(200).json(lesson);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

lessonRoutes.put('/:id', async (request, response) => {
  try {
    const { name, duraction, description } = request.body;
    const { id } = request.params;

    const updateLesson = new UpdateLessonService();

    const lessonUpgrade = await updateLesson.execute({
      id,
      name,
      duraction,
      description,
    });

    return response.status(200).json(lessonUpgrade);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default lessonRoutes;
