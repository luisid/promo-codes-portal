import { useCallback } from "react";
import { useServices } from "./services";

function getRealCount(pages: any[][] = [], pageSize: number) {
  if (pages.length > 0) {
    const lastPage = pages[pages.length - 1]

    if (lastPage.length === 0 || lastPage.length < pageSize) {
      return pages.reduce((result: number, items: any[]) => {
        return result + items.length;
      }, 0)
    }
  }

  return -1;
}

export const useList = (query: string, pageSize: number) => {
  const { data, error, isFetching, fetchNextPage } =
    useServices({
      query,
      take: pageSize,
    });

  const loadedPageCount = data?.pages.length || 0;
  const simulatedCount = loadedPageCount * pageSize + pageSize;
  const realCount = getRealCount(data?.pages, pageSize);
  const itemCount = realCount === -1 ? simulatedCount : realCount;

  const isPageLoaded = useCallback(
    (page: number) => {
      if (!data) return false;

      return Boolean(data.pages[page]);
    },
    [data]
  );

  const isItemLoaded = useCallback(
    (index: number) => {
      if (!data) return false;

      const page = Math.trunc(index / pageSize);

      return isPageLoaded(page);
    },
    [data, isPageLoaded]
  );

  const nextPage = useCallback(
    (page: number) => {
      const pageData = data?.pages[page];

      return fetchNextPage({ pageParam: pageData });
    },
    [data]
  );

  return {
    data,
    itemCount,
    isFetching,
    error,
    fetchNextPage: nextPage,
    isItemLoaded,
    isPageLoaded,
  };
};
