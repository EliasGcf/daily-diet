import { Slot } from '@radix-ui/react-slot';
import { View, ViewProps } from 'react-native';

import { useRadioGroupItem } from '@components/RadioGroup/RadioGroupItem';

type Props = ViewProps & { asChild?: boolean };

export function RadioGroupIndicator({ asChild = false, ...rest }: Props) {
  const { selected } = useRadioGroupItem();

  // Renders when the radio item is in a checked state.
  if (!selected) return null;

  const Comp = asChild ? (Slot as any) : View;

  return <Comp {...rest} />;
}

RadioGroupIndicator.displayName = 'RadioGroupIndicator';
