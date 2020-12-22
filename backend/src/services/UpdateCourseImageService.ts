import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import Courses from '../models/Courses';

interface IRequest {
  id: string;
  imageFile: string;
}

class UpdateCpourseImageService {
  public async execute({ id, imageFile }: IRequest): Promise<Courses> {
    const coursesRepositorie = getRepository(Courses);

    const course = await coursesRepositorie.findOne(id);

    if (!course) {
      throw new Error('This course not exist.');
    }

    if (course.image) {
      const courseImageFilePath = path.join(
        uploadConfig.directory,
        course.image,
      );

      const courseImageFileExist = await fs.promises.stat(courseImageFilePath);

      if (courseImageFileExist) {
        await fs.promises.unlink(courseImageFilePath);
      }
    }

    course.image = imageFile;

    await coursesRepositorie.save(course);

    return course;
  }
}

export default UpdateCpourseImageService;
