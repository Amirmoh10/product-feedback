import { useQuery } from "@tanstack/react-query";

import { fetchSuggestionComments } from "../../../services/apiComments";
import { Suggestion } from "../../../types";

const SuggestionItem = ({ suggestion }: { suggestion: Suggestion }) => {
  const { id, upvotes, title, description, category } = suggestion;

  //fetch comments of suggestion item
  const {
    data: suggestionItemComments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["suggestionComments", id],
    queryFn: () => fetchSuggestionComments(id),
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
    <div
      key={id}
      className="bg-white py-7 px-8 flex justify-between rounded-[10px] h-[150px] mb-5"
    >
      <div className="flex gap-10">
        <button className="bg-[#F2F4FE] rounded-[10px] h-fit p-1">
          <p>^</p>
          <p>{upvotes}</p>
        </button>
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p className="rounded-[10px] bg-[#F2F4FF] px-4 py-[6px] w-fit mt-[12px]">
            {category}
          </p>
        </div>
      </div>
      <div className="self-end">
        number of comments: {suggestionItemComments?.length}
      </div>
    </div>
  );
};

export default SuggestionItem;
