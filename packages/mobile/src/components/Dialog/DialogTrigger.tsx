import { Slot } from '@radix-ui/react-slot';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

import { useDialog } from './DialogContext';

type DialogTriggerProps = TouchableOpacityProps & { asChild?: boolean };

export function DialogTrigger({ asChild = false, ...rest }: DialogTriggerProps) {
  const { onOpenChange } = useDialog();

  const Comp = asChild ? (Slot as any) : TouchableOpacity;

  return <Comp onPress={() => onOpenChange(true)} {...rest} />;
}

DialogTrigger.displayName = 'DialogTrigger';
