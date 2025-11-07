import cls from './checkbox-input.module.scss'
import checkmarkChecked from '@/assets/images/checkmark-checked.svg'
import checkmarkUnchecked from '@/assets/images/checkmark-unchecked.svg'
import { mergeClasses } from '@/shared/lib';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

type CheckboxInputProps = {
    name: string;
    labelText: string;
    value: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

export const CheckboxInput = ({
    name,
    labelText,
    value,
    onChange,
    className,
}: CheckboxInputProps) => {
    return (
        <div className={mergeClasses(cls.wrapper, className)}>
            <Image
                width={30}
                height={30}
                src={value
                    ? checkmarkChecked
                    : checkmarkUnchecked}
                alt='Checkmark'
                draggable={false}
                className={cls.image}
            />
            <label
                htmlFor={name}
                className={cls.label}
            >
                {labelText}

                <input
                    id={name}
                    name={name}
                    type='checkbox'
                    checked={value}
                    onChange={onChange}
                    className={cls.input}
                />
            </label>
        </div>
    )
}