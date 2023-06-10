import { View } from 'react-native';

type DotProps = {
  size: number;
  color: string;
};

export function Dot({ size, color }: DotProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
}
