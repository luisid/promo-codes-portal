import React from "react";
import { ReactElement, useCallback, useRef } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

/**
 * @type {ListProps<T>}
 */
export type ListProps<T> = {
  width: number;
  height: number;
  pageSize: number;
  itemCount: number;
  itemSize: number;
  data: T;
  isItemLoaded: (index: number) => boolean;
  isPageLoaded: (page: number) => boolean;
  fetchNextPage: (page: number) => Promise<any>;
  children: (renderProps: ListChildComponentProps) => ReactElement;
};

/**
 * @param {ListProps}
 * @returns {ReactElement}
 */
function List<T>({
  width,
  height,
  pageSize,
  itemCount,
  itemSize,
  data,
  isItemLoaded,
  isPageLoaded,
  fetchNextPage,
  children,
}: ListProps<T>): ReactElement {
  const pageLoaderRef = useRef<Record<string, any>>({});

  const loadMoreItems = useCallback(
    async (startIndex: number) => {
      const page = Math.trunc(startIndex / pageSize);

      const pageLoaded = isPageLoaded(page);

      if (pageLoaded || pageLoaderRef.current[page]) {
        return;
      }

      await fetchNextPage(page);
      delete pageLoaderRef.current[page];
    },
    [pageSize, isPageLoaded, fetchNextPage]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      minimumBatchSize={pageSize}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList<T>
          ref={ref}
          onItemsRendered={onItemsRendered}
          itemCount={itemCount}
          itemSize={itemSize}
          width={width}
          height={height}
          itemData={data}
        >
          {children}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

export { List };
