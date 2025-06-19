import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with your GraphQL endpoint
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}) 