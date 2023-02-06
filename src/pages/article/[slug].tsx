import React, { useState } from "react";
import ArticleAPI from "lib/api/article";
import ProfileAPI from "lib/api/profile";
import Banner from "components/article/Banner";
import Content from "components/article/Content";
import Actions from "components/article/Actions";
import CommentForm from "components/article/CommentForm";
import CommentCard from "components/article/CommentCard";

import type { GetServerSidePropsContext } from "next";
import type { Article } from "lib/types/articles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_BASE_URL } from "lib/utils/constant";
import { restFetcher } from "lib/fetcher/rest";
import { CommentsResponse } from "lib/types/comment";
import CommentAPI from "lib/api/comment";

interface Props {
  article: Article;
}

const Article = ({ article }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [following, setFollowing] = useState(article.author.following);
  const [favorited, setFavorite] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const {
    data: commentsResponse,
    isLoading: isLoadingComment,
    mutate,
  } = useSWR<CommentsResponse>(
    [`${API_BASE_URL}/articles/${article.slug}/comments`, session?.accessToken],
    ([url, token]) => restFetcher(url, token)
  );

  const handleToggleFollowing = async () => {
    if (!session?.accessToken) {
      router.push("/auth/login");
      return;
    }

    const result = await ProfileAPI.setFollow(
      article.author.username,
      !following,
      session.accessToken
    );
    if (result) {
      setFollowing(result.profile?.following);
    }
  };

  const handleToggleFavorite = async () => {
    if (!session?.accessToken) {
      router.push("/auth/login");
      return;
    }

    const result = await ArticleAPI.setFavorite(
      article.slug,
      !favorited,
      session?.accessToken
    );

    if (result) {
      setFavorite(result.article.favorited);
      setFavoritesCount(result.article.favoritesCount);
    }
  };

  const handlePostComment = async (body: string) => {
    if (!session?.accessToken) {
      router.push("/auth/login");
      return;
    }
    const result = await CommentAPI.add(
      article.slug,
      body,
      session?.accessToken
    );
    if ("comment" in result) {
      mutate({
        ...commentsResponse,
        comments: [...(commentsResponse?.comments || []), result.comment],
      });
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!session?.accessToken) {
      router.push("/auth/login");
      return;
    }
    const res = await CommentAPI.remove(article.slug, id, session?.accessToken);
    if (res) {
      mutate({
        ...commentsResponse,
        comments:
          commentsResponse?.comments.filter((comment) => !comment.id) || [],
      });
    }
  };

  return (
    <div className="article-page">
      <Banner
        article={article}
        following={following}
        favorited={favorited}
        favoritesCount={favoritesCount}
        onToggleFollow={handleToggleFollowing}
        onToggleFavorite={handleToggleFavorite}
      />

      <div className="container page">
        <Content body={article.body} />

        <hr />

        <Actions
          article={article}
          following={following}
          favorited={favorited}
          favoritesCount={favoritesCount}
          onToggleFavorite={handleToggleFavorite}
          onToggleFollow={handleToggleFollowing}
        />

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm onPostComment={handlePostComment} />

            {isLoadingComment && (
              <div className="article-preview">Loading comments...</div>
            )}
            {commentsResponse?.comments &&
              commentsResponse.comments.length > 0 &&
              commentsResponse.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={handleDeleteComment}
                  enableDelete={comment.author.username === session?.user?.name}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const slug = (ctx.query?.slug as string) || "";

  const result = await ArticleAPI.getBySlug(slug);

  try {
    if (result) {
      return {
        props: {
          article: result.article,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Article;
