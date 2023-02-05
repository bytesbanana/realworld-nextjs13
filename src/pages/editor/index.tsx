import Editor from "components/Editor";
import { useSession } from "next-auth/react";

import type { EditorFormData } from "components/Editor";
import ArticleAPI from "lib/api/article";
import { useRouter } from "next/router";
import { useState } from "react";
import { CommonErrors } from "lib/types/common";
import ErrorList from "components/ErrorList";

const NewArticle = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errors, setErrors] = useState<CommonErrors | null>(null);

  const handleOnSubmit = async (formData: EditorFormData) => {
    if (session?.accessToken) {
      setErrors(null);
      const result = await ArticleAPI.create(formData, session.accessToken);

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
            <Editor mode="NEW" onSubmit={handleOnSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

// NewArticle.auth = true;

export default NewArticle;
