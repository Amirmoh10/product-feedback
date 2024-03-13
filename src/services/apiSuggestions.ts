import { supabase } from "./supabase";

export const fetchSuggestions = async (
  category: string | null,
  sortBy: { column: string | null; option?: { ascending: boolean } }
) => {
  //get feedback with "suggestions" status and "all" category
  const allSuggestionsQuery = supabase
    .from("productFeedback")
    .select()
    .eq("status", "suggestion")
    // by default the feedback table is sorted by id
    .order(sortBy.column ?? "id", sortBy.option);

  //get feedback with "suggestions" status and selected category filter
  const query =
    category && category !== "all"
      ? allSuggestionsQuery.eq("category", category)
      : allSuggestionsQuery;

  const { data: suggestions, error } = await query;

  if (error) {
    throw new Error("Failed fetching suggestions");
  }

  return suggestions;
};
