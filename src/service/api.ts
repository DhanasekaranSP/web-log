import request, { gql, GraphQLClient } from "graphql-request";
import {
  AdjacentPost,
  AdjacentPostsResponse,
  Category,
  GetCategoriesResponse,
  GetRecentPostsResponse,
  Post,
  PostNode,
} from "./model";
import { GET_POSTS } from "./queries";

const graphqlAPI = import.meta.env.VITE_GRAPHCMS_ENDPOINT;
const client = new GraphQLClient(graphqlAPI);

export const getPosts = async (): Promise<PostNode[]> => {
  try {
    const data = await client.request<{
      postsConnection: { edges: { node: PostNode }[] };
    }>(GET_POSTS);
    return data.postsConnection.edges.map((edge) => edge.node); // Map edges to nodes
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request<GetCategoriesResponse>(graphqlAPI, query);
  return result.categories;
};

interface GetSimilarPostsResponse {
  posts: Post[];
}

export const getSimilarPosts = async (
  categories: string[],
  slug: string
): Promise<Post[]> => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request<GetSimilarPostsResponse>(graphqlAPI, query, {
    slug,
    categories,
  });
  return result.posts;
};

export const getRecentPosts = async (): Promise<Post[]> => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request<GetRecentPostsResponse>(graphqlAPI, query);
  return result.posts;
};

const GET_POST_DETAILS_QUERY = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }) {
      title
      excerpt
      featuredImage {
        url
      }
      author {
        name
        bio
        photo {
          url
        }
      }
      createdAt
      slug
      content {
        raw
      }
      category {
        name
        slug
      }
    }
  }
`;

export const getPostDetails = async (slug: string): Promise<Post | null> => {
  try {
    const response = await request<{ post: Post }>(
      graphqlAPI,
      GET_POST_DETAILS_QUERY,
      { slug }
    );
    if (!response.post) {
      console.error("No post found for slug:", slug);
      return null; // Handle the case where no post is returned
    }
    return response.post;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw new Error("Bad Request: Could not fetch post details.");
  }
};

export const getAdjacentPosts = async (
  createdAt: string,
  slug: string
): Promise<AdjacentPostsResponse> => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request<{
      next: AdjacentPost[];
      previous: AdjacentPost[];
    }>(graphqlAPI, query, { slug, createdAt });

    return {
      next: result.next[0],
      previous: result.previous[0],
    };
  } catch (error) {
    console.error("Error fetching adjacent posts:", error);
    throw error;
  }
};
