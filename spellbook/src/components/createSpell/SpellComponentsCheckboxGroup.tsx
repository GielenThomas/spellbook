import React from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
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
        <CheckBox
          key={key}
          title={value}
          checked={values.includes(value)}
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
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
          accessibilityLabel={`Component ${value}`}
        />
      ))}
    </View>
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
