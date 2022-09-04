import { useEffect } from "react";
import { View } from "react-native";
import { Text, Button, Image } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import type { CommonStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenContainer } from "../components/ScreenContainer/ScreenContainer";
import cheers from "../assets/images/cheers.webp";

type QuizSummaryProps = NativeStackScreenProps<
  CommonStackParamList,
  "QuizSummary"
>;

export function QuizSummary({ navigation, route }: QuizSummaryProps) {
  const { totalCorrect, totalQuestions } = route.params;
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(["questions"]);
  }, []);
  return (
    <ScreenContainer>
      <View>
        <Text h3>Good Job!</Text>
        <Text h4>
          You answered {totalCorrect} of {totalQuestions} correctly
        </Text>
      </View>
      <Image
        source={cheers}
        containerStyle={{ aspectRatio: 1, width: "100%", flex: 1 }}
      />
      <Button
        title="New Game"
        onPress={navigation.popToTop}
        size="lg"
        titleStyle={{
          paddingBottom: 25,
        }}
      />
    </ScreenContainer>
  );
}
