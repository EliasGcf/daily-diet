import { Slot } from '@radix-ui/react-slot';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useDialog } from './DialogContext';

type DialogCloseProps = TouchableOpacityProps & { asChild?: boolean };

export function DialogClose({ asChild = false, ...rest }: DialogCloseProps) {
  const { handleClose } = useDialog();

  const Comp = asChild ? (Slot as any) : TouchableOpacity;

  return <Comp onPress={handleClose} {...rest} />;
}

DialogClose.displayName = 'DialogClose';
