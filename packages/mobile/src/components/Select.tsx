import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { theme } from '../shared/theme';

type SelectProps = Omit<RectButtonProps, 'style'> & {
  value: boolean;
  selected?: boolean;
};

export function Select({ value, selected = false, ...rest }: SelectProps) {
  return (
    <RectButton
      {...rest}
      underlayColor={value ? theme.colors.green.light : theme.colors.red.light}
      activeOpacity={1}
      style={[
        baseStyles.container,
        selected && {
          borderColor: value ? theme.colors.green.dark : theme.colors.red.dark,
          backgroundColor: value ? theme.colors.green.light : theme.colors.red.light,
        },
      ]}
    >
      <View
        style={[
          baseStyles.dot,
          value
            ? { backgroundColor: theme.colors.green.dark }
            : { backgroundColor: theme.colors.red.dark },
        ]}
      />
      <Text style={[baseStyles.title]}>{value ? 'Sim' : 'Não'}</Text>
    </RectButton>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: theme.colors.gray[600],
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[600],
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  title: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.gray[100],
  },
});
