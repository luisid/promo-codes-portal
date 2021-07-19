import React, { ChangeEvent, CSSProperties, useCallback, useState } from "react";
import { Service } from "./hooks/services";
import { Button } from "../../../../components/Button";
import { FieldSet } from "../../../../components/FieldSet";
import { InputField } from "../../../../components/InputField";
import { Promo as CreatePromo, usePromo } from "./hooks/promo";
import { Promo } from "./hooks/services";
import { UseMutationResult } from "react-query";

export type ListItemProps = {
  style: CSSProperties;
  query: string;
  content: Service;
};

export type ListItemSkeletonProps = {
  style: CSSProperties;
};

const ListItem: React.FC<ListItemProps> = ({ query, style, content }) => {
  const servicePromo = content.promo;
  const [code, setCode] = useState(servicePromo?.code || "");
  const { mutate, isLoading, data: createdPromo } = usePromo(query, content.serviceId);

  const promo = servicePromo || createdPromo;

  const handleClick = useCallback(() => {
    mutate({
      code,
      serviceId: content.serviceId
    })
  }, [code]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!promo) {
      setCode(e.target.value)
    }
  }, [promo]);

  return (
    <div style={style}>
      <div className="flex flex-row items-stretch box-border rounded-md h-[120px] px-8 py-6 border border-solid bg-white border-gray-blue-lighter">
        <div className="flex flex-1 flex-col content-between">
          <p className="text-3xl font-light text-black">{content.name}</p>
          <p className="text-gray-pure mt-[10px]">{content.description}</p>
        </div>
        <FieldSet>
          <InputField value={code} onChange={handleChange} disabled={isLoading || Boolean(promo)}  className="mr-6" type="text" label="PROMOCODE" />
          <Button disabled={isLoading || Boolean(promo)} className="ml-2 w-[300px]" onClick={isLoading || Boolean(promo) ? undefined :  handleClick}>
            Activate bonus
          </Button>
        </FieldSet>
      </div>
    </div>
  );
};

const ListItemSkeleton: React.FC<ListItemSkeletonProps> = ({ style }) => {
  return (
    <div style={style}>
      <div className="flex flex-row items-stretch box-border rounded-md h-[120px] px-8 py-6 border border-solid bg-white border-gray-blue-lighter">
        <div className="flex flex-1 flex-col content-between disabled:opacity-20">
          <p className="w-40 text-3xl font-light bg-gray-pure"></p>
          <p className="w-52 mt-[10px] bg-gray-pure"></p>
        </div>
        <FieldSet>
          <InputField disabled className="mr-6 disabled:opacity-20" type="text" label="PROMOCODE" />
          <Button disabled className="ml-2 w-[300px] disabled:opacity-20" onClick={() => null}>
            Activate bonus
          </Button>
        </FieldSet>
      </div>
    </div>
  );
};

export { ListItem, ListItemSkeleton };
