import { useSearchParams } from "react-router-dom";
import SuggestionItem from "./SuggestionItem";
import { useQuery } from "@tanstack/react-query";

import { fetchSuggestions } from "../../../services/apiSuggestions";
import { getSortOption } from "../../../utils";

const SuggestionsList = () => {
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");

  const {
    data: suggestions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["suggestions", categoryParam, sortParam],
    queryFn: () =>
      fetchSuggestions(categoryParam, {
        column: "upvotes",
        option: getSortOption(sortParam),
      }),
  });

  //TODO: add error ui
  if (isError) {
    return <div> error</div>;
  }

  //TODO: add laoding ui
  if (isLoading) {
    return <div className="w-full h-full flex justify-center">loading</div>;
  }

  return (
    <div className="h-[770px] overflow-y-scroll no-scrollbar">
      {suggestions.length ? (
        suggestions.map((suggestion) => (
          <SuggestionItem key={suggestion.id} suggestion={suggestion} />
        ))
      ) : (
        <div className="w-full h-full flex justify-center">
          No matched suggestions
        </div>
      )}
    </div>
  );
};

export default SuggestionsList;
