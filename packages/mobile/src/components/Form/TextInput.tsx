import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

import { TextInput, TextInputProps } from '@components/ui/TextInput';

type Props<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & TextInputProps;

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState }) => {
        return (
          <TextInput
            {...rest}
            error={fieldState.error?.message}
            onChange={(text) => field.onChange(text as PathValue<T, Path<T>>)}
            onBlur={field.onBlur}
            value={field.value}
          />
        );
      }}
    />
  );
}
