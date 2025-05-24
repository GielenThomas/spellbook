import React from "react";
import {
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
} from "react-native";

type SpellNameInputProps = {
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
};

export const SpellNameInput: React.FC<SpellNameInputProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  styles,
}) => (
  <>
    <Text style={styles.label}>Name</Text>
    <TextInput
      placeholder="Name"
      style={styles.input}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="#888"
      accessibilityLabel="Spell Name"
      autoCapitalize="words"
    />
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
  </>
);
