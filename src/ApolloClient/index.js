import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken"),
    },
  });

  return forward(operation);
});

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const token = headers.get("x-token");
    console.log(token);
    if (token) {
      localStorage.setItem("token", token);
    }

    const refreshToken = headers.get("x-refresh-token");
    console.log(refreshToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, authAfterware, httpLink]),
});

export default client;
