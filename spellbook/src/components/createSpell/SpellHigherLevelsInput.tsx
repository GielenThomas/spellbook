import React from "react";
import {
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
} from "react-native";

type SpellHigherLevelsInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  styles: {
    label?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
    textAreaSmall?: StyleProp<TextStyle>;
  };
};

export const SpellHigherLevelsInput: React.FC<SpellHigherLevelsInputProps> = ({
  value,
  onChangeText,
  onBlur,
  styles,
}) => (
  <>
    <Text style={styles.label}>At Higher Levels (optional)</Text>
    <TextInput
      placeholder="At Higher Levels (optional)"
      style={[styles.input, styles.textAreaSmall]}
      multiline
      numberOfLines={2}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="#888"
      accessibilityLabel="At Higher Levels"
    />
  </>
);
