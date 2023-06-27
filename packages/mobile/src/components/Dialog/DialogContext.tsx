import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { createContext, useContext, useMemo } from 'react';

type DialogContextProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleClose: () => void;
};

const DialogContext = createContext({} as DialogContextProps);

type DialogProviderProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DialogProvider({
  open: openFromProps,
  onOpenChange,
  children,
}: DialogProviderProps) {
  const [isOpen = false, setIsOpen] = useControllableState({
    prop: openFromProps,
    onChange: onOpenChange,
  });

  const value = useMemo(
    () => ({
      isOpen: openFromProps ?? isOpen,
      onOpenChange: setIsOpen,
      handleClose: () => setIsOpen(false),
    }),
    [isOpen, openFromProps, setIsOpen],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

DialogProvider.displayName = 'DialogProvider';

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
}
