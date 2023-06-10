import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { theme } from '../shared/theme';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'phosphor-react-native';

type ButtonProps = Omit<RectButtonProps, 'style'> & {
  variant?: 'primary' | 'outline';
  title: string;
  icon?: Icon;
};

export function Button({ variant = 'primary', title, icon, ...rest }: ButtonProps) {
  const Icon = icon;
  const isPrimary = variant === 'primary';

  const iconColor = isPrimary ? theme.colors.white : theme.colors.gray[100];
  const activeColor = isPrimary ? theme.colors.gray[100] : theme.colors.gray[500];
  const styles = isPrimary ? primaryStyles : outlineStyles;

  return (
    <RectButton
      {...rest}
      underlayColor={activeColor}
      activeOpacity={1}
      style={{ ...baseStyles.container, ...styles.container }}
    >
      {Icon && <Icon size={18} color={iconColor} />}
      <Text style={{ ...baseStyles.title, ...styles.title }}>{title}</Text>
    </RectButton>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 6,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.sm,
  },
});

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200],
  },
  title: {
    color: theme.colors.white,
  },
});

const outlineStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[100],
  },
  title: {
    color: theme.colors.gray[100],
  },
});
