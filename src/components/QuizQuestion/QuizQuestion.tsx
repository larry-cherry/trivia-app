import { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { decode } from "html-entities";
import { colors } from "../../constants/colors";

type QuizQuestionButtonsProps = {
  buttonsText: string[];
  correct_answer: string;
  onSubmit: (isCorrect: boolean) => void;
};

function QuizQuestionButtons({
  buttonsText,
  correct_answer,
  onSubmit,
}: QuizQuestionButtonsProps) {
  return (
    <View>
      {buttonsText.map((btnTxt, index) => {
        return (
          <Button
            key={index}
            title={decode(btnTxt)}
            onPress={() => onSubmit(btnTxt === correct_answer)}
            titleStyle={styles.QuizButtonText}
            buttonStyle={styles.QuizButtonContainer}
          />
        );
      })}
    </View>
  );
}

type QuizQuestionProps = {
  questionObj: TriviaQuestion;
  onSubmit: (isCorrect: boolean) => void;
};

export function QuizQuestion({ questionObj, onSubmit }: QuizQuestionProps) {
  const { question, correct_answer, incorrect_answers } = questionObj;
  const buttons = [...incorrect_answers, correct_answer].sort();
  const buttonText = useMemo(() => {
    return [...incorrect_answers, correct_answer].sort();
  }, [incorrect_answers, correct_answer]);
  const decodedQuestion = useMemo(() => {
    return decode(question, { level: "html5" }).toString();
  }, [question]);
  return (
    <View style={styles.QuizQuestion}>
      <Text style={styles.questionText} h4>
        {decodedQuestion}
      </Text>
      <QuizQuestionButtons
        buttonsText={buttonText}
        correct_answer={correct_answer}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  questionText: {
    color: colors.textColor,
    marginBottom: 5,
    textAlign: "center",
  },
  QuizButtonText: {
    color: colors.textColor,
  },
  QuizButtonContainer: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 5,
    marginBottom: 5,
    padding: 15,
  },
  QuizQuestion: {
    padding: 5,
  },
});
