import { UserProfile } from "./User";

export interface CommentI {
  commentId: number;
  comment: string;
  userProfile: UserProfile;
  // commentInfo:
}

export interface ContentI {
  id: number | string;
  content: string;
  linkArr: string[];
  writer: string;
}

export interface ContentCardI extends ContentI {
  likedNum: number;
  userProfile: UserProfile;
  comments: CommentI[];
}
