import Select, { Props as RsProps } from 'react-select';
import { forwardRef } from 'react';
import FormControl from './FormControl';

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
        menuPortalTarget={nativeProps.menuPortalTarget ?? document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 1000000 }) }}
        ref={ref}
        name={name}
        classNamePrefix="rs"
        isClearable
      />
      {error ? <span className="mt-2 text-xs text-error">{error.message}</span> : ''}
    </FormControl>
  );
});

export default SelectField;

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
}
