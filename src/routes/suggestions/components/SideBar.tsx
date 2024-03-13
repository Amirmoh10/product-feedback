import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { fetchSuggestions } from "../../../services/apiSuggestions";
import { getSortOption } from "../../../utils";

const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

const SideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");

  //save category as a query string in the url
  const handleClick = (category: string) => {
    searchParams.set("category", category.toLowerCase());
    setSearchParams(searchParams);
  };

  //prefetch suggstions when hovering over category button
  const prefetchSuggestions = async (category: string) => {
    await queryClient.prefetchQuery({
      queryKey: ["suggestions", category.toLowerCase(), sortParam],
      queryFn: () =>
        fetchSuggestions(category.toLowerCase(), {
          column: "upvotes",
          option: getSortOption(sortParam),
        }),
    });
  };

  return (
    <div className="w-[255px] flex-col">
      {/*feedback board*/}

      <p className="bg-gradient-to-r from-custom-pink via-custom-purple to-custom-blue w-[255px] h-[137px] flex items-center justify-center">
        Feedback board
      </p>

      {/*filter card*/}
      <div className="flex flex-wrap p-6 pr-[50px] bg-white gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onMouseEnter={() => prefetchSuggestions(category)}
            onClick={() => handleClick(category)}
            className={`rounded-[10px] bg-[#F2F4FF] px-4 py-[6px] ${
              categoryParam === category.toLowerCase() &&
              "bg-[#4661E6] text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
