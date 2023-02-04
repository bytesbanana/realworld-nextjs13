import { createContext, useState } from "react";
import type { ReactNode } from "react";

type ArticleType = "MY_ARTICLES" | "FAVORITE_ARTICLES";

interface ProfileContextValue {
  articleType: ArticleType;
  setArticleType: (type: ArticleType) => void;
}

const defaultValue: ProfileContextValue = {
  articleType: "MY_ARTICLES",
  setArticleType: (type) => {},
};

const ProfileContext = createContext(defaultValue);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [currentArticleType, setCurrentArticleType] =
    useState<ArticleType>("MY_ARTICLES");

  return (
    <ProfileContext.Provider
      value={{
        articleType: currentArticleType,
        setArticleType(type: ArticleType) {
          setCurrentArticleType(type);
        },
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext };
