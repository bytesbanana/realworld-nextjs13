//@ts-ignore
import React from "react";
import Layout from "components/Layout";
import { MyAppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  console.log("AUTH: ", Component.auth);
  return (
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
