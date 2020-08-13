import {Question} from '@shared/models/question.model';

export class Tag {
  public id: number;
  public title: string;
  public text: string;
  public description: string;
  public questionCount: number;
  public questions: Question[];
}
