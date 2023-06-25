import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { theme } from '../shared/theme';
import { Text } from './ui/Text';

type ButtonProps = Omit<RectButtonProps, 'style'> & {
  variant?: 'primary' | 'outline';
  title: string;
  icon?: PhosphorIcon;
};

export function Button({ variant = 'primary', title, icon, ...rest }: ButtonProps) {
  const Icon = icon;
  const isPrimary = variant === 'primary';

  const iconColor = isPrimary ? theme.colors.white : theme.colors.gray[100];
  const activeColor = isPrimary ? theme.colors.gray[100] : theme.colors.gray[500];
  const styles = isPrimary ? primaryStyles : outlineStyles;

  return (
    <View style={{ ...baseStyles.container, ...styles.container }}>
      <RectButton
        {...rest}
        underlayColor={activeColor}
        activeOpacity={1}
        style={baseStyles.button}
      >
        {Icon && <Icon size={18} color={iconColor} style={{ marginRight: 12 }} />}
        <Text size="sm" weight="bold" color={isPrimary ? 'white' : 'gray.100'}>
          {title}
        </Text>
      </RectButton>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    width: '100%',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 6,
  },
});

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200],
  },
});

const outlineStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[100],
  },
});
