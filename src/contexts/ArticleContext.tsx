import { createContext, useState } from "react";

type ArticlesContextValue = {
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
};

const defaultValue: ArticlesContextValue = {
  selectedTag: null,
  onSelectTag: () => {},
};

const ArticlesContext = createContext<ArticlesContextValue>(defaultValue);
interface Props {
  children: JSX.Element;
}
export const ArticlesContextProvider = ({ children }: Props) => {
  const [selectedTag, setSelectTag] = useState<string | null>(null);

  return (
    <ArticlesContext.Provider
      value={{ selectedTag, onSelectTag: (tag) => setSelectTag(tag) }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export { ArticlesContext as ArticleContext };
