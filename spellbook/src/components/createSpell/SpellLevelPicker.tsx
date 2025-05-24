import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SpellLevelEnum } from "../../../utils/spellType.ts";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type SpellLevelPickerProps = {
  value: string;
  onValueChange: (itemValue: string) => void;
  error?: string;
  touched?: boolean;
  styles: {
    label?: StyleProp<TextStyle>;
    pickerWrapper?: StyleProp<ViewStyle>;
    picker?: StyleProp<TextStyle>;
    errorText?: StyleProp<TextStyle>;
  };
};

export const SpellLevelPicker: React.FC<SpellLevelPickerProps> = ({
  value,
  onValueChange,
  error,
  touched,
  styles,
}) => (
  <>
    <Text style={styles.label}>Level</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        accessibilityLabel="Spell Level"
      >
        <Picker.Item label="Select Level..." value="" />
        {Object.entries(SpellLevelEnum).map(([key, val]) => (
          <Picker.Item key={key} label={val} value={val} />
        ))}
      </Picker>
    </View>
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
