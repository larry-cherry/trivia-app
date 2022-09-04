import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type useQuestionsParams = {
  amount?: number;
  type?: "multiple" | "boolean";
  category?: number;
  difficulty?: "easy" | "medium" | "hard";
};

export function useQuestions({
  amount,
  type,
  difficulty,
  category,
}: useQuestionsParams) {
  const params = {
    amount,
    type,
    difficulty,
    category,
  };
  return useQuery(["questions"], async () => {
    const resp = await axios.get<TriviaQuestions>(
      `https://opentdb.com/api.php`,
      {
        params,
      }
    );
    if (resp.status !== 200) throw new Error(resp.statusText);
    return resp.data.results;
  });
}
