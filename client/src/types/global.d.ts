export interface PostInfo {
  id: string;
  title: string;
  poster: string;
  createdAt: string;
  description?: string;
  content?: string;
  author: {
    id: string;
    username: string;
    photoUrl: string;
  };
  postTags?: {
    tagId: string;
    tag: {
      name: string;
    };
  }[];
  bookmarks?: {
    id: string;
  };
}

export interface UserInfo {
  id?: string;
  username: string;
  photoUrl: string;
  createdAt?: string;
}

export interface Bookmark {
  id: string;
  post: PostInfo;
  user: UserInfo;
}

export interface CommentData {
  id: string;
  userId: string;
  postId: string;
  text: string;
  createdAt: string;
  user: {
    photoUrl: string;
    username: string;
  };
}