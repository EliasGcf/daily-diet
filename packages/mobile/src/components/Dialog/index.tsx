import { DialogClose } from './DialogClose';
import { DialogContent } from './DialogContent';
import { DialogProvider } from './DialogContext';
import { DialogTrigger } from './DialogTrigger';

export const Dialog = {
  Root: DialogProvider,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: DialogContent,
};
