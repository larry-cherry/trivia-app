import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useState, useCallback, useRef, memo, useMemo } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@rneui/themed";
import { colors } from "../../constants/colors";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";

type ActionSheetProps = {
  isVisible: boolean;
  toggleModal: () => void;
  description: string;
  items?: Item[];
  onValueChange?: (item: ItemValue) => void;
  defaultLabel: string;
};

type Item = {
  label: string;
  value: ItemValue;
};

type ItemValue = string | number | boolean;
export const ActionSheet = memo(function ActionSheet({
  isVisible,
  toggleModal,
  description,
  items,
  onValueChange,
  defaultLabel = "Pick An Option",
}: ActionSheetProps) {
  const [value, setValue] = useState<ItemValue>();
  const selectedName = useMemo(() => {
    return items?.find((item) => item.value === value)?.label;
  }, [value]);

  const changeValue = useCallback(
    (val: ItemValue) => {
      setValue(val);
    },
    [value]
  );

  const closeActionSheet = () => {
    toggleModal();
    if (value) {
      onValueChange?.(value);
    }
  };

  return (
    <>
      <Button
        title={selectedName ?? defaultLabel}
        onPress={toggleModal}
        style={styles.toggleButton}
        color={colors.secondaryColor}
        titleStyle={styles.toggleButtonTitle}
      />
      <BottomSheet isVisible={isVisible}>
        <View style={styles.ActionSheet}>
          <SafeAreaView>
            <Text style={styles.ActionSheetDescription}>{description}</Text>
            <Picker
              selectedValue={value}
              onValueChange={changeValue}
              itemStyle={styles.toggleButtonTitle}
            >
              {items?.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </Picker>
            <Button
              title="Close"
              onPress={closeActionSheet}
              titleStyle={styles.toggleButtonTitle}
              buttonStyle={styles.toggleButton}
            />
          </SafeAreaView>
        </View>
      </BottomSheet>
    </>
  );
});
const styles = StyleSheet.create({
  ActionSheet: {
    backgroundColor: colors.primaryColor,
  },
  ActionSheetDescription: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    color: colors.textColor,
  },
  toggleButton: {
    backgroundColor: "#16191f",
  },
  toggleButtonTitle: {
    color: colors.textColor,
  },
});
