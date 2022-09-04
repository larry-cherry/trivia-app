import { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CommonStackParamList } from "../../types/navigation";
import { useQuestions } from "../hooks/Trivia/useQuestions";
import { QuizQuestion } from "../components/QuizQuestion/QuizQuestion";
import { colors } from "../constants/colors";
import { ScreenContainer } from "../components/ScreenContainer/ScreenContainer";
import correctAudio from "../assets/audio/correct.mp3";
import incorrectAudio from "../assets/audio/incorrect.mp3";
import { useAudio } from "../hooks/audio/useAudio";

type QuizProps = NativeStackScreenProps<CommonStackParamList, "Quiz">;

export function Quiz({ navigation, route }: QuizProps) {
  const { amount, categoryID, difficulty } = route.params;
  const ding = useAudio({
    source: correctAudio,
  });
  const wrong = useAudio({ source: incorrectAudio });

  const [questionIndex, setQuestionIndex] = useState(0);
  const correctAnswers = useRef(0);
  const questions = useQuestions({
    amount,
    category: categoryID,
  });

  const selectedQuestion = useMemo(() => {
    return questions.data?.[questionIndex];
  }, [questionIndex, questions.data?.length, questions.isSuccess]);
  const totalQuestions = useMemo(() => {
    return questions.data?.length;
  }, [questions.data?.length]);

  const answerSubmited = useCallback(
    (isCorrect: boolean) => {
      if (totalQuestions) {
        if (isCorrect) {
          correctAnswers.current += 1;
          ding.play();
        } else {
          wrong.play();
        }
        if (questionIndex < totalQuestions - 1) {
          setQuestionIndex(questionIndex + 1);
        } else {
          navigation.navigate("QuizSummary", {
            totalCorrect: correctAnswers.current,
            totalQuestions: totalQuestions,
          });
        }
      }
    },
    [correctAnswers.current, questionIndex, selectedQuestion]
  );
  const totalCorrectText = useMemo(() => {
    return `${correctAnswers.current} of ${
      questions.data?.length ?? 0
    } correct`;
  }, [correctAnswers.current, questions.data?.length]);
  return (
    <ScreenContainer>
      <View>
        <View style={styles.QuestionsTextContainer}>
          <Text style={styles.QuestionNumber}>
            Question #{questionIndex + 1}
          </Text>
          <Text style={styles.QuestionsCorrect}>{totalCorrectText}</Text>
        </View>
        {!!selectedQuestion ? (
          <QuizQuestion
            questionObj={selectedQuestion}
            onSubmit={answerSubmited}
          />
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  QuestionText: {
    color: colors.textColor,
    marginBottom: 10,
  },
  QuestionNumber: {
    color: colors.textColor,
    fontSize: 30,
    marginBottom: 10,
  },
  QuestionsCorrect: {
    color: colors.textColor,
    marginBottom: 10,
  },
  QuestionsTextContainer: {
    alignItems: "center",
  },
});
