import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOneBy({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });

    return await this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentsIds } = assignStudentsToLesson;

    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    lesson.students = [...lesson.students, ...studentsIds];

    return await this.lessonRepository.save(lesson);
  }
}
