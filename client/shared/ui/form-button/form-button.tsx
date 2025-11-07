import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import cls from './form-button.module.scss'
import { mergeClasses } from '@/shared/lib';

type FormButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const FormButton = ({
    text,
    type = 'button',
    disabled = false,
    onClick,
    className
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
    )
}