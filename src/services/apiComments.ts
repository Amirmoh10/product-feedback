import { supabase } from "./supabase";

export const fetchSuggestionComments = async (id: number) => {
  const { data: comments, error } = await supabase
    .from("comment")
    .select()
    .eq("product_feedback_id", id);

  if (error) {
    throw Error("failed fetching comments");
  }

  return comments;
};
