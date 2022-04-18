import { IComment } from "./comment";

export interface IArticle{
  uid?: string,
  img?: string,
  name: string,
  description: string,
  content: string,
  comments?: IComment[]
}
