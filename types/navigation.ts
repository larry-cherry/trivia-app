export type CommonStackParamList = {
  Menu: undefined;
  Quiz: { amount: number; categoryID?: number; difficulty: string };
  QuizSummary: {
    totalCorrect: number;
    totalQuestions: number;
  };
};
