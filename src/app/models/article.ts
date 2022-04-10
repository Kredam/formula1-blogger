import { IComment } from "./comment";
import { IUser } from "./user";
import { BehaviorSubject } from "rxjs";

export interface IArticle{
  author?: IUser,
  name: string,
  description: string,
  content: string,
  comments?: IComment[]
}