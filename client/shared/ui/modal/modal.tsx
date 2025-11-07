import { createPortal } from 'react-dom'
import cls from './modal.module.scss'
import { mergeClasses } from '@/shared/lib';
import { MouseEventHandler, ReactNode, useState } from 'react';
import crossIcon from '@/assets/images/cross.svg'
import Image from 'next/image';

type ModalProps = {
    closeModal: () => void;
    className?: string;
    withBody?: boolean;
    children: ReactNode;
}

export const Modal = ({
    closeModal,
    className,
    children,
    withBody = true,
}: ModalProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const onAnimationEnd = () => {
        if (!isVisible) {
            closeModal();
        }
    }

    const onWrapperClick: MouseEventHandler = (e) => e.stopPropagation();
    const onClose = () => setIsVisible(false);

    return createPortal(
        <div
            className={mergeClasses(cls.modalWrapper, isVisible
                ? cls.modalOpen
                : cls.modalClose
            )}
            onClick={onClose}
            onAnimationEnd={onAnimationEnd}
        >
            {withBody ?
                <div
                    className={mergeClasses(cls.modalBody, className)}
                    onClick={onWrapperClick}
                >
                    <div className={cls.closeSection}>
                        <button
                            className={cls.closeButton}
                            onClick={onClose}
                        >
                            <Image
                                src={crossIcon.src}
                                width={90}
                                height={90}
                                alt='Close'
                                draggable={false}
                            />
                        </button>
                    </div>
                    {children}
                </div>
                : <div
                    className={className}
                    onClick={onWrapperClick}
                >
                    {children}
                </div>
            }
        </div>,
        document.body
    )
}