import Select, { Props as RsProps } from 'react-select';
import FormControl from './FormControl';
import { forwardRef } from 'react';

interface SelectFieldProps extends RsProps {
  label?: string;
  error: any;
}

// eslint-disable-next-line react/display-name
const SelectField = forwardRef<any, SelectFieldProps>((props, ref) => {
  const { label, name, className, error, ...nativeProps } = props;
  return (
    <FormControl className={className}>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Select
        {...nativeProps}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        ref={ref}
        name={name}
        classNamePrefix="rs"
        isClearable
      />
      {error ? <span>{error.message}</span> : ''}
    </FormControl>
  );
});

export default SelectField;

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
}
