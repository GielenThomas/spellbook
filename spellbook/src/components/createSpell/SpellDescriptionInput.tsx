import React from "react";
import {
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
} from "react-native";

type SpellDescriptionInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  touched?: boolean;
  styles: {
    label?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
    errorText?: StyleProp<TextStyle>;
    textArea?: StyleProp<TextStyle>;
  };
};

export const SpellDescriptionInput: React.FC<SpellDescriptionInputProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  styles,
}) => (
  <>
    <Text style={styles.label}>Description</Text>
    <TextInput
      placeholder="Description"
      style={[styles.input, styles.textArea]}
      multiline
      numberOfLines={4}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="#888"
      accessibilityLabel="Spell Description"
    />
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
