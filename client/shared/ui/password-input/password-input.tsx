import Image from 'next/image';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import eyeIcon from '@/assets/images/eye.svg';
import eyeWithLineIcon from '@/assets/images/eye-with-line.svg';

import cls from './password-input.module.scss';
import { mergeClasses } from '@/shared/lib';

type PasswordInputProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  error?: string;
  labelText?: string;
  onSubmit?: FormEventHandler;
  className?: string;
};

export const PasswordInput = ({
  name,
  value,
  error,
  onChange,
  labelText,
  onSubmit,
  className,
}: PasswordInputProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const onEyeClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setHidden((hidden) => !hidden);
  };

  return (
    <div className={mergeClasses(cls.wrapper, className)}>
      {labelText && (
        <label htmlFor={name} className={cls.label}>
          {labelText}
        </label>
      )}
      <div className={cls.inputWrapper}>
        <input
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          onSubmit={onSubmit}
          className={cls.input}
          type={hidden ? 'password' : 'text'}
        />
        <button type="button" className={cls.hideButton} onClick={onEyeClick}>
          <Image
            width={30}
            height={30}
            src={hidden ? eyeWithLineIcon : eyeIcon}
            alt="Hide password"
            draggable={false}
            className={cls.image}
          />
        </button>
      </div>
      <p className={cls.errorText}>{error}</p>
    </div>
  );
};
