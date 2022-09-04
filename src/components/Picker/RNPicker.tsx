import { Platform } from "react-native";
import { useState, useCallback, useRef } from "react";
import { ActionSheet } from "./Actionsheet";
import { PickerDefault } from "./PickerDefault";
type PickerProps = {
  description: string;
  defaultLabel: string;
  items?: PickerItem[];
  onValueChange?: (value: any) => void;
};

type PickerItem = {
  label: string;
  value: any;
};

export function RNPicker({
  items,
  defaultLabel,
  description,
  onValueChange,
}: PickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);

  if (Platform.OS === "ios") {
    return (
      <ActionSheet
        items={items}
        description={description}
        isVisible={modalVisible}
        toggleModal={toggleModal}
        onValueChange={onValueChange}
        defaultLabel={defaultLabel}
      />
    );
  }
  return (
    <PickerDefault
      items={items}
      description={description}
      onValueChange={onValueChange}
      defaultLabel={defaultLabel}
    />
  );
}
