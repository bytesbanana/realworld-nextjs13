import { createContext, ReactNode, useContext, useState } from "react";
import { Paginate } from "types/article";

type PaginateContext = Paginate & {
  setPagination: (value: Paginate) => void;
};

const defaultState: PaginateContext = {
  offset: 0,
  currentPage: 1,
  limit: 10,
  setPagination: () => {},
};

type Props = {
  children: ReactNode;
};

export const PaginationContext = createContext<PaginateContext>(defaultState);

export const PaginationProvider = ({ children }: Props) => {
  const [paginate, setPaginate] = useState<Paginate>(defaultState);

  return (
    <PaginationContext.Provider
      value={{
        ...paginate,
        setPagination: (value) =>
          setPaginate((prev) => ({ ...prev, ...value })),
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
export const usePagination = () => {
  const state = useContext(PaginationContext);
  return state;
};
