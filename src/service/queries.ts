export const GET_POSTS = `
  query MyQuery {
    postsConnection {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          category {
            name
            slug
          }
        }
      }
    }
  }
`;
