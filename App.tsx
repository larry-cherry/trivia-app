import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import { Menu } from "./src/screens/Menu";
import { Quiz } from "./src/screens/Quiz";
import { QuizSummary } from "./src/screens/QuizSummary";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { colors } from "./src/constants/colors";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={ScreenNavOptions({})}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={ScreenNavOptions({})}
            />
            <Stack.Screen
              name="QuizSummary"
              component={QuizSummary}
              options={ScreenNavOptions({ headerBackVisible: false })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

type ScreenNavOptionsParams = {
  headerBackVisible?: boolean;
};

function ScreenNavOptions({
  headerBackVisible,
}: ScreenNavOptionsParams): NativeStackNavigationOptions {
  return {
    headerBackVisible,
    headerStyle: {
      backgroundColor: colors.secondaryColor,
    },
    headerTitleStyle: {
      color: colors.textColor,
      fontWeight: "bold",
    },
    headerTintColor: colors.textColor,
  };
}
