import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { createContext, useContext, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

type RadioGroupContextProps<V extends string> = {
  value?: V;
  onValueChange: (value: V) => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
const RadioGroupContext = createContext<RadioGroupContextProps<any>>(undefined!);

type RadioGroupRootProps<V extends string> = ViewProps & {
  value?: V;
  onValueChange?: (value: V) => void;
  children: React.ReactNode;
};

export function RadioGroupRoot<V extends string>({
  children,
  value: valueFromProps,
  onValueChange,
  ...rest
}: RadioGroupRootProps<V>) {
  const [selectedValue, setSelectedValue] = useControllableState({
    prop: valueFromProps,
    onChange: onValueChange,
  });

  const contextValue = useMemo<RadioGroupContextProps<V>>(
    () => ({
      value: selectedValue,
      onValueChange: (newValue) => setSelectedValue(newValue),
    }),
    [selectedValue, setSelectedValue],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View {...rest}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

RadioGroupRoot.displayName = 'RadioGroupProvider';

export function useRadioGroup() {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroupProvider');
  }

  return context;
}
