import { StyleSheet, Text, View, TextInput as RNTextInput } from 'react-native';
import { theme } from '../shared/theme';
import { useState } from 'react';

type TextInputProps = {
  label: string;
  onChange?: (text: string) => void;
};

export function TextInput({ label, onChange }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleOnChangeText(text: string) {
    setIsFilled(!!text.trim());

    if (onChange) onChange(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        placeholder="Digite aqui"
        placeholderTextColor={theme.colors.gray[400]}
        style={[styles.input, isFocused && styles.focused, isFilled && styles.filled]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },

  label: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.gray[200],
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6,
    padding: 16,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
  },

  focused: {
    borderColor: theme.colors.gray[300],
  },

  filled: {
    borderColor: theme.colors.gray[300],
  },
});
