import React from "react";
import Layout from "components/Layout";
import { MyAppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { PageContextProvider } from "contexts/PageContext";
import { ArticlesContextProvider } from "contexts/ArticleContext";

import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { ProfileProvider } from "contexts/ProfileContex";

const progress = new ProgressBar({
  size: 5,
  color: "#5cb85b",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PageContextProvider>
        <ProfileProvider>
          <ArticlesContextProvider>
            <Layout>
              {Component?.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ArticlesContextProvider>
        </ProfileProvider>
      </PageContextProvider>
    </SessionProvider>
  );
};

interface AuthProps {
  children: JSX.Element;
}

function Auth({ children }: AuthProps) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp;
