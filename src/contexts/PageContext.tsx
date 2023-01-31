import { createContext, useContext, useState } from "react";

type PageContextValue = {
  pageIndex: number;
  setPageIndex: (n: number) => void;
  resetPage: () => void;
};

const defaultValue = {
  pageIndex: 1,
  setPageIndex: () => {},
  resetPage: () => {},
};

const PageContext = createContext<PageContextValue>(defaultValue);

interface Props {
  children: JSX.Element;
}

export const PageContextProvider = ({ children }: Props) => {
  const [pageIndex, setPageIndex] = useState(1);

  const resetPage = () => setPageIndex(1);

  return (
    <PageContext.Provider
      value={{
        pageIndex,
        setPageIndex(n) {
          setPageIndex(n);
        },
        resetPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export { PageContext };
