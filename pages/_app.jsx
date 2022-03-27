import "@/styles/globals.css";

import React from "react";
import { Provider } from "react-redux";

import { UserContextProvider } from "@/hooks/useAuthUser";
import { store, wrapper } from "@/store/store";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
