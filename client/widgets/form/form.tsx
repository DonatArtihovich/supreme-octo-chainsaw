import { FormEvent, ReactNode } from 'react';
import cls from './form.module.scss'
import { mergeClasses } from '@/shared/lib';
import { FormButton } from '@/shared/ui/form-button';

type FormProps = {
    children: ReactNode;
    onSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
    isSubmitting: boolean;
    error?: string;
    headerText?: string;
    submitText?: string;
    className?: string;
}

export const Form = ({
    children,
    headerText = '',
    submitText = 'Submit',
    isSubmitting,
    error,
    onSubmit,
    className,
}: FormProps) => {
    return (
        <form className={cls.formWrapper}>
            <h3 className={cls.formHeader}>{headerText}</h3>
            <div className={mergeClasses(cls.wrapper, className)}>
                {children}
                <p className={cls.errorText}>{error}</p>
            </div>

            <FormButton
                text={submitText}
                type='submit'
                onClick={onSubmit}
                disabled={isSubmitting}
            />
        </form>
    )
}