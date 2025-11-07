import { ChangeEventHandler, FormEventHandler, HTMLInputTypeAttribute, MouseEventHandler, useState } from "react";
import cls from './password-input.module.scss'
import eyeIcon from '@/assets/images/eye.svg'
import eyeWithLineIcon from '@/assets/images/eye-with-line.svg'
import Image from "next/image";

type PasswordInputProps = {
    name: string;
    value: string;
    onChange: ChangeEventHandler;
    error?: string;
    labelText?: string;
    onSubmit?: FormEventHandler;
};

export const PasswordInput = ({
    name,
    value,
    error,
    onChange,
    labelText,
    onSubmit,
}: PasswordInputProps) => {
    const [hidden, setHidden] = useState<boolean>(true);

    const onEyeClick: MouseEventHandler = (e) => {
        e.preventDefault();
        setHidden(hidden => !hidden);
    }

    return (
        <div className={cls.wrapper}>
            {labelText && <label
                htmlFor={name}
                className={cls.label}
            >
                {labelText}
            </label>}
            <div className={cls.inputWrapper}>
                <input
                    value={value}
                    name={name}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    className={cls.input}
                    type={hidden ? 'password' : 'text'}
                />
                <button
                    type='button'
                    className={cls.hideButton}
                    onClick={onEyeClick}
                >
                    <Image
                        width={30}
                        height={30}
                        src={hidden ? eyeWithLineIcon : eyeIcon}
                        alt='Hide password'
                        draggable={false}
                    />
                </button>
            </div>
            <p className={cls.errorText}>{error}</p>
        </div>
    )
}