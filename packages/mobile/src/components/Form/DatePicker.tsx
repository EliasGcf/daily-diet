import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

import { DatePicker, DatePickerProps } from '@components/DatePicker';

import { WithRequired } from '@shared/with-required';

type Props<T extends FieldValues> = WithRequired<
  Omit<ControllerProps<T>, 'render'>,
  'control'
> &
  DatePickerProps;

export function FormDatePicker<T extends FieldValues>({
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
      render={({ field }) => {
        return (
          <DatePicker
            {...rest}
            onChange={(date) => field.onChange(date as PathValue<T, Path<T>>)}
            value={field.value}
          />
        );
      }}
    />
  );
}
