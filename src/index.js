import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import cors from "cors";
import { offsetLimitPagination } from "@apollo/client/utilities";
// import { onError } from "@apollo/client/link/error";

// const errorLink = onError(({ grapqlErrors, networkError }) => {
//   if (grapqlErrors) {
//     grapqlErrors.map(({ message, location }) => {
//       alert(`GraphQL Error ${message}`);
//     });
//   }
// });

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://localhost:8080/graphql" }),
// ]);

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: "https://apis-launchpadx.ibt-learning.com/graphql",
  cors: true,

  // uri: "http://localhost:8080/graphql",
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
