import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, useMemo } from 'react';
import { Pressable, PressableProps } from 'react-native';

import { useRadioGroup } from '@components/RadioGroup/RadioGroupRoot';

type RadioGroupItemContextProps = { value: string; selected: boolean };

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const RadioGroupItemContext = createContext<RadioGroupItemContextProps>(undefined!);

type RadioGroupItemProps = PressableProps & { value: string; asChild?: boolean };

export function RadioGroupItem({ asChild = false, value, ...rest }: RadioGroupItemProps) {
  const radioGroup = useRadioGroup();

  const selected = value === radioGroup.value;

  const radioGroupItemContextValue = useMemo<RadioGroupItemContextProps>(
    () => ({ value, selected }),
    [selected, value],
  );

  const Comp = asChild ? (Slot as any) : Pressable;

  return (
    <RadioGroupItemContext.Provider value={radioGroupItemContextValue}>
      <Comp
        selected={selected}
        onPress={() => radioGroup.onValueChange(value)}
        {...rest}
      />
    </RadioGroupItemContext.Provider>
  );
}

RadioGroupItem.displayName = 'RadioGroupItem';

export function useRadioGroupItem() {
  const context = useContext(RadioGroupItemContext);

  if (!context) {
    throw new Error('useRadioGroupItem must be used within a RadioGroupItem');
  }

  return context;
}
