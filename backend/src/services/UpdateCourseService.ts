import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import Courses from '../models/Courses';

interface IRequest {
  id: string;
  user_id: string;
  name?: string;
}

class UpdateCourseService {
  public async execute({ id, user_id, name }: IRequest): Promise<Courses> {
    const coursesRepositorie = getRepository(Courses);

    const chekCourseId = isUuid(id);

    if (!chekCourseId) {
      throw new Error('This course dont exist');
    }

    const checkCourseExist = await coursesRepositorie.findOne({
      where: { id },
    });

    if (checkCourseExist?.user_id !== user_id) {
      throw new Error('You are not allowed to update this course.');
    }

    if (name) {
      checkCourseExist.name = name;
    }

    return coursesRepositorie.save(checkCourseExist);
  }
}

export default UpdateCourseService;
