import React, { PropsWithChildren, createContext, useMemo, useState } from 'react';

type DialogContextProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleClose: () => void;
};

const DialogContext = createContext({} as DialogContextProps);

export function DialogProvider({ children }: Required<PropsWithChildren>) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      onOpenChange: (open: boolean) => setIsOpen(open),
      handleClose: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

DialogProvider.displayName = 'DialogProvider';

export function useDialog() {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
}
