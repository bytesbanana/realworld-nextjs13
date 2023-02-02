import { createContext, useState } from "react";
import type { ReactNode } from "react";

type FeedType = "YOUR" | "GLOBAL" | "TAG";

type ArticlesContextValue = {
  currentFeedType: FeedType;
  setFeedType: (feedType: FeedType) => void;
  selectedTag: string | null;
  setSelectTag: (tag: string | null) => void;
};

const defaultValue: ArticlesContextValue = {
  currentFeedType: "GLOBAL",
  setFeedType: () => {},
  selectedTag: null,
  setSelectTag: () => {},
};

const ArticlesContext = createContext<ArticlesContextValue>(defaultValue);
interface Props {
  children: ReactNode;
}

export const ArticlesContextProvider = ({ children }: Props) => {
  const [feedType, setFeedType] = useState<FeedType>("GLOBAL");
  const [tag, setTag] = useState<string | null>(null);

  return (
    <ArticlesContext.Provider
      value={{
        currentFeedType: feedType,
        setFeedType: (feedType: FeedType) => setFeedType(feedType),
        selectedTag: tag,
        setSelectTag: (tag) => setTag(tag),
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export { ArticlesContext as ArticleContext };
