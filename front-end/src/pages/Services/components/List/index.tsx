import React from "react";
import { InfiniteData } from "react-query";
import { ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { List } from "../../../../components/List";
import { useList } from "./hooks";
import { Service } from "./hooks/services";
import { ListItem, ListItemSkeleton } from "./ListItem";

export type ServicesListProps = {
  pageSize: number;
  search: string;
};
const ServicesList: React.FC<ServicesListProps> = ({ search, pageSize }) => {
  const {
    data,
    itemCount,
    isItemLoaded,
    isPageLoaded,
    fetchNextPage,
  } = useList(search, pageSize);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          data={data}
          itemSize={144}
          pageSize={pageSize}
          itemCount={itemCount}
          fetchNextPage={fetchNextPage}
          isItemLoaded={isItemLoaded}
          isPageLoaded={isPageLoaded}
        >
          {({
            index,
            data: listData,
            style,
          }: ListChildComponentProps<InfiniteData<Service[]> | undefined>) => {
            const page = Math.trunc(index / pageSize);
            let content = null;
            let isLoading = true;

            if (listData?.pages[page]) {
              content = listData.pages[page][index % pageSize];
              isLoading = false;
            }

            if (isLoading) {
              return <ListItemSkeleton style={style} />;
            }

            return <ListItem style={style} query={search} content={content as Service} />;
          }}
        </List>
      )}
    </AutoSizer>
  );
};

export { ServicesList };
