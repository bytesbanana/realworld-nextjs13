import type { NextPage } from "next";
import Head from "next/head";

import { Banner, MainContent, PopularTags } from "components/home";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home - Conduit</title>
        <meta name="description" content="Next.js 13 + SWR realword demo" />
      </Head>

      <main className="home-page">
        <Banner />

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <MainContent />
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
