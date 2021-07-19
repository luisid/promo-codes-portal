import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";

export type ServiceFilters = {
  search: string;
  resetSearch: () => void;
  handleSearchChange: ChangeEventHandler<HTMLInputElement>;
};

export function useServiceFilters(): ServiceFilters {
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const resetSearch = useCallback(() => setSearch(""), []);

  return {
    search,
    resetSearch,
    handleSearchChange,
  };
}
