import { Path, getByPath } from 'dot-path-value';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { Theme, theme } from '../../shared/theme';

type TextProps = RNTextProps & {
  /**
   * @default md
   */
  size?: keyof Theme['fontSizes'] | Theme['fontSizes'][keyof Theme['fontSizes']];
  /**
   * @default regular
   */
  weight?: 'regular' | 'bold';
  /**
   * @default gray.200
   */
  color?: Exclude<Path<Theme['colors']>, 'red' | 'green' | 'gray'>;
};

export function Text({
  weight = 'regular',
  size = 'md',
  color,
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        weight && styles[weight],
        color && { color: getByPath(theme.colors, color) },
        { fontSize: typeof size === 'number' ? size : theme.fontSizes[size] },
        style,
      ]}
      {...rest}
    />
  );
}

Text.size = theme.fontSizes;

const styles = StyleSheet.create({
  base: {
    color: theme.colors.gray[200],
  },

  regular: {
    fontFamily: theme.fonts.regular,
  },

  bold: {
    fontFamily: theme.fonts.bold,
  },
});
