import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button, { ButtonProps } from '@mui/material/Button';

interface IProps extends ButtonProps {
  children?: ReactNode;
  outline?: boolean;
}

function CancelButton(props: IProps) {
  const { children = 'Cancel', outline = true, ...nativeProps } = props;
  return (
    <button
      {...nativeProps}
      type="button"
      className={`btn btn-danger border-2 ${outline && 'btn-outline'} flex ${
        nativeProps.className
      }`}
    >
      {children ? <span className="mr-2">{children}</span> : null}
      <FaTimes />
    </button>
  );
}

export default CancelButton;
