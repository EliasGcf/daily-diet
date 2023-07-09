import { useControllableState } from '@radix-ui/react-use-controllable-state';
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';

import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

export type TextInputProps = Omit<RNTextInputProps, 'onChange'> & {
  label: string;
  isFocused?: boolean;
  error?: string;
  onFocusChange?: (focused: boolean) => void;
  onChange?: (text: string) => void;
};

export function TextInput({
  label,
  onChange,
  pointerEvents,
  isFocused: isFocusedProp,
  onFocusChange,
  error,
  onBlur,
  ...rest
}: TextInputProps) {
  const ref = useRef<RNTextInput>(null);
  const [isFocused = false, setIsFocused] = useControllableState({
    prop: isFocusedProp,
    onChange: onFocusChange,
  });

  function handleOnChangeText(text: string) {
    if (onChange) onChange(text);
  }

  function handleOnBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false);

    if (onBlur) onBlur(event);
  }

  useEffect(() => {
    if (isFocused) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [isFocused]);

  return (
    <View style={styles.container} pointerEvents={pointerEvents}>
      <Text size="sm" weight="bold" color="gray.200">
        {label}
      </Text>

      <RNTextInput
        {...rest}
        ref={ref}
        placeholderTextColor={theme.colors.gray[400]}
        style={[
          styles.input,
          rest.multiline && styles.multilineInput,
          {
            ...(error && styles.error),
            ...(isFocused && styles.focused),
            ...(rest.editable === false && styles.disabled),
          },
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={handleOnBlur}
        onChangeText={handleOnChangeText}
      />

      {error && (
        <Text size="sm" color="red.dark">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%',
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6,
    padding: 16,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
  },

  multilineInput: {
    minHeight: 120,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },

  focused: {
    borderColor: theme.colors.gray[300],
  },

  error: {
    borderColor: theme.colors.red.dark,
  },

  disabled: {
    backgroundColor: theme.colors.gray[600],
    color: theme.colors.gray[300],
  },
});
