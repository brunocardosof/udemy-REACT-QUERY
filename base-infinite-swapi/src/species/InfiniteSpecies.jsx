import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isLoading,
    isFetching,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={!isFetching && fetchNextPage}
    >
      {data?.pages.map((group, i) => (
        <>
          {group.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))}
        </>
      ))}
    </InfiniteScroll>
  );
}
