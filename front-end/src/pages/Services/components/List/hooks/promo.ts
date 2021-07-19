import { useAuth0 } from "@auth0/auth0-react";
import { InfiniteData, useMutation, UseMutationResult } from "react-query";
import { QueryFilters } from "react-query/types/core/utils";
import { queryClient } from "../../../../../query-client";
import { Promo as CreatedPromo, Service } from "./services";

/**
 * @type {Promo}
 */
export type Promo = {
  serviceId: number;
  code: string;
};

export function usePromo(query: string, mutationKey: number): UseMutationResult<CreatedPromo, unknown, Promo, unknown> {
  const { getAccessTokenSilently } = useAuth0();
  const mutation = useMutation((promo: Promo) => {
    return getAccessTokenSilently().then((token) =>
      fetch(`${import.meta.env.VITE_API_URL}/promos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promo),
      }).then((res) => res.json())
    );
  }, {
    mutationKey: ['service-mutation', mutationKey],
    onSuccess: async (newPromo: CreatedPromo, variables: Promo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['services', query])
      // Snapshot the previous value
      const previousServices = queryClient.getQueryData<InfiniteData<Service[]>>(['services', query])
      console.log(queryClient.getQueryData<InfiniteData<Service[]>>(['services', query]))

      // Optimistically update to the new value
      queryClient.setQueryData<InfiniteData<Service[]>>(['services', query], (oldServices) => {
        const services = oldServices || {
          pages: [],
          pageParams: []
        }

        // TODO: Better finding
        services.pages.map((page) => {
          const service = page.find(({ serviceId }) => newPromo.serviceId === serviceId);

          if (service) {
            service.promo = newPromo;
          }

          return page;
        })

        return services;
      })

      // Return a context with the previous and new todo
      return { previousServices, newPromo }
    },
  });
  return mutation;
}
