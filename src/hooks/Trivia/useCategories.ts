import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useQuestionCategories() {
  return useQuery(["questions-categories"], async () => {
    const res = await axios.get<TriviaCategories>(
      "https://opentdb.com/api_category.php"
    );
    return res.data;
  });
}
