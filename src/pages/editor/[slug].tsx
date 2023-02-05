import Editor from "components/Editor";
import { useSession } from "next-auth/react";

import ArticleAPI from "lib/api/article";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorList from "components/ErrorList";

import type { CommonErrors } from "lib/types/common";
import type { EditorFormData } from "components/Editor";
import type { GetServerSidePropsContext } from "next";
import type { Article } from "lib/types/articles";

interface Props {
  article?: Article;
}

const UpdateArticle = ({ article }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errors, setErrors] = useState<CommonErrors | null>(null);
  const { slug } = router.query as { slug: string };

  const handleOnSubmit = async (formData: EditorFormData) => {
    if (session?.accessToken) {
      setErrors(null);
      const result = await ArticleAPI.update(
        slug,
        formData,
        session.accessToken
      );

      if ("article" in result) {
        router.push({
          pathname: "/articles/[slug]",
          query: {
            slug: result.article.slug,
          },
        });
      } else {
        setErrors(result.errors);
      }
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <ErrorList errors={errors} />}
            <Editor mode="UPDATE" onSubmit={handleOnSubmit} article={article} />
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateArticle.auth = true;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query as { slug: string };

  const result = await ArticleAPI.getBySlug(slug);
  if ("article" in result) {
    return {
      props: {
        article: result.article,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default UpdateArticle;
