import { getRepository } from 'typeorm';

import Courses from '../models/Courses';

class ListCoursesService {
  public async all(): Promise<Courses[]> {
    const cousesRepositorie = getRepository(Courses);

    const courses = await cousesRepositorie.find();

    return courses;
  }
}

export default ListCoursesService;
