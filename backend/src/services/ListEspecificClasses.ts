import { id } from 'date-fns/locale';
import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import Lesson from '../models/Lesson';

class ListEspecificClasses {
  public async execute(course_id: string): Promise<Lesson[]> {
    const lessonsRepositorie = getRepository(Lesson);

    if (!isUuid(course_id)) {
      throw new Error('This course not exist.');
    }

    const findLessonForId = await lessonsRepositorie.find({ course_id });

    if (findLessonForId.length === 0) {
      throw new Error('There are no classes registered for this course.');
    }

    return findLessonForId;
  }
}

export default ListEspecificClasses;
