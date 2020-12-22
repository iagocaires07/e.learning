import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateCourseService from '../services/CreateCourseService';
import UpdateCourseService from '../services/UpdateCourseService';
import UpdateCourseImageService from '../services/UpdateCourseImageService';
import ListCoursesService from '../services/ListCoursesService';
import ListEspecificClasses from '../services/ListEspecificClasses';

import verifyAuthentication from '../middlewares/verifyAuthentication';

const upload = multer(uploadConfig);

const courseRoutes = Router();

courseRoutes.use(verifyAuthentication);

courseRoutes.post('/', upload.single('image'), async (request, response) => {
  try {
    const { name } = request.body;

    const createCourse = new CreateCourseService();

    const course = await createCourse.execute({
      user_id: request.user.id,
      name,
      image: request.file.filename,
    });

    return response.status(200).json(course);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

courseRoutes.put('/update/:id', async (request, response) => {
  try {
    const { name } = request.body;
    const { id } = request.params;

    const updateCourse = new UpdateCourseService();

    const courseUpdate = await updateCourse.execute({
      id,
      user_id: request.user.id,
      name,
    });

    return response.status(200).json(courseUpdate);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

courseRoutes.patch(
  '/update/image/:id',
  upload.single('image'),
  async (request, response) => {
    try {
      const updateCourseImage = new UpdateCourseImageService();

      const { id } = request.params;

      const course = await updateCourseImage.execute({
        id,
        imageFile: request.file.filename,
      });

      return response.status(200).json(course);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

courseRoutes.get('/', async (request, response) => {
  try {
    const listCourses = new ListCoursesService();

    const couses = await listCourses.all();

    return response.status(200).json(couses);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

courseRoutes.get('/:course_id/lesson', async (request, response) => {
  try {
    const { course_id } = request.params;

    const listEspecificClasses = new ListEspecificClasses();

    const lessons = await listEspecificClasses.execute(course_id);

    return response.status(200).json(lessons);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default courseRoutes;
