import { ChangeEventHandler, FormEventHandler, HTMLInputTypeAttribute } from "react";
import cls from './text-input.module.scss'

type TextInputProps = {
    name: string;
    value: string;
    onChange: ChangeEventHandler;
    labelText?: string;
    onSubmit?: FormEventHandler;
    initialValue?: string;
    type?: Extract<HTMLInputTypeAttribute, 'number' | 'email' | 'tel' | 'url' | 'text'>
    error?: string;
};

export const TextInput = ({
    name,
    value,
    onChange,
    labelText,
    onSubmit,
    initialValue,
    type = 'text',
    error
}: TextInputProps) => {

    return (
        <div className={cls.wrapper}>
            {labelText && <label
                htmlFor={name}
                className={cls.label}
            >
                {labelText}
            </label>}
            <input
                name={name}
                type={type}
                value={value}
                placeholder={initialValue}
                onChange={onChange}
                onSubmit={onSubmit}
                className={cls.input}
            />
            <p className={cls.errorText}>
                {error}
            </p>
        </div>
    )
}