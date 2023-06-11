import { StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { theme } from '../shared/theme';
import { Dot } from './Dot';
import { Text } from './ui/Text';

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
      <Dot size={8} color={value ? theme.colors.green.dark : theme.colors.red.dark} />
      <Text size="sm" weight="bold" color="gray.100">
        {value ? 'Sim' : 'Não'}
      </Text>
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
});
