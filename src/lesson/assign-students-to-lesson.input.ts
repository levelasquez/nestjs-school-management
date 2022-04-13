import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @Field(() => ID)
  @IsUUID('4')
  lessonId: string;

  @Field(() => [ID])
  @IsUUID('4', { each: true })
  studentsIds: string[];
}
