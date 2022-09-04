import { SafeAreaView, StyleSheet } from "react-native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { colors } from "../../constants/colors";

type ScreenProps = {
  children: JSX.Element[] | JSX.Element;
};
export function ScreenContainer({ children }: ScreenProps) {
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SafeAreaView>
  );
}

const theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: colors.textColor,
      },
      buttonStyle: {
        backgroundColor: colors.secondaryColor,
      },
    },
    ButtonGroup: {},
    Text: {
      style: {
        color: colors.textColor,
      },
    },
  },
});

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#383e4e",
  },
});
