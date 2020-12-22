import { getRepository } from 'typeorm';
// import {t} from 'date-fns';

import Lesson from '../models/Lesson';

interface IRequest {
  name: string;
  duraction: string;
  description: string;
  course_id: string;
  video_id: string;
}

class CreateLessonService {
  public async execute({
    name,
    duraction,
    description,
    course_id,
    video_id,
  }: IRequest): Promise<Lesson> {
    const lessonRepositorie = getRepository(Lesson);
    const lesson = lessonRepositorie.create({
      name,
      duraction,
      description,
      course_id,
      video_id,
    });

    await lessonRepositorie.save(lesson);

    return lesson;
  }
}

export default CreateLessonService;
