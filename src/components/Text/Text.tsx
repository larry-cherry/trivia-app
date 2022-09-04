import { useMemo } from "react";
import { Text } from "@rneui/themed";
import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

type PProps = {
  children: string;
};

export function P({ children }: PProps) {
  return <Text style={styles.P}>{children}</Text>;
}

const styles = StyleSheet.create({
  P: {
    color: colors.textColor,
  },
  h1: {

  },
  h2: {

  },
  h3: {

  },
});
