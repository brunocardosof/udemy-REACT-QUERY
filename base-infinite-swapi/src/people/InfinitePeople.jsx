import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

let initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error}</div>;
  return (
    <InfiniteScroll
      loadMore={fetchNextPage}
      hasMore={!isFetching && hasNextPage}
      loader={<div className="loading">Loading...</div>}
    >
      {data?.pages.map((group, i) => (
        <>
          {group.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))}
        </>
      ))}
    </InfiniteScroll>
  );
}
