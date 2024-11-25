import { MomentInput } from "moment";

export type Photo = {
  url: string;
};

export type Author = {
  bio: string;
  name: string;
  id: string;
  photo: Photo;
};

export type FeaturedImage = {
  url: string;
};

export type Category = {
  name: string;
  slug: string;
};

export type PostNode = {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  category: Category;
};

export type PostEdge = {
  node: PostNode;
};

export type PostsConnection = {
  edges: PostEdge[];
};

export type PostsData = {
  postsConnection: PostsConnection;
};

export type author = {
  name: string;
  photo: FeaturedImage;
};

export type Post = {
  createdAt: MomentInput;
  author: author;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
};

export type PostWidgetProps = {
  categories?: string[];
  slug?: string;
};
