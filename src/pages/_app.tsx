/* eslint-disable react/prop-types */
import {
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import superjson from "superjson";

import type { Session } from "next-auth";
import { type AppType } from "next/app";
import type { AppRouter } from "../server/router";

import Layout from "../components/Layout";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const title = "T3 Blog";
  const description = "A full stack blog web app created with T3 Stack";
  const imageMetaURL = "/favicon.ico";

  const myCache = createEmotionCache({ key: "mantine", prepend: false });
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => {
    if (colorScheme === "dark")
      document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");

    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />

        <link rel="icon" href={imageMetaURL} />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="application-name" content={title} />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
          emotionCache={myCache}
        >
          <Layout
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== undefined) return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 600000 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
