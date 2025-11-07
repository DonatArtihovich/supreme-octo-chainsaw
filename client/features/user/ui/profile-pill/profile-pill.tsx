import Image from 'next/image'
import cls from './profile-pill.module.scss'
import defaultAvatarIcon from '@/assets/images/default-avatar.webp'
import { trimText, useAppSelector } from '@/shared/lib';
import { userSelector } from '@/entities/user';
import { useState } from 'react';
import { SignUpModal } from '@/widgets/sign-up-modal';
import { SignInModal } from '@/widgets/sign-in-modal';

export const ProfilePill = () => {
    const user = useAppSelector(userSelector);
    const [isSignUpModal, setIsSignUpModal] = useState<boolean>(false);
    const [isSignInModal, setIsSignInModal] = useState<boolean>(false);

    const onSignUpClick = () => setIsSignUpModal(true);
    const onSignInClick = () => setIsSignInModal(true);
    const closeSignUpModal = () => setIsSignUpModal(false);
    const closeSignInModal = () => setIsSignInModal(false);

    return (
        <>{
            user ? (
                <button className={cls.wrapper}>
                    <div className={cls.avatarWrapper}>
                        <Image
                            className={cls.avatarIcon}
                            src={defaultAvatarIcon}
                            alt={user.name}
                        />
                    </div>
                    <p className={cls.userName}>{trimText(user.name, 10)}</p>
                </button>
            ) :
                (
                    <div className={cls.signButtonsWrapper}>
                        <button
                            className={cls.signButton}
                            onClick={onSignInClick}>
                            Sign in
                        </button>
                        <button
                            className={cls.signButton}
                            onClick={onSignUpClick}
                        >
                            Sign Up
                        </button>
                    </div>
                )
        }
            {isSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
            {isSignInModal && <SignInModal closeModal={closeSignInModal} />}
        </>
    )
}