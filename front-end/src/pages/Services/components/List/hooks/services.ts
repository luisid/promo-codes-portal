import { useAuth0 } from "@auth0/auth0-react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

/**
 * @type {Service}
 */
 export type Service = {
  serviceId: number
  name: string
  description: string | null
  userId: string
  promo: Promo | null
}

/**
 * @type {Service}
 */
export type Promo = {
  promoId: number
  serviceId: number
  code: string
}


/**
 * @type {ServicesParams}
 */
export type ServicesParams = {
  query: string;
  cursor?: string;
  take?: number;
}

/**
 * Hook to fetch repos from Github.
 *
 * @param {ServicesParams}
 * @returns {UseInfiniteQueryResult<Service[]>}
 */
export function useServices({
  query,
  cursor,
  take = 10,
}: ServicesParams): UseInfiniteQueryResult<Service[]> {
  const { getAccessTokenSilently } = useAuth0();

  const result = useInfiniteQuery(
    ['services', query],
    async ({ pageParam }) => {
      const searchParams = new URLSearchParams()
      const innerQuery = pageParam?.query || query;
      const innerTake = pageParam?.take || take;
      const innerCursor = pageParam?.cursor || cursor;

      if (innerQuery) {
        searchParams.append('q', innerQuery);
      }

      if (innerTake) {
        searchParams.append('take', `${innerTake}`);
      }

      if (innerCursor) {
        searchParams.append('cursor', `${innerCursor}`)
      }

      return getAccessTokenSilently().then((token) =>
        fetch(
          `${import.meta.env.VITE_API_URL}/services?${searchParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json())
      );
    },
    {
      getNextPageParam: (lastPage) => {
        const item: Service = lastPage[lastPage.length - 1]

        return {
          query,
          cursor: item.serviceId,
          take,
        };
      },
    }
  );

  return result;
}
