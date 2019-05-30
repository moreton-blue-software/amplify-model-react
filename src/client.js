import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { SchemaLink } from "apollo-link-schema";
import schema from "./graphql/schema";

import { createHttpLink } from "apollo-link-http";

export function createApolloClient(url, token) {
  const customFetch = (uri, options) => {
    return fetch(uri, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token
      }
    });
  };

  const fetchLink = createHttpLink({
    uri: url,
    fetch: customFetch
  });

  const client = new ApolloClient({
    link: ApolloLink.from([fetchLink]),
    // link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return client;
}
