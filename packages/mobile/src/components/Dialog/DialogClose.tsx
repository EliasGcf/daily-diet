import { Slot } from '@radix-ui/react-slot';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useDialog } from './DialogContext';

type DialogCloseProps = TouchableOpacityProps & { asChild?: boolean };

export function DialogClose({ asChild = false, ...rest }: DialogCloseProps) {
  const { handleClose } = useDialog();

  const Comp = asChild ? (Slot as any) : TouchableOpacity;

  return <Comp activeOpacity={0.7} onPressOut={handleClose} {...rest} />;
}

DialogClose.displayName = 'DialogClose';
