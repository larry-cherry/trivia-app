import { useMemo } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  children: JSX.Element | JSX.Element[];
  justifyContent?: ViewStyle["justifyContent"];
  alignItems?: ViewStyle["alignItems"];
  alignSelf?: ViewStyle["alignSelf"];
  alignContent?: ViewStyle["alignContent"];
};

export function Col({
  children,
  justifyContent,
  alignItems,
  alignSelf,
  alignContent,
}: Props) {
  const style = useMemo<ViewStyle>(() => {
    return {
      flexDirection: "column",
      justifyContent,
      alignItems,
      alignSelf,
      alignContent,
      flex: 1,
    };
  }, [justifyContent, alignItems, alignSelf, alignContent]);
  return <View style={style}>{children}</View>;
}

export function Row({
  children,
  justifyContent,
  alignItems,
  alignSelf,
  alignContent,
}: Props) {
  const style = useMemo<ViewStyle>(() => {
    return {
      flexDirection: "row",
      justifyContent,
      alignItems,
      alignSelf,
      alignContent,
      flex: 1,
    };
  }, [justifyContent, alignItems, alignSelf, alignContent]);
  return <View style={style}>{children}</View>;
}
