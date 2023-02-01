//@ts-ignore
import React from "react";
import Layout from "components/Layout";
import { MyAppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { PageContextProvider } from "contexts/PageContext";
import { ArticlesContextProvider } from "contexts/ArticleContext";

import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const progress = new ProgressBar({
  size: 5,
  color: "#5cb85b",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  console.log("AUTH: ", Component.auth);
  return (
    <PageContextProvider>
      <ArticlesContextProvider>
        <SessionProvider session={pageProps.session}>
          <Layout>
            {Component?.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </SessionProvider>
      </ArticlesContextProvider>
    </PageContextProvider>
  );
};

interface AuthProps {
  children: JSX.Element;
}
function Auth({ children }: AuthProps) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp;
