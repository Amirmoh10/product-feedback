import { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SideBar from "./components/SideBar";
import SuggestionsList from "./components/SuggestionsList";

const Suggestions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //save the selected sort option as a query string in the url
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;

    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
  };

  //set the default url params when the suggestion component is initialy rendered.
  useEffect(() => {
    searchParams.set("category", "all");
    searchParams.set("sort", "mostupvotes");
    setSearchParams(searchParams);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex gap-[30px] pt-24 min-w-[1100px]">
        <SideBar />
        <div className="flex-col flex-1">
          <div className="flex py-[14px] px-4 items-center justify-between bg-[#373F68] rounded-[10px] text-white mb-6">
            <div className="flex gap-[38px]">
              <span>6 suggestions</span>
              <span className="flex">
                Sort by:{" "}
                <select className="bg-inherit" onChange={onSelect}>
                  <option value="mostUpvotes">Most Upvotes</option>
                  <option value="leastUpvotes">Least Upvotes</option>
                </select>
              </span>
            </div>
            <button className="bg-[#C75AF6] text-white py-3 px-6 rounded-[10px]">
              Add feedback
            </button>
          </div>
          <SuggestionsList />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
