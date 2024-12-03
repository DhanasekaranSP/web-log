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
  bio: string;
  photo: FeaturedImage;
};

export type PostContent = {
  children: ContentChild[];
  type: "heading-three" | "heading-four" | "paragraph" | "image";
  title?: string;
};

export type ContentChild = {
  src: string | undefined;
  height: string | number | undefined;
  width: string | number | undefined;
  title: string | undefined;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type Post = {
  createdAt: string;
  author: author;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  categories: Category[];
  content: {
    raw: {
      children: PostContent[];
    };
  };
};

export type PostWidgetProps = {
  categories?: string[];
  slug?: string;
};

export type GetCategoriesResponse = {
  categories: Category[];
};

export type GetRecentPostsResponse = {
  posts: Post[];
};

export type AdjacentPost = {
  title: string;
  slug: string;
  createdAt: string;
  featuredImage: { url: string };
};

export type AdjacentPostsResponse = {
  next?: AdjacentPost;
  previous?: AdjacentPost;
};
