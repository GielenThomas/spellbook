import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SchoolEnum } from "../../../utils/spellType.ts";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type SpellSchoolPickerProps = {
  value: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  error?: string;
  touched?: boolean;
  styles: {
    label?: StyleProp<TextStyle>;
    pickerWrapper?: StyleProp<ViewStyle>;
    picker?: StyleProp<TextStyle>;
    errorText?: StyleProp<TextStyle>;
  };
};

export const SpellSchoolPicker: React.FC<SpellSchoolPickerProps> = ({
  value,
  onValueChange,
  error,
  touched,
  styles,
}) => (
  <>
    <Text style={styles.label}>School</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        accessibilityLabel="Spell School"
      >
        <Picker.Item label="Select School..." value="" />
        {Object.entries(SchoolEnum).map(([key, val]) => (
          <Picker.Item key={key} label={val} value={val} />
        ))}
      </Picker>
    </View>
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
