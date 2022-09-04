import { useState, useMemo } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Button, BottomSheet, Icon } from "@rneui/themed";
// import { Picker } from "@react-native-picker/picker";
import type { CommonStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Slider, ButtonGroup } from "@rneui/themed";
import { RNPicker } from "../components/Picker/RNPicker";
import { useQuestionCategories } from "../hooks/Trivia/useCategories";
import { colors } from "../constants/colors";
import { ScreenContainer } from "../components/ScreenContainer/ScreenContainer";
import { P } from "../components/Text/Text";
import { Col, Row } from "../components/View/View";

type MenuProps = NativeStackScreenProps<CommonStackParamList, "Menu">;

const DifficultyButtonValues = {
  labels: ["Easy", "Medium", "Hard"],
  values: ["easy", "medium", "hard"],
};

export function Menu({ navigation }: MenuProps) {
  const { navigate } = navigation;
  const [questionsCount, setQuestionsCount] = useState(10);
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [category, setCategory] = useState<number>();

  const categories = useQuestionCategories();
  const categoryItems = useMemo(() => {
    return (
      categories.data?.trivia_categories?.map((category) => {
        return { label: category.name, value: category.id };
      }) ?? []
    );
  }, [categories.data]);
  return (
    <ScreenContainer>
      <Col justifyContent="space-between">
        <View style={styles.InputContainer}>
          <P>How many questions?</P>
          <Slider
            value={questionsCount}
            onValueChange={setQuestionsCount}
            minimumValue={1}
            minimumTrackTintColor={colors.textColor}
            maximumValue={10}
            maximumTrackTintColor={colors.secondaryColor}
            step={1}
            thumbStyle={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.secondaryColor,
            }}
            thumbProps={{
              children: (
                <Text style={{ color: colors.textColor }}>
                  {questionsCount}
                </Text>
              ),
            }}
            trackStyle={{
              backgroundColor: "blue",
            }}
          />
        </View>
        <View style={styles.InputContainer}>
          <P>Set Your Difficulty</P>
          <ButtonGroup
            selectedButtonStyle={styles.buttonGroupSelected}
            buttons={DifficultyButtonValues.labels}
            selectedIndex={difficultyIndex}
            onPress={(value) => {
              setDifficultyIndex(value);
            }}
            containerStyle={styles.buttonGroupContainer}
            textStyle={styles.buttonGroupText}
            buttonStyle={styles.buttonGroupUnSelected}
          />
        </View>
        <View style={styles.InputContainer}>
          <P>Set Your Category</P>
          <RNPicker
            description="Select Your Category"
            defaultLabel="Nothing Selected"
            items={categoryItems}
            onValueChange={setCategory}
          />
        </View>
        <Button
          title="Start"
          onPress={() =>
            navigate("Quiz", {
              amount: questionsCount,
              difficulty: DifficultyButtonValues.values[difficultyIndex],
              categoryID: category,
            })
          }
          size="lg"
          titleStyle={styles.StartBtnTitle}
          buttonStyle={styles.StartBtn}
        />
      </Col>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  StartBtn: {
    padding: 24,
  },
  StartBtnTitle: {
    fontSize: 24,
    color: colors.textColor,
  },
  InputContainer: {
    padding: 15,
  },
  inputLabels: {
    color: colors.textColor,
  },
  buttonGroupText: {
    color: colors.textColor,
  },
  buttonGroupUnSelected: {
    backgroundColor: colors.primaryColor,
  },
  buttonGroupSelected: {
    backgroundColor: colors.secondaryColor,
  },
  buttonGroupContainer: {
    marginBottom: 20,
    borderRadius: 5,
  },
});
