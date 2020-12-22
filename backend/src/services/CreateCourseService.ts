import { getRepository } from 'typeorm';
// import uploadConfig from '../config/upload';

import Cousers from '../models/Courses';

interface IRequest {
  user_id: string;
  name: string;
  image: string;
}

class CreateCourseService {
  public async execute({ user_id, name, image }: IRequest): Promise<Cousers> {
    const coursesRepositorie = getRepository(Cousers);

    const course = coursesRepositorie.create({ name, image, user_id });

    await coursesRepositorie.save(course);

    return course;
  }
}

export default CreateCourseService;
