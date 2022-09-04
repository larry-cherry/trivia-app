import { useState, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import { Text } from "@rneui/themed";

type PickerDefaultProps = {
  description: string;
  defaultLabel: string;
  items?: PickerItem[];
  onValueChange?: (value: any) => void;
};

type PickerItem = {
  label: string;
  value: any;
};

type ItemValue = string | number | boolean;

export function PickerDefault({
  items,
  description,
  // defaultLabel,
  onValueChange,
}: PickerDefaultProps) {
  const [value, setValue] = useState<ItemValue>();
  const onChange = useCallback(
    (val: ItemValue) => {
      setValue(val);
      onValueChange?.(val);
    },
    [setValue]
  );
  return (
    <>
      <Text>{description}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={{
          backgroundColor: "blue",
        }}
      >
        {items?.map((item, index) => {
          const { label, value } = item;
          return (
            <Picker.Item
              key={`PickerDefault${index}`}
              label={label}
              value={value}
            />
          );
        })}
      </Picker>
    </>
  );
}
