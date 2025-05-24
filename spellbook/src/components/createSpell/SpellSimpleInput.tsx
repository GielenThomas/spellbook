import React from "react";
import {
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
} from "react-native";

type SpellSimpleInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  touched?: boolean;
  styles: {
    label?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
    errorText?: StyleProp<TextStyle>;
  };
  accessibilityLabel?: string;
};

export const SpellSimpleInput: React.FC<SpellSimpleInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  styles,
  accessibilityLabel,
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="#888"
      accessibilityLabel={accessibilityLabel}
    />
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
