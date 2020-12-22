import { getRepository } from 'typeorm';

import Lesson from '../models/Lesson';

interface IRequest {
  id: string;
  name?: string;
  duraction?: string;
  description?: string;
}

class UpdateLessonService {
  public async execute({
    id,
    name,
    duraction,
    description,
  }: IRequest): Promise<Lesson> {
    const lessonsRepositorie = getRepository(Lesson);

    const findLessonForUpdate = await lessonsRepositorie.findOne({ id });

    if (!findLessonForUpdate) {
      throw new Error('This video not exist.');
    }

    if (name) {
      findLessonForUpdate.name = name;
    }

    if (duraction) {
      findLessonForUpdate.duraction = duraction;
    }

    if (description) {
      findLessonForUpdate.description = description;
    }

    await lessonsRepositorie.save(findLessonForUpdate);

    return findLessonForUpdate;
  }
}

export default UpdateLessonService;
