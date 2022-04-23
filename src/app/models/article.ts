import { IComment } from "./comment";

export interface IArticle{
  displayName?: string,
  img?: string,
  name: string,
  description: string,
  content: string,
  comments?: IComment[]
}
