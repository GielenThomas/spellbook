import React from "react";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { ComponentEnum } from "../../../utils/spellType.ts";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type SpellComponentsCheckboxGroupProps = {
  values: string[];
  setFieldValue: (field: string, value: any) => void;
  error?: string;
  touched?: boolean;
  styles: {
    label?: StyleProp<TextStyle>;
    checkboxGroup?: StyleProp<ViewStyle>;
    checkboxContainer?: StyleProp<ViewStyle>;
    checkboxText?: StyleProp<TextStyle>;
    errorText?: StyleProp<TextStyle>;
  };
};

export const SpellComponentsCheckboxGroup = ({
  values,
  setFieldValue,
  error,
  touched,
  styles,
}: SpellComponentsCheckboxGroupProps) => (
  <>
    <Text style={styles.label}>Components</Text>
    <View style={styles.checkboxGroup}>
      {Object.entries(ComponentEnum).map(([key, value]) => (
        <View key={key} style={styles.checkboxContainer}>
          <Checkbox.Item
            label={value}
            status={values.includes(value) ? "checked" : "unchecked"}
            onPress={() => {
              if (values.includes(value)) {
                setFieldValue(
                  "components",
                  values.filter((v) => v !== value)
                );
              } else {
                setFieldValue("components", [...values, value]);
              }
            }}
            labelStyle={styles.checkboxText}
            accessibilityLabel={`Component ${value}`}
            position="leading"
            color="#2196F3"
          />
        </View>
      ))}
    </View>
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
