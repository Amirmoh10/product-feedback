export const getSortOption = (sortParam: string | null) => {
  if (!sortParam) return;

  ///large to small
  if (sortParam.includes("most")) {
    return { ascending: false };
  }

  ///small to large
  return { ascending: true };
};
