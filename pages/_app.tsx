import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import axios from "axios";

import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
