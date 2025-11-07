import { ButtonHTMLAttributes } from 'react';

import { mergeClasses } from '@/shared/lib';

import cls from './form-button.module.scss';

type FormButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const FormButton = ({
  text,
  type = 'button',
  disabled = false,
  onClick,
  className,
}: FormButtonProps) => {
  return (
    <button
      className={mergeClasses(cls.button, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
