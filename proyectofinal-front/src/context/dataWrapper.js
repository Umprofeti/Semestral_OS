"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";


function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3040/api/graphql",
    headers:{
      Authorization: 'Users API-Key a9159675-39a2-4395-849a-d3afef710d4d'
    }
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    defaultOptions:{
      watchQuery:{
        fetchPolicy:'network-only',
        nextFetchPolicy:'cache-only'
      }
    },
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}