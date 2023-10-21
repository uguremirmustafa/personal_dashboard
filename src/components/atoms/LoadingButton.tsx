import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

function LoadingButton(props: IProps) {
  const { children = 'Save', type = 'submit', loading, ...nativeProps } = props;
  return (
    <button
      {...nativeProps}
      disabled={loading || nativeProps.disabled}
      className={`btn btn-primary mt-2 no-animation ${nativeProps.className}`}
      type={type}
    >
      <span className="mr-2">{children}</span>
      {loading && (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      )}
    </button>
  );
}

export default LoadingButton;
