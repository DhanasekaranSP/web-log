import { GraphQLClient } from "graphql-request";

// Define the endpoint for your GraphQL API
const client = new GraphQLClient(
  "https://ap-south-1.cdn.hygraph.com/content/cm3vuc0n703mb07w956nceuiv/master"
);

export default client;
