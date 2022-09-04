import {
  BottomSheet as RNEBottomSheet,
  BottomSheetProps as RNEBottomSheetProps,
} from "@rneui/themed";

interface BottomSheetProps extends RNEBottomSheetProps {
  children: JSX.Element[] | JSX.Element;
}

export function BottomSheet(props: BottomSheetProps) {
  return <RNEBottomSheet {...props} />;
}
