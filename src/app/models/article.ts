import { IComment } from "./comment";
import {IUser} from "./user";
import {Observable} from "rxjs";

export interface IArticle{
  // displayName?: string,
  uid?: string,
  img?: string,
  name: string,
  description: string,
  content: string,
  comments?: IComment[]
}
