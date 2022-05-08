import { IComment } from "./comment";
import {IUser} from "./user";
import {Observable} from "rxjs";

export interface IArticle{
  id?: string | undefined,
  uid?: string,
  img?: string,
  title: string,
  description: string,
  content: string,
  comments?: IComment[]
}
