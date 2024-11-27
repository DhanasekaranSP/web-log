import request, { gql } from "graphql-request";
import { Category, Post } from "./model";

// Define the GraphQL response type
interface GetCategoriesResponse {
  categories: Category[];
}

const graphqlAPI =
  "https://ap-south-1.cdn.hygraph.com/content/cm3vuc0n703mb07w956nceuiv/master";
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

interface GetRecentPostsResponse {
  posts: Post[];
}

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
