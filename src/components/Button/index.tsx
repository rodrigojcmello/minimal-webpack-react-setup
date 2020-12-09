import { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  label,
  onClick,
  type = 'button',
}: ButtonProps): ReactElement {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
