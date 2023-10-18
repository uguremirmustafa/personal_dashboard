import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button, { ButtonProps } from '@mui/material/Button';

interface IProps extends ButtonProps {
  children?: ReactNode;
  outline?: boolean;
}

function AddButton(props: IProps) {
  const { children = '', outline = true, ...rest } = props;
  return (
    <Button {...rest} type="button" endIcon={<FaPlus />}>
      {children ? <span className="mr-2">{children}</span> : null}
    </Button>
  );
}

export default AddButton;
