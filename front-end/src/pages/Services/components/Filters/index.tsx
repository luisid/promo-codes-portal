import React, { ChangeEventHandler } from "react";
import { Button } from "../../../../components/Button";
import { FieldSet } from "../../../../components/FieldSet";
import { InputField } from "../../../../components/InputField";

export type FiltersProps = {
  search: string;
  resetSearch: () => void;
  handleSearchChange: ChangeEventHandler<HTMLInputElement>;
}

const Filters: React.FC<FiltersProps> = ({ search, resetSearch, handleSearchChange }) => {
  return (
    <FieldSet className="mt-4">
      <InputField value={search} onChange={handleSearchChange} label="FILTER" />
      <Button variant="secondary" className="ml-2" onClick={resetSearch}>
        Reset
      </Button>
    </FieldSet>
  );
};

export { Filters };
