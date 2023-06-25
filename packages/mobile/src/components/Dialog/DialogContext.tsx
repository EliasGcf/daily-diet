import { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback(
    (newValue: boolean) => {
      setIsOpen(newValue);

      if (onOpenChange) {
        onOpenChange(openFromProps !== undefined ? !openFromProps : newValue);
      }
    },
    [onOpenChange, openFromProps],
  );

  const value = useMemo(
    () => ({
      isOpen: openFromProps ?? isOpen,
      onOpenChange: handleOpenChange,
      handleClose: () => handleOpenChange(false),
    }),
    [handleOpenChange, isOpen, openFromProps],
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
